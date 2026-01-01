import './App.css'
import Board from './components/Board'
import HistoryList from './components/HistoryList'
import GameOverModal from './components/GameOverModal'
import useGameState from './hooks/useGameState'
import useGameHistory from './hooks/useGameHistory'
import { PLAYER_X, PLAYER_O } from './constants/gameConfig'

/**
 * 主应用组件
 * 负责游戏状态管理和组件协调
 * 使用自定义 Hooks 管理游戏逻辑和历史记录
 * @component
 */
function App() {
  // 使用自定义 Hooks 管理游戏状态和历史记录
  const { squares, xIsNext, winner, isDraw, handlePlay: handlePlayState, setBoardState, handleRestart: handleRestartState } = useGameState()
  const { history, currentStep, addHistory, jumpToStep, resetHistory } = useGameHistory()

  /**
   * 处理格子点击
   * 验证落子合法性并更新游戏状态
   * @param {number} index - 被点击格子的索引
   */
  function handleSquareClick(index) {
    // 如果格子已有值或游戏已结束，则忽略
    if (squares[index] || winner || isDraw) {
      return
    }

    // 创建新的棋盘状态
    const nextSquares = squares.slice()
    nextSquares[index] = xIsNext ? PLAYER_X : PLAYER_O

    // 更新游戏状态并添加到历史记录
    handlePlayState(nextSquares)
    addHistory(nextSquares)
  }

  /**
   * 处理重新开始游戏
   * 重置游戏状态和历史记录
   */
  function handleRestart() {
    handleRestartState()
    resetHistory()
  }

  /**
   * 处理跳转到指定历史步骤（时间旅行）
   * 更新游戏状态到目标步骤的状态
   * @param {number} stepIndex - 目标步骤索引
   */
  function handleJumpToStep(stepIndex) {
    const stepSquares = history[stepIndex]
    jumpToStep(stepIndex)
    setBoardState(stepSquares.slice(), stepIndex)
  }

  // 计算状态显示文本
  const statusText = winner
    ? `Winner: ${winner}`
    : isDraw
      ? '平局!'
      : `当前玩家: ${xIsNext ? PLAYER_X : PLAYER_O}`

  return (
    <div className="game-container">
      <h1>井字棋</h1>
      <div className="status">{statusText}</div>
      <div className="game-layout">
        <Board squares={squares} onSquareClick={handleSquareClick} />
        <HistoryList history={history} currentStep={currentStep} onJumpToStep={handleJumpToStep} />
      </div>
      <GameOverModal winner={winner} isDraw={isDraw} onRestart={handleRestart} />
    </div>
  )
}

export default App
