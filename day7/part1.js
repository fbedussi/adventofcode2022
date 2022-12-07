import { match } from 'assert'
import fs from 'fs'

const inputTxt = fs.readFileSync('./input.txt', 'utf-8')

// const FIELD_DELIMITER = ','

const lines = inputTxt.split(/\r?\n/).slice(2)
// .map((line) => line.split(FIELD_DELIMITER))

let currentFolder = null

class File {
  constructor(name, size) {
    this.name = name
    this.size = Number(size)
  }

  getSize() {
    return this.size
  }
}

class Folder {
  constructor(name, parent) {
    this.name = name
    this.parent = parent
    this.children = []
  }

  addChild(child) {
    this.children.push(child)
  }

  goBack() {
    currentFolder = this.parent
    return this.parent
  }

  cd(folderName) {
    const folder = this.children.find(
      (child) => child instanceof Folder && child.name === folderName,
    )
    if (!folder) {
      throw new Error(`no folder ${folderName}`)
    }
    currentFolder = folder
    return folder
  }

  getSize() {
    return this.children.reduce((tot, child) => tot + child.getSize(), 0)
  }
}

let root = new Folder('/', null)
currentFolder = root

const parseInput = () => {
  lines.forEach((line) => {
    if (line[0] !== '$') {
      const [one, two] = line.split(' ')
      if (one === 'dir') {
        currentFolder.addChild(new Folder(two, currentFolder))
      } else {
        currentFolder.addChild(new File(two, one))
      }
    } else {
      const [one, two, three] = line.split(' ')
      if (two === 'cd') {
        if (three == '/') {
          currentFolder = root
        } else if (three == '..') {
          currentFolder.goBack()
        } else {
          currentFolder.cd(three)
        }
      }
    }
  })
}

parseInput()

let sizes = []
const recordSizes = (folder) => {
  sizes.push({
    folder,
    size: folder.getSize(),
  })
  if (folder.children.length) {
    return folder.children
      .filter((child) => child instanceof Folder)
      .forEach((child) => {
        return recordSizes(child)
      })
  } else {
    return
  }
}

recordSizes(root)

const result = sizes
  .filter(({ size }) => size <= 100000)
  .reduce((sum, item) => sum + item.size, 0)
console.log('result', result)
