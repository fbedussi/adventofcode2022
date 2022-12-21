import fs from 'fs'

const isTest = false
const inputTxt = fs.readFileSync(
  isTest ? './test-input.txt' : './input.txt',
  'utf-8',
)

const monkeysData = inputTxt.split(/\r?\n/).map((line) => {
  const [name, rest] = line.split(': ')
  const match = rest.match(/([^ ]+) (.+) ([^ ]+)/)

  return match
    ? {
        name,
        dependencies: [match[1], match[3]],
        operation: name === 'root' ? '==' : match[2],
      }
    : {
        name,
        number: parseInt(rest),
      }
})

const monkeys = []

class Monkey {
  constructor({ name, operation, number, dependencies }) {
    this.name = name
    this.operation = operation
    this.number = number
    this.dependencies = dependencies
  }

  setDependencies() {
    if (!this.dependencies) {
      return
    }

    const dependenciesNames = this.dependencies

    const leftDependency = monkeys.find(
      (monkey) => monkey.name === dependenciesNames[0],
    )
    const rightDependency = monkeys.find(
      (monkey) => monkey.name === dependenciesNames[1],
    )
    this.dependencies = [leftDependency, rightDependency]
  }

  getResult() {
    if (this.number !== undefined) {
      return this.number
    } else {
      return eval(
        `${this.dependencies[0].getResult()} ${
          this.operation
        } ${this.dependencies[1].getResult()}`,
      )
    }
  }
}

monkeysData.forEach((data) => monkeys.push(new Monkey(data)))

monkeys.forEach((monkey) => monkey.setDependencies())

const rootMonkey = monkeys.find((monkey) => monkey.name === 'root')
const humnMonkey = monkeys.find((monkey) => monkey.name === 'humn')
humnMonkey.number = 6434817940000
while (!rootMonkey.getResult()) {
  if (humnMonkey.number % 200 === 0) {
    console.log(humnMonkey.number)
  }
  humnMonkey.number++
}

console.log('result', humnMonkey.number)
