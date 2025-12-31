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

  const winner = calculateWinner(squares)

  function handleClick(index) {
    if (squares[index]) {
      return
    }
    const nextSquares = squares.slice()
    nextSquares[index] = xIsNext ? 'X' : 'O'
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  return (
    <div className="game-container">
      <h1>井字棋</h1>
      <div className="status">
        {winner ? `Winner: ${winner}` : `当前玩家: ${xIsNext ? 'X' : 'O'}`}
      </div>
      <div className="board">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onSquareClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
