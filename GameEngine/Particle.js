import { CELL_SIZE } from "./utils/constants.js"
import { hsl2rgb } from "./utils/utils.js"
import { Vec } from "./utils/Vec.js"

export class Particle {
	gravity = -0.2

	init({ pos, color }) {
		if(0 < this.size) return
		this.pos = new Vec(pos.x, pos.y)
		this.color = hsl2rgb(color)
		this.vel = new Vec(Math.random() * 6 - 3, Math.random() * 6 - 3)
		this.size = Math.abs(CELL_SIZE / 2)
	}

	draw(ctx) {
		if(!this.size || this.size < 0) return
		ctx.save()
		ctx.globalCompositeOperation = 'lighter'
		ctx.shadowColor = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b}, ${1})`
		ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b}, ${1})`
		ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size)
		ctx.restore()
	}

	update() {
		if(!this.size || this.size < 0) return
		this.size -= 0.3
		this.pos.add(this.vel)
		this.vel.y -= this.gravity
	}

	reset() {
		this.pos = undefined
		this.color = undefined
		this.vel = undefined
		this.size = undefined
	}
}
