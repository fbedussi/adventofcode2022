import { match } from 'assert'
import fs from 'fs'

const inputTxt = fs.readFileSync('./input.txt', 'utf-8')

const FIELD_DELIMITER = ''

const lines = inputTxt
  .split(/\r?\n/)
  .map((lines) => lines.split(FIELD_DELIMITER))

let visibleTrees = lines.map((row) => row.map((tree) => false))

for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    if (x === 0 || lines[y].slice(0, x).every((three) => three < lines[y][x])) {
      visibleTrees[y][x] = true
    }
  }
}

for (let y = 0; y < lines.length; y++) {
  for (let x = lines[y].length - 1; x > -1; x--) {
    if (
      x === lines[y].length - 1 ||
      lines[y].slice(x + 1).every((three) => three < lines[y][x])
    ) {
      visibleTrees[y][x] = true
    }
  }
}

for (let x = 0; x < lines[0].length; x++) {
  for (let y = 0; y < lines.length; y++) {
    if (y === 0) {
      visibleTrees[y][x] = true
    } else {
      const prevTrees = []
      for (let prevY = y - 1; prevY > -1; prevY--) {
        prevTrees.push(lines[prevY][x])
      }
      if (prevTrees.every((three) => three < lines[y][x])) {
        visibleTrees[y][x] = true
      }
    }
  }
}

for (let x = 0; x < lines[0].length; x++) {
  for (let y = lines.length - 1; y > -1; y--) {
    if (y === lines.length - 1) {
      visibleTrees[y][x] = true
    } else {
      const prevTrees = []
      for (let nextY = y + 1; nextY < lines.length; nextY++) {
        prevTrees.push(lines[nextY][x])
      }
      if (prevTrees.every((three) => three < lines[y][x])) {
        visibleTrees[y][x] = true
      }
    }
  }
}

const result = visibleTrees.flat().filter(Boolean).length
console.log('result', result)
