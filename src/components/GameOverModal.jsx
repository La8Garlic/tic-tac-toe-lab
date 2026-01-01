/**
 * 游戏结束弹窗组件
 * 纯展示组件，负责渲染游戏结束弹窗
 * @component
 * @param {Object} props - 组件属性
 * @param {boolean} props.isVisible - 是否显示弹窗
 * @param {string|null} props.winner - 获胜玩家 ('X', 'O' 或 null)
 * @param {boolean} props.isDraw - 是否平局
 * @param {Function} props.onRestart - 重新开始回调函数
 */
function GameOverModal({ isVisible, winner, isDraw, onRestart }) {
  if (!isVisible) {
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

