import { PrismaClient, User, Prisma } from '@prisma/client'
import * as TE from 'fp-ts/lib/TaskEither'
import prisma from './prisma'

export const findUser = (where: Prisma.UserWhereUniqueInput): TE.TaskEither<Error, User | null> => {
  return TE.tryCatch(
    async () =>
      prisma.user.findUnique({
        where,
      }),
    reason => reason as Error,
  )
}
