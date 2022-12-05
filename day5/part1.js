import { match } from 'assert'
import fs from 'fs'

const inputTxt = fs.readFileSync('./input.txt', 'utf-8')

// const FIELD_DELIMITER = ','

const lines = inputTxt.split(/\r?\n/)
// .map((line) => line.split(FIELD_DELIMITER))

const [initial, moves] = lines.reduce(
  (result, line) => {
    const [initial, moves] = result
    if (line === '') {
      moves.push(line)
    } else if (moves.length) {
      if (moves[0] === '') {
        moves[0] = line
      } else {
        moves.push(line)
      }
    } else {
      initial.push(line)
    }
    return result
  },
  [[], []],
)

const initialReversed = initial.slice(0, initial.length - 1).reverse()

const numberOfStacks = (initialReversed[0].length + 1) / 4
const emptyStacks = new Array(numberOfStacks).fill(undefined).map(() => [])
const stacks = initialReversed.reduce((result, line) => {
  let i = 0
  while (i + 1 <= numberOfStacks) {
    const value = line
      .substring(i * 4, i * 4 + 4)
      .trim()
      .replace('[', '')
      .replace(']', '')

    if (value) {
      result[i].push(value)
    }

    i++
  }
  return result
}, emptyStacks)

const parsedMoves = moves.map((move) => {
  const parts = move.split(' ')
  return [Number(parts[1]), Number(parts[3]) - 1, Number(parts[5]) - 1]
})

parsedMoves.forEach(([move, from, to]) => {
  while (move > 0) {
    const take = stacks[from].pop()
    stacks[to].push(take)
    move--
  }
})

const result = stacks.map((stack) => stack[stack.length - 1]).join('')
console.log('result', result)
