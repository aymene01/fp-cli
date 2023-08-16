import { getSemigroup } from 'fp-ts/lib/NonEmptyArray'
import { getApplicativeValidation } from 'fp-ts/lib/Either'

/**
 * @description This code is using fp-ts to create a validation structure.
 * It combines the NonEmptyArray semigroup and Either's validation to create a validation function.
 * The validation function will combine multiple validation results into a single validation result.
 * @param A is the type of validation error messages.
 */
export default getApplicativeValidation(getSemigroup<string>())
