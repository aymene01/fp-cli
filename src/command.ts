import { Command } from 'commander'

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
