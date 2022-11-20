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
    this.p5.createCanvas(this.board.width, this.board.height)
    this.ship = new Ship(this.p5, 20, 20, 20, 'lightblue', Direction.LEFT, {
      left: this.p5.LEFT_ARROW,
      right: this.p5.RIGHT_ARROW,
      down: this.p5.DOWN_ARROW,
      up: this.p5.UP_ARROW,
    })
    this.alien = new Ship(this.p5, this.p5.width / 2, this.p5.height / 2, 20, 'red', Direction.UP, {
      left: KC.A,
      right: KC.D,
      down: KC.S,
      up: KC.W,
    })
  }

  draw = () => {
    const hasCollided = this.checkCollision()
    this.p5.background(hasCollided ? 'yellow' : 220)

    this.ship.draw()
    this.alien.draw()

    if (hasCollided) {
      this.p5.noLoop()
      return
    }

    this.ship.update(this.board)
    this.alien.update(this.board)
  }

  checkCollision() {
    const dx = this.ship.x - this.alien.x
    const dy = this.ship.y - this.alien.y
    const distance = Math.sqrt(dx ** 2 + dy ** 2)
    return distance <= this.ship.r * 2 || distance <= this.alien.r * 2
  }
}
