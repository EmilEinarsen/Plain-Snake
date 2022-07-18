import { CELL_COUNT, CELL_SIZE, SNAKE_MOVE_DELAY } from "./utils/constants.js";
import { Food } from "./Food.js";
import { Vec } from "./utils/Vec.js";
import { isCollision, KEY } from "./utils/utils.js";

export const Snake = new class {
	constructor() {
		this.reset()
	}

	reset() {
		this.cell = new Vec(CELL_COUNT / 2, CELL_COUNT / 2);
		this.dir = new Vec(0, 0);
		this.color = 'white';
		this.total = 1
		this.history = []
		this.delay = 5
	}

	init(engine) {
		this.engine = engine
	}

	drawEyes() {
		this.engine.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
		const EYE = CELL_SIZE/8
    this.engine.ctx.fillRect(this.cell.x * CELL_SIZE + CELL_SIZE/2 - EYE * 2, this.cell.y * CELL_SIZE + CELL_SIZE/2 - EYE / 2, EYE, EYE);
    this.engine.ctx.fillRect(this.cell.x * CELL_SIZE + CELL_SIZE/2 + EYE, this.cell.y * CELL_SIZE + CELL_SIZE/2 - EYE /2, EYE, EYE);
	}

  draw() {
    this.engine.ctx.save()
		this.engine.ctx.fillStyle = this.color;
    this.engine.ctx.shadowBlur = 20;
    this.engine.ctx.shadowColor = 'rgba(255, 255, 255, .3)';
    this.engine.ctx.fillRect(this.cell.x * CELL_SIZE, this.cell.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
		this.drawEyes()
    this.engine.ctx.shadowBlur = 0;
		this.engine.ctx.lineWidth = 1;
		this.engine.ctx.fillStyle = 'rgba(225, 225, 225, 1)';
    if (1 < this.total)
      this.history.forEach(entry =>
        this.engine.ctx.fillRect(entry.x * CELL_SIZE, entry.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
      )
		this.engine.ctx.restore()
  }

  walls() {
    if (this.cell.x + 1 > CELL_COUNT) this.cell.x = 0;
    if (this.cell.y + 1 > CELL_COUNT) this.cell.y = 0;
    if (this.cell.y < 0) this.cell.y = CELL_COUNT-1;
    if (this.cell.x < 0) this.cell.x = CELL_COUNT-1;
  }

  controlls() {
    if (KEY.ArrowUp) this.dir = new Vec(0, -1);
    if (KEY.ArrowDown) this.dir = new Vec(0, 1);
    if (KEY.ArrowLeft) this.dir = new Vec(-1, 0);
    if (KEY.ArrowRight) this.dir = new Vec(1, 0);
  }

  selfCollision() {
    3 < this.total && this.history.forEach(entry => {
			this.engine.isGameOver ||= isCollision(this.cell, entry)
		})
  }

  update() {
    this.walls();
    this.controlls();
    if (!this.delay--) {
			this.history[this.total - 1] = Vec.clone(this.cell)
      for (let i = 0; i < this.total - 1; i++) {
        this.history[i] = this.history[i + 1];
      }
      this.cell.add(this.dir);
			
      if (isCollision(this.cell, Food.cell)) {
				Food.eaten()
				this.total++
				this.engine.score++;
			};
			
      this.delay = SNAKE_MOVE_DELAY;
      this.selfCollision()
    }
  }
}()