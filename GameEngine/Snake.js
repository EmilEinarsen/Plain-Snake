import { CELL_COUNT, CELL_SIZE, SNAKE_BODY_COLOR, SNAKE_EYE_BLINK_ODDS_PAIR, SNAKE_EYE_BLINK_ODDS_SINGLE, SNAKE_EYE_COLOR, SNAKE_EYE_COLOR_BLINK, SNAKE_EYE_DISTANCE_FROM_MIDDLE, SNAKE_EYE_DISTANCE_FROM_SIDE, SNAKE_EYE_SIZE, SNAKE_HEAD_COLOR, SNAKE_MOVE_DELAY, SNAKE_SHADOW_COLOR } from "./utils/constants.js";
import { Food } from "./Food.js";
import { Vec } from "./utils/Vec.js";
import { isCollision, KEY } from "./utils/utils.js";

export const Snake = new class {
	eyes = [
		{
			x: SNAKE_EYE_DISTANCE_FROM_SIDE,
			y: CELL_SIZE / 2 - SNAKE_EYE_SIZE * .5 + SNAKE_EYE_DISTANCE_FROM_MIDDLE,
			color: SNAKE_EYE_COLOR
		},
		{
			x: CELL_SIZE - SNAKE_EYE_SIZE - SNAKE_EYE_DISTANCE_FROM_SIDE,
			y: CELL_SIZE / 2 - SNAKE_EYE_SIZE * .5 + SNAKE_EYE_DISTANCE_FROM_MIDDLE,
			color: SNAKE_EYE_COLOR
		}
	]

	constructor() {
		this.reset()
	}

	reset() {
		this.cell = new Vec(Math.floor(CELL_COUNT / 2));
		this.dir = new Vec(0, 0);
		this.color = SNAKE_HEAD_COLOR;
		this.length = 1
		this.history = []
		this.delay = SNAKE_MOVE_DELAY
	}

	init(engine) {
		this.engine = engine
	}

	randomlyBlink() {
		const n = Math.random()
		let singleBlinkBase = SNAKE_EYE_BLINK_ODDS_PAIR
		this.eyes.forEach(eye => {
			const shouldBlink = (
				n <= SNAKE_EYE_BLINK_ODDS_PAIR || (
					singleBlinkBase <= n && 
					n < (singleBlinkBase += SNAKE_EYE_BLINK_ODDS_SINGLE)
				)
			)
			eye.color = shouldBlink ? SNAKE_EYE_COLOR_BLINK : SNAKE_EYE_COLOR
		})
	}

	drawEyes() {
		this.engine.ctx.save()
		this.eyes.forEach(eye => {
			this.engine.ctx.fillStyle = eye.color;
    	this.engine.ctx.fillRect(
				this.cell.x * CELL_SIZE + eye.x, 
				this.cell.y * CELL_SIZE + eye.y, 
				SNAKE_EYE_SIZE, 
				SNAKE_EYE_SIZE
			);
		})
		this.engine.ctx.restore()
	}

  draw() {
    this.engine.ctx.save()
		this.engine.ctx.fillStyle = this.color;
    this.engine.ctx.shadowBlur = 20;
    this.engine.ctx.shadowColor = SNAKE_SHADOW_COLOR;
    this.engine.ctx.fillRect(this.cell.x * CELL_SIZE, this.cell.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
		this.drawEyes()
    this.engine.ctx.shadowBlur = 0;
		this.engine.ctx.lineWidth = 1;
		this.engine.ctx.fillStyle = SNAKE_BODY_COLOR;
    if (1 < this.length)
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
    3 < this.length && this.history.forEach(entry => {
			this.engine.isGameOver ||= isCollision(this.cell, entry)
		})
  }

  update() {
    this.walls();
    this.controlls();
    if (!this.delay--) {
			this.history[this.length - 1] = Vec.clone(this.cell)
      for (let i = 0; i < this.length - 1; i++) {
        this.history[i] = this.history[i + 1];
      }
      this.cell.add(this.dir);
			
      if (isCollision(this.cell, Food.cell)) {
				Food.eaten()
				this.length++
				this.engine.score++;
			};
			
      this.delay = SNAKE_MOVE_DELAY;
      this.selfCollision()
			this.history.length && this.randomlyBlink()
    }
  }
}()