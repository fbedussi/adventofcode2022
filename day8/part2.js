import fs from 'fs'

const inputTxt = fs.readFileSync('./input.txt', 'utf-8')

const FIELD_DELIMITER = ''

const lines = inputTxt
  .split(/\r?\n/)
  .map((lines) => lines.split(FIELD_DELIMITER).map(Number))

let scoreMap = lines.map((row) =>
  row.map((tree) => ({ up: 0, down: 0, left: 0, right: 0 })),
)

const checkUp = (x, y) => {
  for (let prevY = y - 1; prevY >= 0; prevY--) {
    scoreMap[y][x].up += 1
    if (lines[prevY][x] >= lines[y][x]) {
      break
    }
  }
}

const checkDown = (x, y) => {
  for (let nextY = y + 1; nextY < lines.length; nextY++) {
    scoreMap[y][x].down += 1
    if (lines[nextY][x] >= lines[y][x]) {
      break
    }
  }
}

const checkLeft = (x, y) => {
  for (let prevX = x - 1; prevX >= 0; prevX--) {
    scoreMap[y][x].left += 1
    if (lines[y][prevX] >= lines[y][x]) {
      break
    }
  }
}

const checkRight = (x, y) => {
  for (let nextX = x + 1; nextX < lines[y].length; nextX++) {
    scoreMap[y][x].right += 1
    if (lines[y][nextX] >= lines[y][x]) {
      break
    }
  }
}

const checkCell = (x, y) => {
  checkUp(x, y)
  checkDown(x, y)
  checkLeft(x, y)
  checkRight(x, y)
}

for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    checkCell(x, y)
  }
}

console.log(scoreMap)

const resultMap = scoreMap.map((line) =>
  line.map((cell) => Object.values(cell).reduce((tot, val) => tot * val)),
)

const result = resultMap.flat()
console.log('result', Math.max(...result))
