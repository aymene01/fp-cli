import isemail from 'isemail'
import { Either, left, right } from 'fp-ts/lib/Either'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { sequenceT } from 'fp-ts/lib/Apply'
import { pipe } from 'fp-ts/lib/function'
import { map } from 'fp-ts/lib/Either'
import lift from './behavioral/lift'
import { ERROR } from './constant'
import applicativeValidation from './behavioral/applicativeValidation'

/* ↠ LOCAL NEEDED VALUES ↞ */

const PASSWORD_MIN_LENGTH = 6

/* ↠ UTILITIES ↞ */

const equal = (s: string, t: string): Either<string, string> => {
  return s === t ? right(s) : left(ERROR.VALIDATION.USER.PASSWORD.MISMATCH)
}

const minLength =
  (min: number) =>
  (s: string): Either<string, string> => {
    return s.length >= PASSWORD_MIN_LENGTH ? right(s) : left(ERROR.VALIDATION.USER.PASSWORD.MIN_LENGTH(min))
  }

const oneCapital = (s: string): Either<string, string> => {
  return /[A-Z]/g.test(s) ? right(s) : left(ERROR.VALIDATION.USER.PASSWORD.ONE_CAPITAL)
}

const oneNumber = (s: string): Either<string, string> => {
  return /[0-9]/g.test(s) ? right(s) : left(ERROR.VALIDATION.USER.PASSWORD.ONE_NUMBER)
}

/* ↠ LIFTING ↞ */

const oneNumberV = lift(oneNumber)
const oneCapitalV = lift(oneCapital)
const minLengthV = lift(minLength(PASSWORD_MIN_LENGTH))
const equalV = lift(equal)

/* ↠ VALIDATORS ↞ */

export const vPassword = (s: string, confirmedPassword: string): Either<NonEmptyArray<string>, string> => {
  return pipe(
    sequenceT(applicativeValidation)(equalV(s, confirmedPassword), minLengthV(s), oneCapitalV(s), oneNumberV(s)),
    // if there is no fold returning the good password
    map(() => s),
  )
}

export const vEmail = (s: string): Either<NonEmptyArray<string>, string> => {
  return isemail.validate(s, { minDomainAtoms: 2 }) ? right(s) : left([ERROR.VALIDATION.USER.EMAIL.NOT_VALID])
}
