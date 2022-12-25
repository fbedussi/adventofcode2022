import fs from 'fs'

const isTest = false
const inputTxt = fs.readFileSync(
  isTest ? './test-input.txt' : './input.txt',
  'utf-8',
)

const lines = inputTxt.split(/\r?\n/)

const convertSNAUF = (snauf) => {
  const snaufArr = snauf.split('').reverse()
  const result = snaufArr.reduce((result, snaufDigit, index) => {
    const position = index
    const multiplier = Math.pow(5, position)
    const multiplicand =
      snaufDigit === '-' ? -1 : snaufDigit === '=' ? -2 : Number(snaufDigit)
    const convertedDigit = multiplicand * multiplier

    return result + convertedDigit
  }, 0)

  return result
}

const convertedNumbers = lines.map(convertSNAUF)

const total = convertedNumbers.reduce((tot, num) => tot + num)

console.log('total', total)

const convertToSNAUF = (num) => {
  const digits = []
  let index = 1
  while (Math.abs(num) > Math.pow(5, index) * 2) {
    index++
  }

  while (index >= 0) {
    const digit = Math.round(num / Math.pow(5, index))
    const convertedDigit =
      digit === -1 ? '-' : digit === -2 ? '=' : digit.toString()
    digits.push(convertedDigit)
    num = num - digit * Math.pow(5, index)
    index--
  }

  return digits.join('')
}

console.log('result', convertToSNAUF(total))
