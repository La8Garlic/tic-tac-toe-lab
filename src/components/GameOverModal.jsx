function GameOverModal({ winner, isDraw, onRestart }) {
  // 当没有获胜者也不是平手时，不显示弹窗
  if (!winner && !isDraw) {
    return null
  }

  return (
    <div className="modal-overlay" onClick={onRestart}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>游戏结束!</h2>
        <p className="winner-text">
          {winner ? `玩家 ${winner} 获胜!` : '平手!'}
        </p>
        <button className="restart-btn" onClick={onRestart}>
          重新开始
        </button>
      </div>
    </div>
  )
}

export default GameOverModal
