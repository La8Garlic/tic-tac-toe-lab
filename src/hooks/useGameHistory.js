import { useState } from 'react'
import { INITIAL_BOARD } from '../constants/gameConfig'
import { getPlayerForStep } from '../utils/gameLogic'

/**
 * 游戏历史记录管理 Hook
 * 管理历史记录数组、当前步骤索引和时间旅行功能
 *
 * @returns {Object} 历史记录状态和操作函数
 * @returns {Array<Array<string|null>>} returns.history - 历史记录数组，每个元素是一个棋盘状态
 * @returns {number} returns.currentStep - 当前步骤索引
 * @returns {Function} returns.addHistory - 添加历史记录回调函数
 * @returns {Function} returns.jumpToStep - 跳转到指定步骤回调函数
 * @returns {Function} returns.resetHistory - 重置历史记录回调函数
 *
 * @example
 * const { history, currentStep, addHistory, jumpToStep, resetHistory } = useGameHistory()
 */
function useGameHistory() {
  const [history, setHistory] = useState([INITIAL_BOARD])
  const [currentStep, setCurrentStep] = useState(0)

  /**
   * 添加新的历史记录
   * 如果用户回溯到了历史步骤，会截断该步骤之后的所有记录
   *
   * @param {Array<string|null>} squares - 要添加的棋盘状态
   */
  function addHistory(squares) {
    setHistory(prev => {
      // 只保留到 currentStep 为止的记录，然后追加新的棋盘状态
      const newHistory = [...prev.slice(0, currentStep + 1), squares.slice()]
      // 更新 currentStep 为新的最后一步
      setCurrentStep(newHistory.length - 1)
      return newHistory
    })
  }

  /**
   * 跳转到指定历史步骤（时间旅行）
   * 会截断该步骤之后的所有历史记录
   *
   * @param {number} stepIndex - 目标步骤索引
   */
  function jumpToStep(stepIndex) {
    setCurrentStep(stepIndex)
    setHistory(prev => prev.slice(0, stepIndex + 1))
  }

  /**
   * 重置历史记录到初始状态
   */
  function resetHistory() {
    setHistory([INITIAL_BOARD])
    setCurrentStep(0)
  }

  return {
    history,
    currentStep,
    addHistory,
    jumpToStep,
    resetHistory,
  }
}

export default useGameHistory
