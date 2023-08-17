import { Command } from 'commander'
import { register } from './commands/register'
import { isSuccess } from './lib/isSuccess'

export const program = new Command()

program
  .command('hello <name>')
  .option('-c, --capitalize')
  .action((name: string, options) => {
    const { capitalize } = options
    const message = `hello ${name}`
    const greeting = capitalize ? message.toUpperCase() : message

    console.log(greeting)
  })

program
  .command('register <email> <password> <passwordConfirmation>')
  .action(async (email, password, passwordConfirmation) => {
    const result = await register({
      email,
      password,
      passwordConfirmation,
    })()

    console.log(
      isSuccess(result)
        ? `Registration successful: ${result.right.user.email}`
        : `Registration failed: ${result?.left?.message}`,
    )
  })
