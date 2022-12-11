const realCM = 13 * 2 * 7 * 17 * 5 * 11 * 3 * 19
const testCM = 23 * 19 * 13 * 17
const CM = realCM

class Monkey {
  constructor(
    startingItems,
    operation,
    divider,
    ifTrueThrowsTo,
    ifFalseThrowsTo,
  ) {
    this.startingItems = startingItems
    this.operation = operation
    this.divider = divider
    this.ifTrueThrowsTo = ifTrueThrowsTo
    this.ifFalseThrowsTo = ifFalseThrowsTo
    this.counter = 0
  }

  playTurn() {
    while (this.startingItems.length) {
      const item = this.startingItems.shift()
      this.counter++
      const temp = this.operation(item)
      const newWorryLevel = temp > CM ? temp % CM : temp
      const destinationMonkey =
        newWorryLevel % this.divider === 0
          ? this.ifTrueThrowsTo
          : this.ifFalseThrowsTo
      monkeys[destinationMonkey].pickItem(newWorryLevel)
    }
  }

  pickItem(item) {
    this.startingItems.push(item)
  }
}

const testMonkeys = [
  new Monkey([79, 98], (old) => old * 19, 23, 2, 3),
  new Monkey([54, 65, 75, 74], (old) => old + 6, 19, 2, 0),
  new Monkey([79, 60, 97], (old) => old * old, 13, 1, 3),
  new Monkey([74], (old) => old + 3, 17, 0, 1),
]

const realMonkeys = [
  new Monkey([84, 72, 58, 51], (old) => old * 3, 13, 1, 7),
  new Monkey([88, 58, 58], (old) => old + 8, 2, 7, 5),
  new Monkey([93, 82, 71, 77, 83, 53, 71, 89], (old) => old * old, 7, 3, 4),
  new Monkey([81, 68, 65, 81, 73, 77, 96], (old) => old + 2, 17, 4, 6),
  new Monkey([75, 80, 50, 73, 88], (old) => old + 3, 5, 6, 0),
  new Monkey([59, 72, 99, 87, 91, 81], (old) => old * 17, 11, 2, 3),
  new Monkey([86, 69], (old) => old + 6, 3, 1, 0),
  new Monkey([91], (old) => old + 1, 19, 2, 5),
]

const monkeys = realMonkeys

const rounds = 10000

for (let round = 1; round <= rounds; round++) {
  monkeys.forEach((monkey) => monkey.playTurn())
}

monkeys.forEach((monkey, i) => {
  console.log(i, monkey.counter, monkey.startingItems)
})

const counters = monkeys.map((monkey) => monkey.counter)
counters.sort((a, b) => b - a)
const result = counters[0] * counters[1]
console.log('result', result)
