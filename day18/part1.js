import fs from 'fs'

const isTest = false
const inputTxt = fs.readFileSync(
  isTest ? './test-input.txt' : './input.txt',
  'utf-8',
)

const coords = inputTxt
  .split(/\r?\n/)
  .map((line) => line.split(',').map((cell) => Number(cell)))

const xs = coords.map(([x, y, z]) => x)
const ys = coords.map(([x, y, z]) => y)
const zs = coords.map(([x, y, z]) => z)

const minX = Math.min(...xs)
const maxX = Math.max(...xs)

const minY = Math.min(...ys)
const maxY = Math.max(...ys)

const minZ = Math.min(...zs)
const maxZ = Math.max(...zs)

const matrix = new Array(maxZ + 1)
  .fill(undefined)
  .map(() =>
    new Array(maxY + 1)
      .fill(undefined)
      .map(() => new Array(maxX + 1).fill(undefined)),
  )

coords.forEach(([x, y, z]) => {
  matrix[z][y][x] = 'x'
})

const isEmptyCell = (x, y, z) => {
  return !matrix[z] || !matrix[z][y] || !matrix[z][y][x]
}

const countExposedSides = ([x, y, z]) => {
  let exposed = 0
  if (isEmptyCell(x - 1, y, z)) {
    exposed++
  }
  if (isEmptyCell(x + 1, y, z)) {
    exposed++
  }
  if (isEmptyCell(x, y - 1, z)) {
    exposed++
  }
  if (isEmptyCell(x, y + 1, z)) {
    exposed++
  }
  if (isEmptyCell(x, y, z - 1)) {
    exposed++
  }
  if (isEmptyCell(x, y, z + 1)) {
    exposed++
  }
  return exposed
}

let exposedSides = 0
coords.forEach((coord) => {
  exposedSides += countExposedSides(coord)
})

console.log('result', exposedSides)
