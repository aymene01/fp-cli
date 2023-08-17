import * as TE from 'fp-ts/lib/TaskEither'

type Args = {
  message?: string
  details?: string[]
  code?: string
  status?: string
  meta?: unknown
}

const createCustomError = ({
  message = 'An error occurred',
  details,
  code,
  status = 'BAD_USER_INPUT',
  meta,
}: Args) => ({
  name: 'CustomError',
  message,
  details,
  code,
  status,
  meta,
})

const replyWithError = ({
  message,
  details,
  code,
  status = 'BAD_USER_INPUT',
  meta,
}: Args): TE.TaskEither<Error, unknown> => TE.left(createCustomError({ message, details, code, status, meta }))

export default replyWithError
