import fs from 'fs'

const isTest = false
const inputTxt = fs.readFileSync(
  isTest ? './test-input.txt' : './input.txt',
  'utf-8',
)

const directions = inputTxt.split(/\r?\n/)[0].split('')

console.log((directions.length * 10) / 5)

function* circularArray(arr) {
  let i = 0
  while (true) {
    yield arr[i]
    if (i < arr.length - 1) {
      i++
    } else {
      i = 0
    }
  }
}

const getDirection = circularArray(directions)
// console.log(getDirections.next().value)

const hBar = [['-', '-', '-', '-']]

const plus = [
  ['', '+', ''],
  ['+', '+', '+'],
  ['', '+', ''],
]

const L = [
  ['', '', 'L'],
  ['', '', 'L'],
  ['L', 'L', 'L'],
]

const vBar = [['|'], ['|'], ['|'], ['|']]

const square = [
  ['#', '#'],
  ['#', '#'],
]

const shapes = [hBar, plus, L, vBar, square]

const getShape = circularArray(shapes)

const WIDTH = 7
const LEFT_START = 2
const BOTTOM_START = 3

let highestLevel = 0

let rocksStopped = 0

const emptyRow = new Array(WIDTH).fill('')
let field = []

function* iterator() {
  let i = 0
  while (true) {
    yield i++
  }
}

const addShapeToField = (shape, left, bottom) => {
  const initialFieldLength = field.length
  for (let shapeY = 0; shapeY < shape.length; shapeY++) {
    for (let shapeX = 0; shapeX < shape[0].length; shapeX++) {
      if (shape[shapeY][shapeX]) {
        const fieldX = shapeX + left
        const fieldY = bottom + (shape.length - 1 - shapeY)
        if (!field[fieldY]) {
          field[fieldY] = emptyRow.slice()
        }
        field[fieldY][fieldX] = shape[shapeY][shapeX]
      }
    }
  }
  const finalFieldLength = field.length
  const delta = finalFieldLength - initialFieldLength

  if (finalFieldLength > 20000) {
    field.splice(0, 10000)
  }

  return delta
}

const printField = () => {
  field
    .slice()
    .reverse()
    .forEach((line, index) => {
      const rowNumber = field.length - index
      const rowLabel = `${rowNumber < 10 ? '0' : ''}${rowNumber}`
      console.log(`${rowLabel}|${line.map((c) => (c ? c : '.')).join('')}|`)
    })
  console.log('  +-------+')
}

const checkSpace = (shape, left, bottom) => {
  if (bottom >= highestLevel) {
    return true
  }
  if (bottom === -1) {
    return false
  }

  return shape.every((row, indexY) => {
    return row.every((cell, indexX) => {
      return (
        !cell ||
        !field[bottom + (shape.length - 1 - indexY)] ||
        !field[bottom + (shape.length - 1 - indexY)][left + indexX]
      )
    })
  })
  // [shape.length - 1]
}

while (rocksStopped < 10000000) {
  let rockStopped = false
  const shape = getShape.next().value
  let left = LEFT_START
  let bottom = BOTTOM_START + highestLevel
  const getIteration = iterator()

  if (rocksStopped % 1_000_000 === 0) {
    console.log('rocksStopped', rocksStopped)
  }
  while (!rockStopped) {
    const iteration = getIteration.next().value
    // console.log('iteration', iteration)
    if (iteration % 2 === 0) {
      const direction = getDirection.next().value
      // console.log(direction)
      if (direction === '>') {
        if (
          left + shape[0].length < WIDTH &&
          checkSpace(shape, left + 1, bottom)
        ) {
          left++
        }
      } else {
        if (left > 0 && checkSpace(shape, left - 1, bottom)) {
          left--
        }
      }
    } else {
      if (checkSpace(shape, left, bottom - 1)) {
        bottom--
      } else {
        const delta = addShapeToField(shape, left, bottom)
        rockStopped = true
        rocksStopped++
        highestLevel += delta
        // printField()
        // console.log('tower tall', highestLevel, '\n')
      }
    }
  }
}

console.log('result', highestLevel)
// 3069 low
