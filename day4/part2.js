import fs from 'fs'

const inputTxt = fs.readFileSync('./input.txt', 'utf-8')

const FIELD_DELIMITER = ','

const lines = inputTxt.split(/\r?\n/).map((line) =>
  line
    .split(FIELD_DELIMITER)
    .map((value) =>
      value
        .trim()
        .split('-')
        .map((x) => Number(x)),
    )
    .sort(([elf1Min, elf1Max], [elf2Min, elf2Max]) => elf1Min - elf2Min),
)

const result = lines.reduce(
  (result, [[elf1Min, elf1Max], [elf2Min, elf2Max]]) => {
    console.log('\n', elf1Min, elf1Max, '-', elf2Min, elf2Max)
    if (elf2Min <= elf1Max) {
      console.log('overlap')
      result++
    }
    return result
  },
  0,
)

console.log('result', result)
