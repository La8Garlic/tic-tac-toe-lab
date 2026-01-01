import './App.css'
import Board from './components/Board'
import HistoryList from './components/HistoryList'
import GameOverModal from './components/GameOverModal'
import useGameState from './hooks/useGameState'
import useGameHistory from './hooks/useGameHistory'

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
   * 处理落子操作
   * 更新游戏状态并添加到历史记录
   * @param {Array<string|null>} nextSquares - 落子后的棋盘状态
   */
  function handlePlay(nextSquares) {
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

  return (
    <div className="game-container">
      <h1>井字棋</h1>
      <div className="game-layout">
        <Board xIsNext={xIsNext} squares={squares} onPlay={handlePlay} />
        <HistoryList history={history} currentStep={currentStep} onJumpToStep={handleJumpToStep} />
      </div>
      <GameOverModal winner={winner} isDraw={isDraw} onRestart={handleRestart} />
    </div>
  )
}

export default App
