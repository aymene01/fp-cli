import * as E from 'fp-ts/Either'

export const isSuccess = <T>(result: E.Either<Error, T>): result is E.Right<T> => result._tag === 'Right'
