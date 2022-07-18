import { PARTICLE_POOL_SIZE } from "./utils/constants.js"
import { Particle } from "./Particle.js"

export const ParticlePool = new class {
	init(engine) {
		this.engine = engine
		this.particles = Array.from({ length: PARTICLE_POOL_SIZE }).map(() => new Particle())
	}

	create(pos) {
		this.particles.forEach(p =>
			p.init({
				pos: pos,
				color: this.engine.currentHue,
			})
		)
	}

	update() {
		this.particles.forEach(p => p.update())
	}

	draw() {
		this.particles.forEach(p => p.draw(this.engine.ctx))
	}
}()
