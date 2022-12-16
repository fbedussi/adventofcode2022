import fs from 'fs'

const isTest = false

const inputTxt = fs.readFileSync(
  isTest ? './test-input.txt' : './input.txt',
  'utf-8',
)

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
  .map(([[sx, sy], [bx, by]]) => {
    const distance = Math.abs(bx - sx) + Math.abs(by - sy)
    return [sx, sy, distance]
  })

let emptyX
let emptyY

for (let resultRow = 0; resultRow <= isTest ? 20 : 4000000; resultRow++) {
  if (emptyX !== undefined) {
    break
  }

  if (resultRow % 1000 === 0) {
    console.log('analysing row', resultRow)
  }

  const innerCoords = coords.filter(([sx, sy, distance]) => {
    return sy >= resultRow - distance && sy <= resultRow + distance
  })

  const intervals = innerCoords.map(([sx, sy, distance]) => {
    const minX = sx - (distance - Math.abs(resultRow - sy))
    const maxX = sx + (distance - Math.abs(resultRow - sy))
    return [Math.max(0, minX), Math.min(maxX, isTest ? 20 : 4000000)]
  })
  intervals.sort((a, b) => a[0] - b[0])

  let joinedIntervals = []
  let item = intervals.shift()
  let min = item[0]
  let max = item[1]
  while (item) {
    let nextItem = !!intervals.length && intervals.shift()
    if (!nextItem) {
      joinedIntervals.push([min, max])
    } else if (nextItem[1] < max) {
    } else if (nextItem[0] <= max && nextItem[1] >= max) {
      max = nextItem[1]
    } else {
      joinedIntervals.push([min, max])
    }
    item = nextItem
  }

  const emptyCellX = joinedIntervals.length > 1 && joinedIntervals[0][1] + 1
  if (emptyCellX) {
    emptyX = emptyCellX
    emptyY = resultRow
    console.log('emptyCell', emptyCellX, resultRow)
  }
}

const result = emptyX * 4000000 + emptyY
console.log('result', result)
console.assert(result === 13350458933732)
