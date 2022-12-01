import fs from 'fs'
import path from 'path'

const inputTxt = fs.readFileSync('./input.txt', 'utf-8')

const FIELD_DELIMITER = '|'

const lines = inputTxt.split(/\r?\n/)
// .map(line => line.split(FIELD_DELIMITER).map(value => value.trim().replace(/^"|"$/g, '')))

const totalCaloriesPerELv = lines.reduce(
  (result, line) => {
    console.log(line)
    if (!line) {
      result.push(0)
    } else {
      result[result.length - 1] = result[result.length - 1] + Number(line)
    }
    return result
  },
  [0],
)

console.log('totalCaloriesPerELv', totalCaloriesPerELv)
const response = Math.max(...totalCaloriesPerELv)

console.log('response', response)
