import { BOARD_SIZE, GRID_LINE_COLOR, CELL_COUNT, GAME_OVER_TEXT_COLOR, GAME_OVER_TITLE_FONT, GAME_OVER_SUBTITLE_FONT, FPS, ENGINE_BLINK_ODDS, ENGINE_BLINK_DURATION, CANVAS_SIZE } from "./utils/constants.js"
import { Food } from "./Food.js"
import { ParticlePool } from "./ParticlePool.js"
import { Snake } from "./Snake.js"
import { KEY } from "./utils/utils.js"

export const GameEngine = new class {
	canvas = document.querySelector('canvas');

	width = BOARD_SIZE
	height = BOARD_SIZE
	offset = (CANVAS_SIZE - BOARD_SIZE) / 2
	ctx = (() => {
		const ctx = this.canvas.getContext('2d')
		this.canvas.width = this.canvas.style.width = CANVAS_SIZE
		this.canvas.height = this.canvas.style.height = CANVAS_SIZE
		ctx.imageSmoothingEnabled = false;
		return ctx
	})()

	isGameOver
  currentHue
  maxScore = window.localStorage.getItem('maxScore') || undefined
  requestID
	sendScoreChange

	onScoreChange(fn) {
		this.sendScoreChange = fn
	}
	
	#_score = 0
	get score() {
		return this.#_score
	}
	set score(n) {
		this.#_score = n
		this.sendScoreChange?.(this.#_score.toString().padStart(2, '0'))
	}
	
	constructor() {
		Snake.init(this)
		Food.init(this)
		ParticlePool.init(this)
		this.reset()
	}

	resetContext() {
		this.ctx.setTransform(1, 0, 0, 1, 0, 0);
		this.ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
	}

	drawGrid() {
		this.ctx.lineWidth = 1.1;
		this.ctx.strokeStyle = GRID_LINE_COLOR;
		this.ctx.shadowBlur = 0;
		this.ctx.beginPath();
		for (let i = 1; i < CELL_COUNT; i++) {
			const f = (this.width / CELL_COUNT) * i;
			this.ctx.moveTo(f, 0);
			this.ctx.lineTo(f, this.height);
			this.ctx.stroke();
			this.ctx.beginPath();
			this.ctx.moveTo(0, f);
			this.ctx.lineTo(this.width, f);
			this.ctx.stroke();
		}
		this.ctx.closePath();
	}

	drawBackground() {
		this.ctx.fillStyle = '#181825'
		this.ctx.fillRect(0, 0, this.width, this.height);

		this.ctx.save()
		this.ctx.beginPath();
		this.ctx.rect(0, 0, this.width, this.height);
		this.ctx.clip();

		// set shadowing
		this.ctx.shadowColor = 'white';
		this.ctx.shadowBlur = 50;
		this.ctx.shadowOffsetX = 2;
		this.ctx.shadowOffsetY = -2;
		this.ctx.strokeRect(0, 0, this.width, this.height);
		this.ctx.closePath();
		this.ctx.restore()
	}

	game(skipDraw = false) {
		Snake.update();
		ParticlePool.update()

		if(skipDraw) return
		this.drawGrid();
		Snake.draw();
		Food.draw();
		ParticlePool.draw()
	}
	
	gameOver() {
		clearTimeout(this.requestID)

		this.maxScore = !this.maxScore || this.maxScore < this.score ? this.score : this.maxScore
		window.localStorage.setItem('maxScore', this.maxScore);

		this.ctx.fillStyle = GAME_OVER_TEXT_COLOR;
		this.ctx.textAlign = 'center';
		this.ctx.textBaseline = 'bottom'

		this.ctx.font = GAME_OVER_TITLE_FONT;
		this.ctx.fillText('GAME OVER', this.width / 2, this.height / 2 - 40);

		this.ctx.font = GAME_OVER_SUBTITLE_FONT
		this.ctx.fillText(`SCORE   ${this.score}`, this.width / 2, this.height / 2 + 60);
		this.ctx.fillText(`MAXSCORE   ${this.maxScore}`, this.width / 2, this.height / 2 + 80);
	}

	gameLoop() {
		let prev
		const tick = now => {
			this.requestID = setTimeout(() => {
				requestAnimationFrame(tick);
				this.resetContext();
				this.ctx.translate(this.offset, this.offset)
				this.drawBackground();

				if(!prev && (Math.random() < ENGINE_BLINK_ODDS)) {
					prev = performance.now()
				} else if(ENGINE_BLINK_DURATION < (now - prev)) prev = undefined
				
				if (!this.isGameOver) this.game(!!prev) 
				else this.gameOver()
			}, 1000 / FPS)
		}
		tick()
	}
	
	reset = () => {
		this.score = '00';
		Snake.reset()
		Food.spawn();
		ParticlePool.reset()
		KEY.resetState();
		this.isGameOver = false;
		clearTimeout(this.requestID);
		KEY.listen();
		this.gameLoop();
	}
}()
