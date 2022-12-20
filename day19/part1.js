import fs from 'fs'

const isTest = false
const inputTxt = fs.readFileSync(
  isTest ? './test-input.txt' : './input.txt',
  'utf-8',
)

class Robot {
  constructor(resources) {
    this.output = 1
    this.resources = resources
  }
}

class OreRobot extends Robot {
  constructor(requiredOre, resources) {
    super(resources)
    this.requiredOre = requiredOre
    this.resources.ore -= requiredOre
  }

  collectOutput() {
    this.resources.ore++
  }
}

class ClayRobot extends Robot {
  constructor(requiredOre, resources) {
    super(resources)
    this.requiredOre = requiredOre
    this.resources.ore -= requiredOre
  }

  collectOutput() {
    this.resources.clay++
  }
}

class ObsidianRobot extends Robot {
  constructor(requiredOre, requiredClay, resources) {
    super(resources)
    this.requiredOre = requiredOre
    this.requiredClay = requiredClay
    this.resources.ore -= requiredOre
    this.resources.clay -= requiredClay
  }

  collectOutput() {
    this.resources.obsidian++
  }
}

class GeodeRobot extends Robot {
  constructor(requiredOre, requiredObsidian, resources) {
    super(resources)
    this.requiredOre = requiredOre
    this.requiredObsidian = requiredObsidian
    this.resources.ore -= requiredOre
    this.resources.obsidian -= requiredObsidian
  }

  collectOutput() {
    this.resources.geode++
  }
}

const blueprint1 = [
  { ore: 4 },
  { ore: 2 },
  { ore: 3, clay: 14 },
  { ore: 2, obsidian: 7 },
]
const blueprint2 = [
  { ore: 2 },
  { ore: 3 },
  { ore: 3, clay: 8 },
  { ore: 3, obsidian: 12 },
]
const blueprints = [blueprint1, blueprint2]

const checkBlueprint = (blueprint, blueprintIndex) => {
  const resources = {
    ore: 0,
    clay: 0,
    obsidian: 0,
    geode: 0,
  }
  let robots = [new OreRobot(0, resources)]
  let wipRobots = []
  for (let minutes = 1; minutes <= 24; minutes++) {
    console.log('minute', minutes)

    const readyRobots = wipRobots
      .filter(({ ready }) => ready === minutes)
      .map(({ robot }) => robot)
    if (readyRobots.length) {
      robots = robots.concat(readyRobots)
      wipRobots = wipRobots.filter(({ ready }) => ready !== minutes)
    }

    const reversedBlueprints = blueprint.slice().reverse()
    const robotToCreateIndex = reversedBlueprints.findIndex((resourcesNeeded) =>
      Object.entries(resourcesNeeded).every(
        ([resourceName, quantity]) => resources[resourceName] >= quantity,
      ),
    )
    if (robotToCreateIndex > -1) {
      const robotToCreate = reversedBlueprints[robotToCreateIndex]
      let robot
      switch (robotToCreateIndex) {
        case 0:
          robot = new GeodeRobot(
            robotToCreate.ore,
            robotToCreate.obsidian,
            resources,
          )
          break
        case 1:
          robot = new ObsidianRobot(
            robotToCreate.ore,
            robotToCreate.clay,
            resources,
          )
          break
        case 2:
          robot = new ClayRobot(robotToCreate.ore, resources)
          break
        case 3:
          robot = new OreRobot(robotToCreate.ore, resources)
          break
      }
      wipRobots.push({
        ready: minutes + 1,
        robot,
      })
    }

    robots.forEach((robot) => robot.collectOutput())

    console.table(resources)
    console.log(
      'robots',
      robots.map((robot) => robot.constructor.name),
    )
    console.log(
      'wipRobots',
      wipRobots.map(({ robot }) => robot.constructor.name),
    )
  }

  console.log('result blueprint', blueprintIndex + 1, resources.geode)
}

blueprints.slice(0, 1).forEach(checkBlueprint)
