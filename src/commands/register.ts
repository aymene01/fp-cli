import { User, PrismaClient } from '@prisma/client'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { sequenceT } from 'fp-ts/lib/Apply'
import { vEmail, vPassword } from '@/lib/validation'
import { createPassword } from '@/lib/auth'
import applicativeValidation from '@/lib/behavioral/applicativeValidation'
import prisma from '@/lib/prisma'
import { ERROR } from '@/lib/constant'
import { generateJsonWebToken } from '@/lib/auth'
import replyWithError from '@/lib/response/replyWithError'
import { Either } from 'fp-ts/lib/Either'

type AuthenticationTuple = [string, string]

export const createUser = ([email, password]: AuthenticationTuple): TE.TaskEither<any, User> =>
  pipe(
    createPassword(password),
    TE.chain(encryptedPassword =>
      TE.tryCatch(
        async () =>
          prisma.user.create({
            data: {
              email,
              password: encryptedPassword,
            },
          }),
        reason => reason,
      ),
    ),
  )

type RegisterCmd = {
  email: string
  password: string
  passwordConfirmation: string
}

export const register = ({ email, password, passwordConfirmation }: RegisterCmd): TE.TaskEither<Error, any> =>
  pipe(
    TE.fromEither(sequenceT(applicativeValidation)(vEmail(email), vPassword(password, passwordConfirmation))),
    TE.fold(
      details => replyWithError({ message: ERROR.VALIDATION.USER.WRONG, details }),
      input =>
        pipe(
          createUser(input),
          TE.fold(
            ({ message, code, meta }) => replyWithError({ message, code, meta }),
            user => {
              const { uuid, email } = user
              const token = generateJsonWebToken({ uuid, email })
              return TE.right({ user, meta: { token } })
            },
          ),
        ),
    ),
  )
