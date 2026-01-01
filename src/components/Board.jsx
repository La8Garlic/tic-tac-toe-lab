import Square from './Square'

/**
 * 棋盘组件
 * 纯展示组件，负责渲染棋盘和转发格子点击事件
 * @component
 * @param {Object} props - 组件属性
 * @param {Array<string|null>} props.squares - 棋盘数组
 * @param {Function} props.onSquareClick - 格子点击回调函数
 */
function Board({ squares, onSquareClick }) {
  return (
    <div className="board">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          onSquareClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  )
}

export default Board
