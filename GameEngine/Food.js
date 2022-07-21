import { ParticlePool } from "./ParticlePool.js"
import { Snake } from "./Snake.js"
import { CELL_COUNT, CELL_SIZE } from "./utils/constants.js"
import { isCollision } from "./utils/utils.js"
import { Vec } from "./utils/Vec.js"

export const Food = new class {
	cell = this.getEmptyCell()

	init(engine) {
		this.engine = engine
	}

	eaten() {
		ParticlePool.create(Vec.clone(this.cell).mult(CELL_SIZE))
		this.spawn()
	}

	spawn() {
		this.engine.currentHue = `hsl(${~~(Math.random() * 360)}, 100%, 50%)`
    this.cell = this.getEmptyCell()
	}

	getEmptyCell() {
		const cell = new Vec(
			~~(Math.random() * CELL_COUNT),
			~~(Math.random() * CELL_COUNT)
		)
		return [...Snake.history, Snake.cell].every(entry => !isCollision(cell, entry)) && cell || this.getEmptyCell()
	}

  draw() {
		const ctx = this.engine.ctx
    ctx.save()
		ctx.globalCompositeOperation = 'lighter'
    ctx.shadowBlur = 20
    ctx.shadowColor = this.engine.currentHue
    ctx.fillStyle = this.engine.currentHue
    ctx.fillRect(this.cell.x * CELL_SIZE, this.cell.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
		ctx.restore()
  }
}()