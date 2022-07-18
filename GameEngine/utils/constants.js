import { getFontString } from "./utils.js"

export const WINDOWS_EMOJI_FALLBACK_FONT = 'Segoe UI Emoji'
export const DEFAULT_FONT_FAMILY = 'Poppins, sans-serif'
export const DEFAULT_FONT_SIZE = '1rem'

export const GAME_OVER_TEXT_COLOR = '#4cffd7'
export const GAME_OVER_TITLE_FONT = getFontString({ fontWeight: 'bold', fontSize: '2rem' })
export const GAME_OVER_SUBTITLE_FONT = getFontString()

export const GRID_LINE_COLOR = '#232332'

/**
 * Controls the application framerate. 
 * Should be coordinated with `SNAKE_MOVE_DELAY`
 */
export const FPS = 120
/**
 * Impacts the speed at which the Snake moves in relationship to frames.
 * "move one cell every X"
 */
export const SNAKE_MOVE_DELAY = 10
/**
 * Size of the Canvas/Game view
 */
export const BOARD_SIZE = 400
/**
 * Impacts the number of cells in a row/column (R = C; RxC)
 * Should be an odd number so that the Snake is positioned in the middle
 */
export const CELL_COUNT = 21
/**
 * Size of each cell
 */
export const CELL_SIZE  = BOARD_SIZE / CELL_COUNT
/**
 * Number of particles used/recycled withing the ParticlePool
 */
export const PARTICLE_POOL_SIZE = 20