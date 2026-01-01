import { useState } from 'react'
import Square from './Square'
import { calculateWinner, checkIsDraw } from '../utils/gameLogic'

/**
 * 棋盘组件
 * 负责渲染棋盘和处理格子点击事件
 * @component
 * @param {Object} props - 组件属性
 * @param {boolean} props.xIsNext - 是否 X 玩家回合
 * @param {Array<string|null>} props.squares - 棋盘数组
 * @param {Function} props.onPlay - 落子回调函数
 */
function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares)
  const isDraw = !winner && checkIsDraw(squares)

  /**
   * 处理格子点击事件
   * @param {number} index - 被点击格子的索引
   */
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
