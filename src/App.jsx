import { useState } from 'react'
import './App.css'

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

function Square({ value, onSquareClick }) {
  return (
    <div className="cell" onClick={onSquareClick}>
      {value}
    </div>
  )
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentStep, setCurrentStep] = useState(0)

  const winner = calculateWinner(squares)

  function handleClick(index) {
    if (squares[index] || winner) {
      return
    }
    const nextSquares = squares.slice()
    nextSquares[index] = xIsNext ? 'X' : 'O'
    setSquares(nextSquares)
    setXIsNext(!xIsNext)

    // 记录历史
    setHistory(prev => {
      // 创建新历史记录：展开之前的记录 + 当前棋盘的深拷贝
      const newHistory = [...prev, nextSquares.slice()]
      console.log('=== 历史记录 ===')
      newHistory.forEach((step, i) => {
        console.log(`第 ${i} 步:`, step)
      })
      setCurrentStep(newHistory.length - 1)
      return newHistory
    })
  }

  function handleRestart() {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
    setHistory([Array(9).fill(null)])
    setCurrentStep(0)
    console.log('=== 游戏重新开始，历史记录已重置 ===')
  }

  // 获取某一步的玩家
  function getPlayerForStep(stepIndex) {
    // 偶数步是 X，奇数步是 O
    return stepIndex % 2 === 0 ? 'X' : 'O'
  }

  // 点击历史记录
  function jumpToStep(stepIndex) {
    const stepSquares = history[stepIndex]
    console.log(`跳转到第 ${stepIndex} 步，棋局状态:`, stepSquares)
    setSquares(stepSquares.slice())
    setCurrentStep(stepIndex)
    // 根据步骤判断当前玩家
    setXIsNext(stepIndex % 2 === 0)
  }

  return (
    <div className="game-container">
      <h1>井字棋</h1>
      <div className="status">
        {winner ? `Winner: ${winner}` : `当前玩家: ${xIsNext ? 'X' : 'O'}`}
      </div>
      <div className="game-layout">
        <div className="board">
          {squares.map((value, index) => (
            <Square
              key={index}
              value={value}
              onSquareClick={() => handleClick(index)}
            />
          ))}
        </div>
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
      {winner && (
        <div className="modal-overlay" onClick={handleRestart}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>🎉 游戏结束!</h2>
            <p className="winner-text">玩家 {winner} 获胜!</p>
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
