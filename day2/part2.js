import { match } from 'assert'
import fs from 'fs'

const inputTxt = fs.readFileSync('./input.txt', 'utf-8')

const FIELD_DELIMITER = ' '

const lines = inputTxt
  .split(/\r?\n/)
  .map((line) => line.split(FIELD_DELIMITER).map((value) => value.trim()))

const codesMap = {
  A: {
    value: 1,
    defeats: 'C',
  },
  B: {
    value: 2,
    defeats: 'A',
  },
  C: {
    value: 3,
    defeats: 'B',
  },
}

const result = lines.reduce((result, [opponentCode, expectedResult]) => {
  const opponentMove = codesMap[opponentCode]
  let playerMove = codesMap[opponentCode]

  if (expectedResult === 'X') {
    const playerCode = opponentMove.defeats
    playerMove = codesMap[playerCode]
  }

  if (expectedResult === 'Z') {
    const playerCode = Object.entries(codesMap).find(
      ([code, { defeats }]) => defeats === opponentCode,
    )[0]
    playerMove = codesMap[playerCode]
  }

  let matchScore = 0

  if (opponentMove.value === playerMove.value) {
    matchScore = 3
  }

  if (playerMove.defeats === opponentCode) {
    matchScore = 6
  }

  return result + playerMove.value + matchScore
}, 0)

console.log('result', result)
