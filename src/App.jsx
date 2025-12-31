import { useState } from 'react'
import './App.css'
import Board from './components/Board'

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

  // 获取某一步的玩家
  function getPlayerForStep(stepIndex) {
    // 偶数步是 X，奇数步是 O
    return stepIndex % 2 === 0 ? 'X' : 'O'
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
        <div className="history-list">
          <h3>历史记录</h3>
          <ul>
            {history.slice(1).map((step, index) => {
              const actualIndex = index + 1
              const player = getPlayerForStep(actualIndex)
              return (
                <li
                  key={actualIndex}
                  className={actualIndex === currentStep ? 'active' : ''}
                  onClick={() => jumpToStep(actualIndex)}
                >
                  第 {actualIndex} 步: {player}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      {(winner || isDraw) && (
        <div className="modal-overlay" onClick={handleRestart}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>游戏结束!</h2>
            <p className="winner-text">
              {winner ? `玩家 ${winner} 获胜!` : '平手!'}
            </p>
            <button className="restart-btn" onClick={handleRestart}>
              重新开始
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
