import { match } from 'assert'
import fs from 'fs'

const inputTxt = fs.readFileSync('./input.txt', 'utf-8')

const FIELD_DELIMITER = ' '

const lines = inputTxt.split(/\r?\n/)
// .map((line) => line.split(FIELD_DELIMITER).map((value) => value.trim()))

const result = lines.reduce((result, content) => {
  const contArr = content.split('')
  const firstHalf = [...new Set(contArr.slice(0, contArr.length / 2))]
  const secondHalf = contArr.slice(contArr.length / 2)

  const secondHalfMap = secondHalf.reduce((result, char) => {
    result[char] = true
    return result
  }, {})

  const itemsInCommon = firstHalf.filter((char) => secondHalfMap[char])

  if (itemsInCommon.length !== 1) {
    throw new Error(`itemsInCommon.length is ${itemsInCommon.length}`)
  }

  const charCode = itemsInCommon[0].charCodeAt(0)
  const score = charCode >= 97 ? charCode - 96 : charCode - 38
  console.log(score)
  return result + score
}, 0)

console.log('result', result)
