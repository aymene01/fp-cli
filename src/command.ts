import { Command } from 'commander'
import { register } from './commands/register'
import { isSuccess } from './lib/isSuccess'
import { input } from '@inquirer/prompts'

export const program = new Command()

type RegisterPrompt = {
  message: string
  key: keyof RegisterResponses
}

type RegisterResponses = {
  email: string
  password: string
  passwordConfirmation: string
}

program.command('register').action(async () => {
  const prompts: RegisterPrompt[] = [
    { message: 'Enter your email', key: 'email' },
    { message: 'Enter your password', key: 'password' },
    { message: 'Confirm your password', key: 'passwordConfirmation' },
  ]

  const responses: { [key in keyof RegisterResponses]: string } = {
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  for (const prompt of prompts) {
    responses[prompt.key] = await input(prompt)
  }

  const result = await register({
    ...responses,
  })()

  console.log(
    isSuccess(result)
      ? `Registration successful: ${result.right.user.email}`
      : `Registration failed: ${result?.left?.message}`,
  )
})
