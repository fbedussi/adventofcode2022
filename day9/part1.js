import fs from 'fs'

const inputTxt = fs.readFileSync('./input.txt', 'utf-8')

const FIELD_DELIMITER = ' '

const lines = inputTxt.split(/\r?\n/).map((line) => {
  const [direction, steps] = line.split(FIELD_DELIMITER)

  return [direction, Number(steps)]
})

let coordsH = [0, 0]
let coordsT = [0, 0]

let history = [coordsT.join(',')]

const moveX = () => {
  coordsT[0] += coordsH[0] - coordsT[0] > 0 ? 1 : -1
}

const moveY = () => {
  coordsT[1] += coordsH[1] - coordsT[1] > 0 ? 1 : -1
}

let counter = 1
lines.forEach(([direction, steps]) => {
  while (steps > 0) {
    console.log(counter++, coordsT)
    switch (direction) {
      case 'U':
        coordsH[1] -= 1
        break
      case 'D':
        coordsH[1] += 1
        break
      case 'R':
        coordsH[0] += 1
        break
      case 'L':
        coordsH[0] -= 1
        break
    }

    const deltaX = Math.abs(coordsH[0] - coordsT[0])
    const deltaY = Math.abs(coordsH[1] - coordsT[1])

    if (deltaX > 1 && deltaY === 0) {
      moveX()
    } else if (deltaY > 1 && deltaX === 0) {
      moveY()
    } else if (deltaX > 1 && deltaY > 0) {
      moveX()
      coordsT[1] = coordsH[1]
    } else if (deltaY > 1 && deltaX > 0) {
      moveY()
      coordsT[0] = coordsH[0]
    }

    history.push(coordsT.join(','))

    steps--
  }
})

// console.log('history', history)
const result = new Set(history)
console.log('result', result.size)
