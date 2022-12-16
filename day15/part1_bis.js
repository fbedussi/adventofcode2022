import fs from 'fs'

const isTest = true

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

    return sy > resultRow - distance && sy < resultRow + distance
  })

const beaconCoordsOnResultRow = new Set(
  coords
    .filter(([[sx, sy], [bx, by]]) => by === resultRow)
    .map(([[sx, sy], [bx, by]]) => bx),
)

const busyCells = coords.reduce((result, [[sx, sy], [bx, by]]) => {
  const distance = Math.abs(bx - sx) + Math.abs(by - sy)

  const totCells = 1 + 2 * (distance - (resultRow - sy))
  const minX = sx - Math.floor(totCells / 2)
  const maxX = sx + Math.floor(totCells / 2)
  for (let i = minX; i <= maxX; i++) {
    result.add(i)
  }
  return result
}, new Set())

const result = busyCells.size - beaconCoordsOnResultRow.size
console.log('result', result)
// 5198895 high
