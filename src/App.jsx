import './App.css'

function Square() {
  return <div className="cell" />
}

function App() {
  return (
    <div className="game-container">
      <h1>井字棋</h1>
      <div className="board">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <Square key={index} />
        ))}
      </div>
    </div>
  )
}

export default App
