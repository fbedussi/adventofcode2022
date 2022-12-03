import { match } from 'assert'
import fs from 'fs'

const inputTxt = fs.readFileSync('./input.txt', 'utf-8')

const FIELD_DELIMITER = ' '

const lines = inputTxt.split(/\r?\n/)
// .map((line) => line.split(FIELD_DELIMITER).map((value) => value.trim()))

const result = lines
  .reduce((result, line, index) => {
    if (index % 3 === 0) {
      result.push([line])
    } else {
      result[result.length - 1].push(line)
    }
    return result
  }, [])
  .reduce((result, group) => {
    const charMap = group
      .map((sack) => [...new Set(sack.split(''))])
      .flat()
      .reduce((result, char) => {
        result[char] = (result[char] || 0) + 1
        return result
      }, {})

    const itemsInCommon = Object.entries(charMap)
      .filter(([char, times]) => times === 3)
      .map(([char]) => char)

    if (itemsInCommon.length !== 1) {
      throw new Error(`itemsInCommon.length is ${itemsInCommon.length}`)
    }

    const charCode = itemsInCommon[0].charCodeAt(0)
    const score = charCode >= 97 ? charCode - 96 : charCode - 38
    console.log(score)
    return result + score
  }, 0)

console.log('result', result)
