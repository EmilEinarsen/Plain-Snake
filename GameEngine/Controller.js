
export const Controller = new class {
	constructor() {
		document.addEventListener('keydown', e => {
			this.reset()
			this.input[e.key] = true
		}, false)
	}

	reset() {
		this.input = Object.fromEntries([
			'ArrowUp',
			'ArrowDown',
			'ArrowLeft',
			'ArrowRight',
		].map(k => [k, false]))
	}
}()
