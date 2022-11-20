import { Direction, KeyCodes as KC } from './tools.js'
import { Ship } from './ship.js'

export class Game {
  constructor(p5, width, height) {
    this.board = { width, height }
    this.p5 = p5
    p5.setup = this.setup
    p5.draw = this.draw
  }

  setup = () => {
    const { p5, board } = this
    p5.createCanvas(board.width, board.height)
    this.ship = new Ship(p5, 20, 20, 20, 'lightblue', Direction.LEFT, {
      left: p5.LEFT_ARROW,
      right: p5.RIGHT_ARROW,
      down: p5.DOWN_ARROW,
      up: p5.UP_ARROW,
    })
    this.alien = new Ship(p5, p5.width / 2, p5.height / 2, 20, 'red', Direction.UP, {
      left: KC.A,
      right: KC.D,
      down: KC.S,
      up: KC.W,
    })
  }

  draw = () => {
    const { p5, ship, alien, board } = this
    const hasCollided = this.checkCollision()
    p5.background(hasCollided ? 'yellow' : 220)

    ship.draw()
    alien.draw()

    if (hasCollided) {
      p5.noLoop()
      return
    }

    ship.update(board)
    alien.update(board)
  }

  checkCollision() {
    const { ship, alien } = this
    const dx = ship.x - alien.x
    const dy = ship.y - alien.y
    const distance = Math.sqrt(dx ** 2 + dy ** 2)
    return distance <= ship.r * 2 || distance <= alien.r * 2
  }
}
