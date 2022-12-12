import fs from 'fs'

const inputTxt = fs.readFileSync('./input.txt', 'utf-8')

const map = inputTxt.split(/\r?\n/).map((line) => line.split(''))

let S
let E
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] === 'S') {
      S = [x, y]
      map[y][x] = 'a'
    }
    if (map[y][x] === 'E') {
      E = [x, y]
      map[y][x] = 'z'
    }
    map[y][x] = map[y][x].charCodeAt(0) - 97
  }
}
console.log('S', S)
console.log('E', E)

class Node {
  constructor(parent, x, y) {
    this.parent = parent
    this.depth = parent ? parent.depth + 1 : 0
    this.children = undefined
    this.x = x
    this.y = y
  }
}

let visited = {}
let queue = []
const visitNode = (node) => {
  visited[`${node.x},${node.y}`] = true

  if (node.x === E[0] && node.y === E[1]) {
    console.log('result', node.depth)
    return
  }

  if (!node.children) {
    node.children = []

    const childrenCoords = []
    if (node.x > 0) {
      childrenCoords.push([node.x - 1, node.y])
    }
    if (node.y > 0) {
      childrenCoords.push([node.x, node.y - 1])
    }
    if (node.x < map[node.y].length - 1) {
      childrenCoords.push([node.x + 1, node.y])
    }
    if (node.y < map.length - 1) {
      childrenCoords.push([node.x, node.y + 1])
    }

    childrenCoords
      .filter(([x, y]) => {
        const ancestor = x === node.parent?.x && y === node.parent?.y

        const childValue = map[y][x]
        const nodeValue = map[node.y][node.x]
        const valueMatch = childValue <= nodeValue + 1

        return !ancestor && valueMatch && !visited[`${x},${y}`]
      })
      .forEach((childCoord) => {
        if (
          !queue.find(
            (node) => node.x === childCoord[0] && node.y === childCoord[1],
          )
        ) {
          queue.push(new Node(node, ...childCoord))
        }
      })
  }

  const nextNode = queue.shift()
  visitNode(nextNode)
}

visitNode(new Node(null, ...S))
