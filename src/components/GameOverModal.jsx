/**
 * 游戏结束弹窗组件
 * 显示游戏结果并提供重新开始按钮
 * @component
 * @param {Object} props - 组件属性
 * @param {string|null} props.winner - 获胜玩家 ('X', 'O' 或 null)
 * @param {boolean} props.isDraw - 是否平局
 * @param {Function} props.onRestart - 重新开始回调函数
 */
function GameOverModal({ winner, isDraw, onRestart }) {
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
