import { getFontString } from "./utils.js"

export const WINDOWS_EMOJI_FALLBACK_FONT = 'Segoe UI Emoji'
export const DEFAULT_FONT_FAMILY = 'Poppins, sans-serif'
export const DEFAULT_FONT_SIZE = '1rem'

export const GAME_OVER_TEXT_COLOR = '#4cffd7'
export const GAME_OVER_TITLE_FONT = getFontString({ fontWeight: 'bold', fontSize: '2rem' })
export const GAME_OVER_SUBTITLE_FONT = getFontString()

export const GRID_LINE_COLOR = '#232332'

export const FPS = 120
export const SNAKE_MOVE_DELAY = 10
export const BOARD_SIZE = 400
export const CELL_COUNT = 20
export const CELL_SIZE  = BOARD_SIZE / CELL_COUNT
export const PARTICLE_POOL_SIZE = 20