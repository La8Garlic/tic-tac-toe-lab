import { useState } from 'react'
import './App.css'

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
      <div className="status">当前玩家: {xIsNext ? 'X' : 'O'}</div>
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
