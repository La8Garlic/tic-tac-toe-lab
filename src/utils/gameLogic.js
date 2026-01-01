/**
 * 游戏逻辑工具函数
 * @module utils/gameLogic
 */

import { WINNING_COMBINATIONS, PLAYER_X, PLAYER_O, BOARD_SIZE } from '../constants/gameConfig'

/**
 * 计算游戏是否有获胜者
 * @param {Array<string|null>} squares - 棋盘数组
 * @returns {string|null} 获胜玩家 ('X' 或 'O')，如果没有获胜者则返回 null
 *
 * @example
 * calculateWinner(['X', 'X', 'X', null, null, null, null, null, null])
 * // => 'X'
 *
 * @example
 * calculateWinner(['O', 'X', 'O', 'X', 'O', 'X', 'X', 'O', null])
 * // => null
 */
export function calculateWinner(squares) {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

/**
 * 检查游戏是否为平局
 * @param {Array<string|null>} squares - 棋盘数组
 * @returns {boolean} 如果棋盘已满且没有获胜者则为 true
 *
 * @example
 * checkIsDraw(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'])
 * // => true
 */
export function checkIsDraw(squares) {
  return squares.every(cell => cell !== null)
}

/**
 * 根据步骤索引获取当前玩家
 * @param {number} stepIndex - 步骤索引（从 0 开始）
 * @returns {string} 当前玩家 ('X' 或 'O')
 *
 * @example
 * getPlayerForStep(0)  // => 'X' (第 0 步是 X 先手)
 * getPlayerForStep(1)  // => 'O' (第 1 步是 O)
 * getPlayerForStep(2)  // => 'X' (第 2 步是 X)
 */
export function getPlayerForStep(stepIndex) {
  return stepIndex % 2 === 0 ? PLAYER_X : PLAYER_O
}

/**
 * 获取下一个玩家
 * @param {string} currentPlayer - 当前玩家 ('X' 或 'O')
 * @returns {string} 下一个玩家 ('X' 或 'O')
 *
 * @example
 * getNextPlayer('X')  // => 'O'
 * getNextPlayer('O')  // => 'X'
 */
export function getNextPlayer(currentPlayer) {
  return currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X
}

/**
 * 创建初始棋盘
 * @returns {Array<string|null>} 空棋盘数组
 */
export function createInitialBoard() {
  return Array(BOARD_SIZE).fill(null)
}
