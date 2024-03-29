import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'

/**
 * @description allow a tasks either sequences to continue rather than folding the first error encouter
 */

export default <E, A>(t: TE.TaskEither<E, A>, f: (err: E) => TE.TaskEither<E, A>): TE.TaskEither<E, A> =>
  pipe(t, TE.orElse(f))
