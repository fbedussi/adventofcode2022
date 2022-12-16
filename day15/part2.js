import fs from 'fs'

const inputTxt = fs.readFileSync('./input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)

const coords = lines
  .flat()
  .flatMap((line) => line.split(' -> '))
  .map((coord) => coord.split(',').map((n) => Number(n)))

const coordsWithStartingPoint = coords.concat([[500, 0]])

const xs = coordsWithStartingPoint.map(([x]) => x)
const ys = coordsWithStartingPoint.map(([, y]) => y)

const maxX = Math.max(...xs)
let minX = Math.min(...xs)

const maxY = Math.max(...ys)
const minY = Math.min(...ys)

const map = new Array(maxY + 1 + 2)
  .fill(undefined)
  .map(() => new Array(maxX + 2 + 200).fill('.'))

lines.forEach((line) => {
  const coords = line
    .split(' -> ')
    .map((str) => str.split(',').map((n) => Number(n)))
  coords.forEach((coord, index, arr) => {
    if (index < arr.length - 1) {
      const start = coord
      const end = arr[index + 1]
      let x = start[0]
      let y = start[1]
      map[y][x] = '#'
      while (x !== end[0] || y !== end[1]) {
        if (x < end[0]) {
          x++
        }
        if (x > end[0]) {
          x--
        }
        if (y < end[1]) {
          y++
        }
        if (y > end[1]) {
          y--
        }
        map[y][x] = '#'
      }
    }
  })
})

map[map.length - 1] = map[map.length - 1].map(() => '#')

const drawMap = () => {
  map.forEach((line) => {
    console.log(line.slice(minX - 1).join(''))
  })
}

drawMap()

let unitOfSand = 0

const dropSand = () => {
  unitOfSand++
  let x = 500
  let y = 0
  let rest = false
  while (!rest) {
    if (map[y + 1][x] === '.') {
      y++
    } else if (map[y + 1][x - 1] === '.') {
      y++
      x--
    } else if (map[y + 1][x + 1] === '.') {
      y++
      x++
    } else {
      rest = true
    }
  }

  if (x < minX) {
    minX = x
  }

  if (rest) {
    map[y][x] = 'o'
  }

  console.log(x)
  return y !== 0
}

while (dropSand()) {
  // console.log(unitOfSand)
}

drawMap()
console.log('result', unitOfSand)
