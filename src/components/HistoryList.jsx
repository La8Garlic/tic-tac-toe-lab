function HistoryList({ history, currentStep, onJumpToStep }) {
  function getPlayerForStep(stepIndex) {
    return stepIndex % 2 === 0 ? 'X' : 'O'
  }

  return (
    <div className="history-list">
      <h3>历史记录</h3>
      <ul>
        {/* history.slice(1) 跳过初始状态（第0步），只显示实际下棋的步骤 */}
        {history.slice(1).map((step, index) => {
          const actualIndex = index + 1  // 因为 slice(1)，所以实际步数要 +1
          const player = getPlayerForStep(actualIndex)

          return (
            <li
              key={actualIndex}
              // 如果是当前步骤，添加 active 样式进行高亮
              className={actualIndex === currentStep ? 'active' : ''}
              // 点击时调用父组件传入的回调函数，传入步骤索引
              onClick={() => onJumpToStep(actualIndex)}
            >
              第 {actualIndex} 步: {player}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default HistoryList
