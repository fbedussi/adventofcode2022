import fs from 'fs'

const inputTxt = fs.readFileSync('./input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)

const MAX = 220
let x = 1
let pendingOp = null

const checkPoints = [20, 60, 100, 140, 180, 220]
const strengths = []

for (let c = 1; c <= MAX; c++) {
  if (!pendingOp) {
    const line = lines.shift()
    if (line && line === 'noop') {
      pendingOp = { value: 0, cycle: c }
    }
    if (line && line !== 'noop') {
      const a = line.split(' ')
      pendingOp = { value: Number(a[1]), cycle: c + 1 }
    }
  }
  // console.log('cycle', c, 'registry', x)
  if (checkPoints.includes(c)) {
    strengths.push(x * c)
  }
  if (pendingOp?.cycle === c) {
    x += pendingOp.value
    pendingOp = null
  }
}

console.log('strengths', strengths)

const result = strengths.reduce((sum, num) => sum + num, 0)
console.log('result', result)
