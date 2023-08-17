import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/function'

import { ERROR } from './constant'

export const createPassword = (password: string): TE.TaskEither<Error, string> => {
  return TE.tryCatch(
    async () => {
      // we choose ~10 hashes/sec
      const SALT_ROUNDS = 10

      // auto-generate a salt and hash the password
      const hash = await bcrypt.hash(password, SALT_ROUNDS)

      if (!hash) {
        throw new Error(ERROR.VALIDATION.USER.PASSWORD.HASH)
      }

      return hash
    },
    reason => reason as Error,
  )
}

export const verifyPassword = async (password: string, encryptedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, encryptedPassword)
}

export const checkToken = (decoded: any): TE.TaskEither<Error, string> => {
  if (!decoded.uuid) {
    throw new Error(ERROR.AUTHORIZATION.TOKEN.UUID)
  }

  return TE.right(decoded.uuid)
}

export const generateJsonWebToken = ({ uuid, email }: any): string => {
  const payload = { uuid, email }
  return jwt.sign(payload, process.env.JWT_ENCRYPTION || 'secret')
}

export const verifyJsonWebToken = (token: string): TE.TaskEither<Error, any> => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_ENCRYPTION || 'secret')

    return pipe(decoded, checkToken)
  } catch (_) {
    return TE.left(new Error(ERROR.AUTHORIZATION.TOKEN.INVALID))
  }
}
