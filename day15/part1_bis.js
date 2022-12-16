import fs from 'fs'

const isTest = false

const inputTxt = fs.readFileSync(
  isTest ? './test-input.txt' : './input.txt',
  'utf-8',
)

const resultRow = isTest ? 10 : 2000000

const lines = inputTxt.split(/\r?\n/)

const coords = lines
  .map((line) => {
    const matches = line.match(
      /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/,
    )
    return [
      [Number(matches[1]), Number(matches[2])],
      [Number(matches[3]), Number(matches[4])],
    ]
  })
  .filter(([[sx, sy], [bx, by]]) => {
    const distance = Math.abs(bx - sx) + Math.abs(by - sy)

    return sy >= resultRow - distance && sy <= resultRow + distance
  })

const beaconCoordsOnResultRow = new Set(
  coords
    .filter(([[sx, sy], [bx, by]]) => by === resultRow)
    .map(([[sx, sy], [bx, by]]) => bx),
)

const busyCells = coords.reduce((result, [[sx, sy], [bx, by]]) => {
  const distance = Math.abs(bx - sx) + Math.abs(by - sy)

  const minX = sx - (distance - Math.abs(resultRow - sy))
  const maxX = sx + (distance - Math.abs(resultRow - sy))
  for (let i = minX; i <= maxX; i++) {
    result.add(i)
  }
  return result
}, new Set())

const result = busyCells.size - beaconCoordsOnResultRow.size
console.log('result', result)
