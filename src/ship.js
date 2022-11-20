import { Mood } from './tools.js'
import { KeyCodes as KC, Direction } from './tools.js'

const speed = 1

export class Ship {
  constructor(p5, x, y, d, color, mood, initialDirection, keys) {
    this.p5 = p5
    this.x = x
    this.y = y
    this.r = d / 2
    this.color = color
    this.mood = mood
    this.direction = initialDirection
    this.keys = keys
  }

  draw() {
    const { p5, x, y, r } = this
    p5.fill(this.color)
    p5.circle(x, y, r * 2)

    // eyes
    p5.circle(x - r / 3, y - r / 3, r / 2)
    p5.circle(x + r / 3, y - r / 3, r / 2)

    // mouth
    if (this.mood === Mood.GOOD) {
      p5.arc(x, y, r, r, 1, p5.PI - 1)
    } else {
      p5.arc(x, y + r * 0.9, r, r, p5.PI + 1, -1)
    }
  }

  update(board) {
    this.updateDirection()
    this.maybeBounceFrom(board)
    this.updatePosition()
  }

  updateDirection() {
    const { p5, keys } = this
    if (p5.keyIsDown(keys.left)) {
      this.direction = Direction.LEFT
    } else if (p5.keyIsDown(keys.right)) {
      this.direction = Direction.RIGHT
    } else if (p5.keyIsDown(keys.down)) {
      this.direction = Direction.DOWN
    } else if (p5.keyIsDown(keys.up)) {
      this.direction = Direction.UP
    } else if (p5.keyIsDown(KC.SPACE)) {
      this.direction = Direction.NONE
    }
  }

  maybeBounceFrom(board) {
    if (this.x <= this.r) {
      this.direction = Direction.RIGHT
    } else if (this.x >= board.width - this.r) {
      this.direction = Direction.LEFT
    }
    if (this.y <= this.r) {
      this.direction = Direction.DOWN
    } else if (this.y >= board.height - this.r) {
      this.direction = Direction.UP
    }
  }

  updatePosition() {
    switch (this.direction) {
      case Direction.RIGHT:
        this.x += speed
        break
      case Direction.LEFT:
        this.x -= speed
        break
      case Direction.UP:
        this.y -= speed
        break
      case Direction.DOWN:
        this.y += speed
        break
    }
  }
}
