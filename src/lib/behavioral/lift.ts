import { pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { mapLeft } from 'fp-ts/lib/Either'

/**
 * @description Define a combinator that converts a check outputting Either<E, A> into a check outputting Either<NonEmptyArray<E>, A>
 * @note useful for multiple validations maping
 */

export default <E, A>(check: (...a: A[]) => E.Either<E, A>) =>
  (...a: A[]): E.Either<NonEmptyArray<E>, A> =>
    pipe(
      check(...a),
      mapLeft(a => [a]),
    )
