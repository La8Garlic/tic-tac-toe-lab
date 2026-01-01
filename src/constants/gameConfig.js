/**
 * 游戏配置常量
 * @module constants/gameConfig
 */

/** 棋盘大小（格子总数） */
export const BOARD_SIZE = 9

/** 棋盘行数 */
export const BOARD_ROWS = 3

/** 棋盘列数 */
export const BOARD_COLS = 3

/** 玩家标识 - X 玩家 */
export const PLAYER_X = 'X'

/** 玩家标识 - O 玩家 */
export const PLAYER_O = 'O'

/** 获胜组合索引数组 */
export const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横向
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // 纵向
  [0, 4, 8], [2, 4, 6],             // 对角线
]

/** 初始空棋盘 */
export const INITIAL_BOARD = Array(BOARD_SIZE).fill(null)
