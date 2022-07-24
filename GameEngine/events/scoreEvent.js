import { createEvent } from "./createEvent.js";

const getDefault = () => ({
	current: 0,
	max: +window.localStorage.getItem('maxScore') || 0,
})

export const scoreEvent = createEvent('score', getDefault(), {
	onDispatch(n, p) {
		n.current = n.reset ? 0 : ++p.current
		n.max = p.max
		n.isHighScore = n.max < n.current
		n.isHighScore && (n.max = n.current)
		return true
	}
})

scoreEvent.subscribe(score => {
	score.isHighScore && window.localStorage.setItem('maxScore', score.max)
})
