import fs from 'fs'

const inputTxt = fs.readFileSync('./input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)

const MAX = 240
let x = 1
let pendingOp = null

let line = ''

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
  const pos = (c % 40) - 1
  const char = pos >= x - 1 && pos <= x + 1 ? '#' : '.'
  line += char
  if (c % 40 === 0) {
    console.log(line)
    line = ''
  }
  if (pendingOp?.cycle === c) {
    x += pendingOp.value
    pendingOp = null
  }
}
