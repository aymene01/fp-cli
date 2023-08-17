import * as E from 'fp-ts/Either'

export const isSuccess = <T>(result: E.Either<Error, T>): result is E.Right<T> => {
  return result._tag === 'Right'
}
