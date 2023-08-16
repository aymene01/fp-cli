import { pipe } from 'fp-ts/lib/function'
import * as A from 'fp-ts/lib/Array'
import * as IO from 'fp-ts/lib/IO'
import { vPassword } from './lib/validation'

const inputStrings: string[] = ['Hello', 'world', 'from', 'fp-ts!']

const joinStrings: (arr: string[]) => string = array => array.join(' ')

const capitalizeFirstLetter: (str: string) => string = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

const addExclamation: (str: string) => string = str => str + '!'

const main: IO.IO<void> = () => {
  console.log(vPassword('Qwerty1!', 'Qwerty1!'))
}

main()
