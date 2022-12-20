import fs from 'fs'

const isTest = false
const inputTxt = fs.readFileSync(
  isTest ? './test-input.txt' : './input.txt',
  'utf-8',
)

const numbers = inputTxt.split(/\r?\n/).map((line) => Number(line))

class Node {
  constructor(prev, next, value) {
    this.prev = prev
    this.next = next
    this.value = value
  }

  replacePrev(newPrev) {
    this.prev = newPrev
  }

  replaceNext(newNext) {
    this.next = newNext
  }
}

const LinkedList = {
  head: null,
  tail: null,

  moveNodeAfter(itemToMove, itemToInsertAfter) {
    const itemToMove_prev = itemToMove.prev
    const itemToMove_next = itemToMove.next

    const itemToInsertAfter_next = itemToInsertAfter.next

    isTest &&
      console.log(
        itemToMove.value,
        'moves between',
        itemToInsertAfter.value,
        'and',
        itemToInsertAfter_next.value,
      )

    itemToInsertAfter.next = itemToMove
    itemToMove.prev = itemToInsertAfter

    itemToMove.next = itemToInsertAfter_next
    itemToInsertAfter_next.prev = itemToMove

    itemToMove_prev.next = itemToMove_next
    itemToMove_next.prev = itemToMove_prev

    LinkedList.print()
  },

  moveNodeForward(node) {
    let steps = node.value
    if (steps === 0) {
      return null
    }

    let itemToInsertAfter = node
    while (steps) {
      itemToInsertAfter = itemToInsertAfter.next
      steps--
    }

    this.moveNodeAfter(node, itemToInsertAfter)
  },

  moveNodeBackward(node) {
    let steps = node.value
    if (steps === 0) {
      return null
    }

    steps--

    let itemToInsertAfter = node
    while (steps) {
      itemToInsertAfter = itemToInsertAfter.prev
      steps++
    }

    this.moveNodeAfter(node, itemToInsertAfter)
  },

  print() {
    if (!isTest) {
      return
    }

    const values = [this.head.value]
    let currentItem = this.head.next
    for (let i = 1; i < numbers.length; i++) {
      values.push(currentItem.value)
      currentItem = currentItem.next
    }
    console.log(...values)
  },
}

const queue = []
let prev = null
numbers.forEach((number, index) => {
  const node = new Node(prev, null, number)
  if (index === 0) {
    LinkedList.head = node
  }
  if (index === numbers.length - 1) {
    LinkedList.tail = node
  }
  prev?.replaceNext(node)
  queue.push(node)

  prev = node
})

LinkedList.head.replacePrev(LinkedList.tail)
LinkedList.tail.replaceNext(LinkedList.head)

LinkedList.print()

while (queue.length) {
  const itemToMove = queue.shift()
  console.log('items left to process', queue.length)

  if (itemToMove.value > 0) {
    LinkedList.moveNodeForward(itemToMove)
  } else if (itemToMove.value < 0) {
    LinkedList.moveNodeBackward(itemToMove)
  } else if (isTest) {
    console.log('0 does not move')
    LinkedList.print()
  }
}

const groveCoordinates = []

let itemZero = null
let item = LinkedList.head
while (!itemZero) {
  item = item.next
  if (item.value === 0) {
    itemZero = item
  }
}

let currentItem = itemZero
for (let i = 1; i <= 3000; i++) {
  currentItem = currentItem.next
  if ([1000, 2000, 3000].includes(i)) {
    groveCoordinates.push(currentItem.value)
  }
}

console.log('groveCoordinates', groveCoordinates)

console.log(
  'result',
  groveCoordinates.reduce((sum, num) => sum + num, 0),
)
// 14626 too high
