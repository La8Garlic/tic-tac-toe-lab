/**
 * 单个棋盘格子组件
 * @component
 * @param {Object} props - 组件属性
 * @param {string|null} props.value - 格子的值 ('X', 'O' 或 null)
 * @param {Function} props.onSquareClick - 格子点击回调函数
 */
function Square({ value, onSquareClick }) {
  return (
    <div className="cell" onClick={onSquareClick}>
      {value}
    </div>
  )
}

export default Square
