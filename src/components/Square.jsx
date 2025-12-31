function Square({ value, onSquareClick }) {
  return (
    <div className="cell" onClick={onSquareClick}>
      {value}
    </div>
  )
}

export default Square
