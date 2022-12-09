import fs from 'fs'

const inputTxt = fs.readFileSync('./input.txt', 'utf-8')

const FIELD_DELIMITER = ' '

const lines = inputTxt
  .split(/\r?\n/)
  .map((line) => line.split(FIELD_DELIMITER).map((value) => value.trim()))

const opponentCodesMap = {
  A: {
    value: 1,
    defeats: 'Z',
  },
  B: {
    value: 2,
    defeats: 'X',
  },
  C: {
    value: 3,
    defeats: 'Y',
  },
}

const palyerCodesMap = {
  X: {
    value: 1,
    defeats: 'C',
  },
  Y: {
    value: 2,
    defeats: 'A',
  },
  Z: {
    value: 3,
    defeats: 'B',
  },
}

const result = lines.reduce((result, [opponentCode, playerCode]) => {
  const opponentMove = opponentCodesMap[opponentCode]
  const playerMove = palyerCodesMap[playerCode]

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
