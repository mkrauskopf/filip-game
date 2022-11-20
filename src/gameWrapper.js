'use strict'

import { Game } from './game.js'

class GameWrapper {
  constructor(gameElement) {
    new p5((p5) => {
      new Game(p5, 400, 300)
    }, gameElement)
  }
}

new GameWrapper('game')
