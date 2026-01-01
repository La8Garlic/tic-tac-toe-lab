import { getPlayerForStep } from '../utils/gameLogic'

/**
 * 历史记录列表组件
 * 显示游戏历史并支持时间旅行功能
 * @component
 * @param {Object} props - 组件属性
 * @param {Array<Array<string|null>>} props.history - 历史记录数组
 * @param {number} props.currentStep - 当前步骤索引
 * @param {Function} props.onJumpToStep - 跳转步骤回调函数
 */
function HistoryList({ history, currentStep, onJumpToStep }) {

  return (
    <div className="history-list">
      <h3>历史记录</h3>
      <ul>
        {history.slice(1).map((step, index) => {
          const actualIndex = index + 1
          const player = getPlayerForStep(actualIndex)

          return (
            <li
              key={actualIndex}
              className={actualIndex === currentStep ? 'active' : ''}
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
