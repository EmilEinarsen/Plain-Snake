import { BOARD_SIZE, GRID_LINE_COLOR, CELL_COUNT, GAME_OVER_TEXT_COLOR, GAME_OVER_TITLE_FONT, GAME_OVER_SUBTITLE_FONT, FPS } from "./utils/constants.js"
import { Food } from "./Food.js"
import { ParticlePool } from "./ParticlePool.js"
import { Snake } from "./Snake.js"
import { KEY } from "./utils/utils.js"

export const GameEngine = new class {
	canvas = document.querySelector('canvas');

	width = this.canvas.width = BOARD_SIZE
	height = this.canvas.height = BOARD_SIZE
	ctx = (() => {
		const ctx = this.canvas.getContext('2d')
		ctx.imageSmoothingEnabled = false;
		return ctx
	})() 

	isGameOver = false
  currentHue = undefined
  maxScore = window.localStorage.getItem('maxScore') || undefined
  requestID
	
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

	drawGrid() {
		this.ctx.lineWidth = 1.1;
		this.ctx.strokeStyle = GRID_LINE_COLOR;
		this.ctx.shadowBlur = 0;
		for (let i = 1; i < CELL_COUNT; i++) {
			const f = (this.width / CELL_COUNT) * i;
			this.ctx.beginPath();
			this.ctx.moveTo(f, 0);
			this.ctx.lineTo(f, this.height);
			this.ctx.stroke();
			this.ctx.beginPath();
			this.ctx.moveTo(0, f);
			this.ctx.lineTo(this.width, f);
			this.ctx.stroke();
			this.ctx.closePath();
		}
	}

	game() {
		Snake.update();
		ParticlePool.update()

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
		const tick = () => {
			this.requestID = setTimeout(() => {
				requestAnimationFrame(tick);
				this.ctx.clearRect(0, 0, this.width, this.height);
				if (!this.isGameOver) this.game() 
				else this.gameOver()
			}, 1000 / FPS)
		}
		tick()
	}
	
	reset = () => {
		this.score = '00';
		Snake.reset()
		Food.spawn();
		KEY.resetState();
		this.isGameOver = false;
		clearTimeout(this.requestID);
		KEY.listen();
		this.gameLoop();
	}

	sendScoreChange
	onScoreChange(fn) {
		this.sendScoreChange = fn
	}
}()
