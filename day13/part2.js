import fs from 'fs'

const inputTxt = fs.readFileSync('./input.txt', 'utf-8')

const packets = inputTxt
  .split(/\r?\n/)
  .reduce((result, line) => {
    if (line) {
      result.push(eval(line))
    }
    return result
  }, [])
  .concat([[[2]], [[6]]])

// console.log('packets', packets)

const compare = (left, right) => {
  if (!Array.isArray(left) && !Array.isArray(right)) {
    if (left < right) {
      return true
    }
    if (left > right) {
      return false
    }
    return undefined
  }

  if (!Array.isArray(left) || !Array.isArray(right)) {
    return compare([].concat(left), [].concat(right))
  }

  let sorted = undefined
  while (sorted === undefined && left.length && right.length) {
    sorted = compare(left.shift(), right.shift())
  }

  if (sorted === undefined && !left.length && right.length) {
    sorted = true
  }

  if (sorted === undefined && !right.length && left.length) {
    sorted = false
  }

  return sorted
}

packets.sort((left, right) => {
  const result = compare(
    JSON.parse(JSON.stringify(left)),
    JSON.parse(JSON.stringify(right)),
  )
  return result ? -1 : 1
})

// console.log('sorted packets', packets)

let divider1Index
let divider2Index

const divider1 = JSON.stringify([[2]])
const divider2 = JSON.stringify([[6]])
for (let i = 0; i < packets.length; i++) {
  const item = JSON.stringify(packets[i])
  if (item === divider1) {
    divider1Index = i + 1
  }
  if (item === divider2) {
    divider2Index = i + 1
  }
  if (divider1Index !== undefined && divider2Index !== undefined) {
    break
  }
}

const result = divider1Index * divider2Index

console.log('result', result)
