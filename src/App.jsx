import { useState } from 'react'
import './App.css'
import Board from './components/Board'
import HistoryList from './components/HistoryList'
import GameOverModal from './components/GameOverModal'
import { INITIAL_BOARD } from './constants/gameConfig'
import { calculateWinner, checkIsDraw } from './utils/gameLogic'

/**
 * 主应用组件
 * 负责游戏状态管理和组件协调
 * @component
 */
function App() {
  const [squares, setSquares] = useState(INITIAL_BOARD)
  const [xIsNext, setXIsNext] = useState(true)
  const [history, setHistory] = useState([INITIAL_BOARD])
  const [currentStep, setCurrentStep] = useState(0)

  function handlePlay(nextSquares) {
    // 先更新棋盘和玩家
    setSquares(nextSquares)
    setXIsNext(!xIsNext)

    // 同时更新 history 和 currentStep
    setHistory(prev => {
      // 如果用户回溯到了历史步骤，只保留到 currentStep 为止的记录
      // 然后追加新的棋盘状态
      const newHistory = [...prev.slice(0, currentStep + 1), nextSquares.slice()]
      // 更新 currentStep 为新的最后一步
      setCurrentStep(newHistory.length - 1)
      return newHistory
    })
  }

  /**
   * 重新开始游戏
   * 重置所有游戏状态到初始值
   */
  function handleRestart() {
    setSquares(INITIAL_BOARD)
    setXIsNext(true)
    setHistory([INITIAL_BOARD])
    setCurrentStep(0)
  }

  /**
   * 跳转到指定历史步骤
   * @param {number} stepIndex - 目标步骤索引
   */
  function jumpToStep(stepIndex) {
    const stepSquares = history[stepIndex]
    setSquares(stepSquares.slice())
    setCurrentStep(stepIndex)
    setXIsNext(stepIndex % 2 === 0)
    setHistory(prev => prev.slice(0, stepIndex + 1))
  }

  const winner = calculateWinner(squares)
  const isDraw = !winner && checkIsDraw(squares)

  return (
    <div className="game-container">
      <h1>井字棋</h1>
      <div className="game-layout">
        <Board xIsNext={xIsNext} squares={squares} onPlay={handlePlay} />
        <HistoryList history={history} currentStep={currentStep} onJumpToStep={jumpToStep} />
      </div>
      <GameOverModal winner={winner} isDraw={isDraw} onRestart={handleRestart} />
    </div>
  )
}

export default App
