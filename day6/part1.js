import fs from 'fs'

const inputTxt = fs.readFileSync('./input.txt', 'utf-8')

// const FIELD_DELIMITER = ','

const lines = inputTxt.split(/\r?\n/)
// .map((line) => line.split(FIELD_DELIMITER))

const input = lines[0]

const areCharsDifferent = (str) => {
  return [...new Set(str.split(''))].length === str.length
}

let i = 0
while (!areCharsDifferent(input.substring(i, i + 4))) {
  i++
}

console.log(i + 4)
