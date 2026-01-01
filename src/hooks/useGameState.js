import { useState } from 'react'
import { INITIAL_BOARD } from '../constants/gameConfig'
import { calculateWinner, checkIsDraw } from '../utils/gameLogic'

/**
 * 游戏状态管理 Hook
 * 管理棋盘状态、当前玩家、落子逻辑和游戏结果
 *
 * @returns {Object} 游戏状态和操作函数
 * @returns {Array<string|null>} returns.squares - 当前棋盘数组
 * @returns {boolean} returns.xIsNext - 是否 X 玩家回合
 * @returns {string|null} returns.winner - 获胜玩家 ('X', 'O' 或 null)
 * @returns {boolean} returns.isDraw - 是否平局
 * @returns {Function} returns.handlePlay - 落子回调函数
 * @returns {Function} returns.setBoardState - 直接设置棋盘状态（用于时间旅行）
 * @returns {Function} returns.handleRestart - 重新开始回调函数
 *
 * @example
 * const { squares, xIsNext, winner, isDraw, handlePlay, setBoardState, handleRestart } = useGameState()
 */
function useGameState() {
  const [squares, setSquares] = useState(INITIAL_BOARD)
  const [xIsNext, setXIsNext] = useState(true)

  /**
   * 处理落子操作
   * @param {Array<string|null>} nextSquares - 落子后的棋盘状态
   */
  function handlePlay(nextSquares) {
    setSquares(nextSquares)
    setXIsNext(prev => !prev)
  }

  /**
   * 直接设置棋盘状态和玩家
   * 用于时间旅行功能，恢复到历史步骤的状态
   *
   * @param {Array<string|null>} newSquares - 新的棋盘状态
   * @param {number} stepIndex - 步骤索引，用于确定当前玩家
   */
  function setBoardState(newSquares, stepIndex) {
    setSquares(newSquares)
    setXIsNext(stepIndex % 2 === 0)
  }

  /**
   * 重新开始游戏
   * 重置所有游戏状态到初始值
   */
  function handleRestart() {
    setSquares(INITIAL_BOARD)
    setXIsNext(true)
  }

  // 计算游戏结果
  const winner = calculateWinner(squares)
  const isDraw = !winner && checkIsDraw(squares)

  return {
    squares,
    xIsNext,
    winner,
    isDraw,
    handlePlay,
    setBoardState,
    handleRestart,
  }
}

export default useGameState
