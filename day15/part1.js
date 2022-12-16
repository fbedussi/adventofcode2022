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

const minMaxXY = coords.map(([[sx, sy], [bx, by]]) => {
  const distance = Math.abs(bx - sx) + Math.abs(by - sy)

  return [
    [sx - distance, sx + distance],
    [sy - distance, sy + distance],
  ]
})

const minMaxX = minMaxXY.flatMap(([[minX, maxX]]) => [minX, maxX])
const minMaxY = minMaxXY.flatMap(([[minX, maxX], [minY, maxY]]) => [minY, maxY])

const minX = Math.min(...minMaxX)
const maxX = Math.max(...minMaxX)
const minY = Math.min(...minMaxY)
const maxY = Math.max(...minMaxY)

const lengthX = maxX - minX
const lengthY = maxY - minY
console.log('lengthX', lengthX)
console.log('lengthY', lengthY)

const offsetX = 0 - minX
const offsetY = 0 - minY

console.log(1)
const map = new Array(lengthY)
  .fill(undefined)
  .map(() => new Array(lengthX).fill('.'))
console.log(2)

const drawMap = () => {
  map.forEach((line, index) => {
    const y = index - offsetY
    console.log(
      `${y < 0 ? '-' : '+'}${Math.abs(y) < 10 ? '0' : ''}${Math.abs(y)}`,
      line.join(''),
    )
  })
}

const setOnMap = (x, y, marker = '#') => {
  const mapX = x + offsetX
  const mapY = y + offsetY
  if (
    mapX >= 0 &&
    mapX < map[0].length &&
    mapY >= 0 &&
    mapY < map.length &&
    (marker !== '#' || map[mapY][mapX] === '.')
  ) {
    map[mapY][mapX] = marker
  }
}

coords.forEach(([[sx, sy], [bx, by]]) => {
  setOnMap(sx, sy, 'S')
  setOnMap(bx, by, 'B')

  // if (/* sx === 8 && */ sy === 0) {
  const distance = Math.abs(bx - sx) + Math.abs(by - sy)
  for (let i = 0; i <= distance; i++) {
    for (let dx = sx - (distance - i); dx <= sx + (distance - i); dx++) {
      setOnMap(dx, sy - i)
      setOnMap(dx, sy + i)
    }
  }
  // }
})

drawMap()

const result = map[resultRow + offsetY].filter((char) => char === '#').length
console.log('result', result)
