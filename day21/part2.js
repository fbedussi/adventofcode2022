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

  setParent() {
    const parent = monkeys.find((monkey) =>
      monkey.dependencies?.includes(this.name),
    )
    this.parent = parent
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
      // if (this.dependencies.some((depenency) => depenency.name === 'humn')) {
      //   useHumn = true
      // }

      return eval(
        `${this.dependencies[0].getResult()} ${
          this.operation
        } ${this.dependencies[1].getResult()}`,
      )
    }
  }
}

monkeysData.forEach((data) => monkeys.push(new Monkey(data)))

monkeys.forEach((monkey) => monkey.setParent())
monkeys.forEach((monkey) => monkey.setDependencies())

const rootMonkey = monkeys.find((monkey) => monkey.name === 'root')
const rootMonkeyLeftDependency = rootMonkey.dependencies[0]
const rootMonkeyRightDependency = rootMonkey.dependencies[1]
const humnMonkey = monkeys.find((monkey) => monkey.name === 'humn')

// let useHumn = false
// rootMonkeyLeftDependency.getResult()
// console.log('useHumn', useHumn)

// useHumn = false
const rightResult = rootMonkeyRightDependency.getResult()

rootMonkey.dependencies = undefined
rootMonkeyLeftDependency.number = rightResult
rootMonkey.number = rightResult

humnMonkey.number = undefined

const invertTree = (newRoot) => {
  const inverseOperation = {
    '*': '/',
    '/': '*',
    '+': '-',
    '-': '+',
  }

  let node = newRoot
  while (node.parent.dependencies) {
    node.operation = inverseOperation[node.parent.operation]
    node.dependencies = [
      node.parent,
      node.parent.dependencies.find((monkey) => monkey.name !== node.name),
    ]
    const parent = node.parent
    node.parent = null
    node = parent
  }
}

invertTree(humnMonkey)

const result = humnMonkey.getResult()
console.log('result', result)
