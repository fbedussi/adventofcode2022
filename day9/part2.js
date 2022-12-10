import fs from 'fs'

const inputTxt = fs.readFileSync('./input.txt', 'utf-8')

const FIELD_DELIMITER = ' '

const lines = inputTxt.split(/\r?\n/).map((line) => {
  const [direction, steps] = line.split(FIELD_DELIMITER)

  return [direction, Number(steps)]
})

const numberOfKnots = 10
const knots = new Array(numberOfKnots).fill(undefined).map(() => [0, 0])

const moveX = (coordsH, coordsT) => {
  coordsT[0] += coordsH[0] - coordsT[0] > 0 ? 1 : -1
}

const moveY = (coordsH, coordsT) => {
  coordsT[1] += coordsH[1] - coordsT[1] > 0 ? 1 : -1
}

let history = [knots[knots.length - 1].join(',')]

lines.forEach(([direction, steps]) => {
  while (steps > 0) {
    const coordsH = knots[0]
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
    for (let i = 0; i < knots.length - 1; i++) {
      const coordsH = knots[i]
      const coordsT = knots[i + 1]

      const deltaX = Math.abs(coordsH[0] - coordsT[0])
      const deltaY = Math.abs(coordsH[1] - coordsT[1])

      if (deltaX > 1 && deltaY === 0) {
        moveX(coordsH, coordsT)
      } else if (deltaY > 1 && deltaX === 0) {
        moveY(coordsH, coordsT)
      } else if ((deltaX > 1 && deltaY > 0) || (deltaY > 1 && deltaX > 0)) {
        moveX(coordsH, coordsT)
        moveY(coordsH, coordsT)
      }
    }
    history.push(knots[knots.length - 1].join(','))

    steps--
  }
})

// console.log('history', history)
const result = new Set(history)
console.log('result', result.size)
// 2643
