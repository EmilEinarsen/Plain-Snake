import { DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE, WINDOWS_EMOJI_FALLBACK_FONT } from "./constants.js"

export const getFontString = ({
	fontWeight = '',
	fontSize = DEFAULT_FONT_SIZE,
	fontFamily = DEFAULT_FONT_FAMILY
} = {}) => `${fontWeight} ${fontSize} ${fontFamily}, ${WINDOWS_EMOJI_FALLBACK_FONT}`.trim()

export const isCollision = (v1, v2) => v1.x === v2.x && v1.y === v2.y

export const hslStr2Obj = str => {
	const [h,s,l] = str.split('')
		.filter((l) => l.match(/[^hsl()$% ]/g))
		.join('')
		.split(',')
		.map((n) => +n)
	return {h,s,l}
}

export const hsl2rgb = (...args) => {
	let src
	if(args.length === 1 && typeof args[0] === 'string') {
		src = hslStr2Obj(args[0])
		src.s /= 100
		src.l /= 100
	}
	if(args.length === 1 && typeof args[0] === 'object') src = args[0]
	if(args.length === 3) src = { h: +args[0], s: +args[1], l: +args[2] }
	const result = { r: 0, g: 0, b: 0 }
	if (src.h == undefined) return result

	const chroma = (1 - Math.abs(2 * src.l - 1)) * src.s
	let huePrime = src.h / 60
	const secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1))

	huePrime = ~~huePrime

	if (huePrime === 0) {
		result.r = chroma
		result.g = secondComponent
		result.b = 0
	} else if (huePrime === 1) {
		result.r = secondComponent
		result.g = chroma
		result.b = 0
	} else if (huePrime === 2) {
		result.r = 0
		result.g = chroma
		result.b = secondComponent
	} else if (huePrime === 3) {
		result.r = 0
		result.g = secondComponent
		result.b = chroma
	} else if (huePrime === 4) {
		result.r = secondComponent
		result.g = 0
		result.b = chroma
	} else if (huePrime === 5) {
		result.r = chroma
		result.g = 0
		result.b = secondComponent
	}

	const lightnessAdjustment = src.l - chroma / 2
	result.r += lightnessAdjustment
	result.g += lightnessAdjustment
	result.b += lightnessAdjustment

	return {
		r: Math.round(result.r * 255),
		g: Math.round(result.g * 255),
		b: Math.round(result.b * 255)
	}
}
