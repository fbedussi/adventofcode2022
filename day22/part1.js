import fs from 'fs'

const isTest = false
const inputTxt = fs.readFileSync(
  isTest ? './test-input.txt' : './input.txt',
  'utf-8',
)

const lines = inputTxt.split(/\r?\n/)

const instructions = lines
  .pop()
  .match(/(\d+|\w)/g)
  .map((inst) => (['L', 'R'].includes(inst) ? inst : Number(inst)))

const map = lines.map((line) =>
  line.split('').map((char) => (char === ' ' ? '' : char)),
)

let x = 0
let y = 0
let direction = 'R'

const changeDirection = (turn) => {
  const directions = ['R', 'D', 'L', 'U']
  const currentDirectionIndex = directions.indexOf(direction)
  let newDirectionIndex =
    turn === 'R' ? currentDirectionIndex + 1 : currentDirectionIndex - 1
  if (newDirectionIndex > directions.length - 1) {
    newDirectionIndex = newDirectionIndex - (directions.length - 1)
  } else if (newDirectionIndex < 0) {
    newDirectionIndex = directions.length + newDirectionIndex
  }
  direction = directions[newDirectionIndex]
}

const getPosition = (x, y) => {
  const result = map[y] && map[y][x]
  return result
}

const reenterFromLeft = () => {
  let tempX = 0
  while (!getPosition(tempX, y)) {
    tempX++
  }

  return tempX
}

const reenterFromRight = () => {
  let tempX = map[y].length - 1
  while (!getPosition(tempX, y)) {
    tempX--
  }

  return tempX
}

const reenterFromTop = () => {
  let tempY = 0
  while (!getPosition(x, tempY)) {
    tempY++
  }

  return tempY
}

const reenterFromBottom = () => {
  let tempY = map.length - 1
  while (!getPosition(x, tempY)) {
    tempY--
  }

  return tempY
}

const move = (steps) => {
  while (steps) {
    let newXTemp = x
    let newYTemp = y
    switch (direction) {
      case 'R':
        newXTemp++
        break
      case 'D':
        newYTemp++
        break
      case 'L':
        newXTemp--
        break
      case 'U':
        newYTemp--
        break
    }

    if (!getPosition(newXTemp, newYTemp)) {
      switch (direction) {
        case 'R':
          newXTemp = reenterFromLeft()
          break
        case 'D':
          newYTemp = reenterFromTop()
          break
        case 'L':
          newXTemp = reenterFromRight()
          break
        case 'U':
          newYTemp = reenterFromBottom()
          break
      }
    }

    if (getPosition(newXTemp, newYTemp) !== '#') {
      x = newXTemp
      y = newYTemp
    }

    steps--
  }
}

x = reenterFromLeft()

while (instructions.length) {
  console.log(x, y)
  const instruction = instructions.shift()
  if (['L', 'R'].includes(instruction)) {
    changeDirection(instruction)
  } else {
    move(instruction)
  }
}

const facingMap = {
  R: 0,
  D: 1,
  L: 2,
  U: 3,
}

console.log(
  'result',
  x,
  y,
  facingMap[direction],
  (y + 1) * 1000 + (x + 1) * 4 + facingMap[direction],
)
// 3570 too low
