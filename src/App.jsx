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

  function handleClick(index) {
    const nextSquares = squares.slice()
    nextSquares[index] = 'X'
    setSquares(nextSquares)
  }

  return (
    <div className="game-container">
      <h1>井字棋</h1>
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
