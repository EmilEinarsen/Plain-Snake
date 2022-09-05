import { createEvent } from "./createEvent.js"

const getInput = key => Object.fromEntries([
	'ArrowUp',
	'ArrowDown',
	'ArrowLeft',
	'ArrowRight',
].map(k => [k, key === k]))

export const controllerEvent = createEvent('controller', getInput())

document.addEventListener('keydown', e => controllerEvent.dispatch(getInput(e.key)), false)
