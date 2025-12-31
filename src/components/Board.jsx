import { useState } from 'react'
import Square from './Square'

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
  // 棋盘已满且没有胜者，则为平手
  return squares.every(cell => cell !== null)
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares)
  const isDraw = !winner && checkDraw(squares)

  function handleClick(index) {
    if (squares[index] || winner || isDraw) {
      return
    }
    const nextSquares = squares.slice()
    nextSquares[index] = xIsNext ? 'X' : 'O'
    onPlay(nextSquares)
  }

  const status = winner
    ? `Winner: ${winner}`
    : `当前玩家: ${xIsNext ? 'X' : 'O'}`

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onSquareClick={() => handleClick(index)}
          />
        ))}
      </div>
    </>
  )
}

export default Board
