/**
 * 历史记录列表组件
 * 纯展示组件，负责渲染历史记录列表
 * @component
 * @param {Object} props - 组件属性
 * @param {Array<Object>} props.historyItems - 历史记录项数组，每个项包含 { index: number, player: string, isActive: boolean }
 * @param {Function} props.onJumpToStep - 跳转步骤回调函数
 *
 * @example
 * const historyItems = [
 *   { index: 1, player: 'X', isActive: false },
 *   { index: 2, player: 'O', isActive: true }
 * ]
 */
function HistoryList({ historyItems, onJumpToStep }) {
  return (
    <div className="history-list">
      <h3>历史记录</h3>
      <ul>
        {historyItems.map(item => (
          <li
            key={item.index}
            className={item.isActive ? 'active' : ''}
            onClick={() => onJumpToStep(item.index)}
          >
            第 {item.index} 步: {item.player}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HistoryList

