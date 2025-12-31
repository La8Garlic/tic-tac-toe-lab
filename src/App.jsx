import { useState } from 'react'
import './App.css'
import Board from './components/Board'
import HistoryList from './components/HistoryList'
import GameOverModal from './components/GameOverModal'

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentStep, setCurrentStep] = useState(0)

  function handlePlay(nextSquares) {
    setSquares(nextSquares)
    setXIsNext(!xIsNext)

    // 记录历史
    setHistory(prev => {
      // 创建新历史记录：展开之前的记录 + 当前棋盘的深拷贝
      const newHistory = [...prev, nextSquares.slice()]
      setCurrentStep(newHistory.length - 1)
      return newHistory
    })
  }

  function handleRestart() {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
    setHistory([Array(9).fill(null)])
    setCurrentStep(0)
  }

  // 点击历史记录
  function jumpToStep(stepIndex) {
    const stepSquares = history[stepIndex]
    setSquares(stepSquares.slice())
    setCurrentStep(stepIndex)
    // 根据步骤判断当前玩家
    setXIsNext(stepIndex % 2 === 0)
  }

  // 计算游戏是否结束
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横向
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // 纵向
      [0, 4, 8], [2, 4, 6],             // 对角线
    ]
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  function checkDraw(squares) {
    return squares.every(cell => cell !== null)
  }

  const winner = calculateWinner(squares)
  const isDraw = !winner && checkDraw(squares)

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
