import fs from 'fs'

const inputTxt = fs.readFileSync('./input.txt', 'utf-8')

const pairs = inputTxt.split(/\r?\n/).reduce(
  (result, line) => {
    if (line) {
      result[result.length - 1].push(eval(line))
    } else {
      result.push([])
    }
    return result
  },
  [[]],
)

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

const orderedMap = pairs.map((pair, index) => {
  const sorted = compare(...pair)
  return sorted
})

console.log('orderedMap', orderedMap)

const result = orderedMap.reduce((result, ordered, index) => {
  if (ordered) {
    result += index + 1
  }
  return result
}, 0)

console.log('result', result)
// 6111
