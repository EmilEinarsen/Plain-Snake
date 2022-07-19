import { getFontString } from "./utils.js"

export const WINDOWS_EMOJI_FALLBACK_FONT = 'Segoe UI Emoji'
export const DEFAULT_FONT_FAMILY = 'Poppins, sans-serif'
export const DEFAULT_FONT_SIZE = '1rem'

export const GAME_OVER_TEXT_COLOR = '#4cffd7'
export const GAME_OVER_TITLE_FONT = getFontString({ fontWeight: 'bold', fontSize: '2rem' })
export const GAME_OVER_SUBTITLE_FONT = getFontString()

/**
 * Controls the application framerate. 
 * Should be coordinated with `SNAKE_MOVE_DELAY`
 */
export const FPS = 120

/**
 * Size of the Canvas
 */
export const CANVAS_SIZE = 600
/**
 * Size of the Game view
 */
export const BOARD_SIZE = 400
/**
 * Impacts the number of cells in a row/column (R = C; RxC)
 * Should be an odd number so that the Snake is positioned in the middle
 */
export const CELL_COUNT = 21
if(!(CELL_COUNT % 2)) throw Error("Didn't you read the comment?")
/**
 * Size of each cell
 */
export const CELL_SIZE  = BOARD_SIZE / CELL_COUNT
/**
 * Number of particles used/recycled withing the ParticlePool
 */
export const PARTICLE_POOL_SIZE = 30
/**
 * Odds of the game-play not to render, causing blinking 
 */
export const ENGINE_BLINK_ODDS = .0025
/**
 * Duration of the game-play blinking in ms
 */
export const ENGINE_BLINK_DURATION = 10


export const GRID_LINE_COLOR = '#232332'

/* SNAKE */
/**
 * Impacts the speed at which the Snake moves in relationship to frames.
 * "move one cell every X"
 */
export const SNAKE_MOVE_DELAY = 10
export const SNAKE_HEAD_COLOR = 'rgba(225, 225, 225, 1)'
export const SNAKE_EYE_SIZE = CELL_SIZE/5
export const SNAKE_EYE_DISTANCE_FROM_SIDE = 2
export const SNAKE_EYE_DISTANCE_FROM_MIDDLE = 0
export const SNAKE_EYE_COLOR = 'rgba(0, 0, 0, 1)'
export const SNAKE_EYE_COLOR_BLINK = 'rgba(0, 0, 0, .2)'
export const SNAKE_EYE_BLINK_ODDS_SINGLE = .01
export const SNAKE_EYE_BLINK_ODDS_PAIR = .05
export const SNAKE_BODY_COLOR = 'rgba(225, 225, 225, 1)'
export const SNAKE_SHADOW_COLOR = 'rgba(255, 255, 255, .3)'
