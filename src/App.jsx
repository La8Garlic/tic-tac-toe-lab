import './App.css'

function App() {
  return (
    <div className="game-container">
      <h1>井字棋</h1>
      <div className="board">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <div key={index} className="cell" />
        ))}
      </div>
    </div>
  )
}

export default App
