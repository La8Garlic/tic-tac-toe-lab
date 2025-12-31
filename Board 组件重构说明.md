# Board 组件重构说明

## 概述

本文档记录了井字棋项目中 Board 组件从单一组件重构为独立受控组件的过程和对比分析。

---

## 重构前后对比

### 原来的方式（单一组件）

```jsx
// App.jsx 中直接渲染 board
<div className="board">
  {squares.map((value, index) => (
    <Square
      key={index}
      value={value}
      onSquareClick={() => handleClick(index)}
    />
  ))}
</div>

// handleClick 在 App 内部定义
function handleClick(index) {
  if (squares[index] || winner || isDraw) {
    return
  }
  const nextSquares = squares.slice()
  nextSquares[index] = xIsNext ? 'X' : 'O'
  setSquares(nextSquares)      // 直接修改状态
  setXIsNext(!xIsNext)
  // ...历史记录逻辑
}
```

### 现在的方式（受控组件）

```jsx
// App.jsx 使用 Board 组件
<Board xIsNext={xIsNext} squares={squares} onPlay={handlePlay} />

// handlePlay 只接收处理后的数据
function handlePlay(nextSquares) {
  setSquares(nextSquares)      // Board 已处理好，直接设置
  setXIsNext(!xIsNext)
  // ...历史记录逻辑
}
```

---

## 核心区别

| 方面 | 原来的方式 | 现在的方式 |
|------|------------|------------|
| **状态管理** | App 直接管理 `squares` 状态 | App 通过 props 传递给 Board |
| **点击处理** | `handleClick(index)` 在 App 中 | `handleClick(index)` 在 Board 中 |
| **数据流** | App → 直接修改 state | App → Board → `onPlay` → App |
| **责任划分** | App 承担所有逻辑 | Board 只负责棋盘交互 |
| **获胜检测** | 在 App 中计算 | 在 Board 中计算 |
| **状态显示** | 在 App 中渲染 | 在 Board 中渲染 |

---

## 数据流对比

### 原来的数据流

```
用户点击 → App.handleClick() → setSquares() → 重新渲染
        ↑
    所有逻辑都在 App 内
```

### 现在的数据流

```
用户点击 → Board.handleClick() → onPlay(nextSquares) → App.handlePlay() → setSquares()
        ↑                        ↑
    Board 负责交互逻辑          App 负责状态管理
```

---

## 新的文件结构

```
src/
├── components/
│   ├── Board.jsx    # 棋盘组件（受控组件）
│   └── Square.jsx   # 方格组件
└── App.jsx          # 主应用组件
```

---

## 组件职责

### Board.jsx - 受控组件

**Props:**
- `xIsNext` - boolean, 当前是否是 X 的回合
- `squares` - array, 当前棋盘状态
- `onPlay` - function, 当玩家下棋时的回调

**职责:**
- 处理方格点击逻辑
- 显示游戏状态
- 包含 `calculateWinner` 和 `checkDraw` 逻辑
- 通过 `onPlay` 回调通知父组件状态变化

### Square.jsx - 展示组件

**Props:**
- `value` - string|null, 方格的值（'X'、'O' 或 null）
- `onSquareClick` - function, 点击回调

**职责:**
- 纯展示组件，无状态
- 接收 props 并渲染

### App.jsx - 顶层组件

**状态:**
- `squares` - 当前棋盘状态
- `xIsNext` - 当前玩家
- `history` - 历史记录
- `currentStep` - 当前步骤

**职责:**
- 管理所有状态
- 处理历史记录和时间旅行
- 渲染游戏结束弹窗
- 通过 `handlePlay` 回调与 Board 通信

---

## 重构优势

1. **单一职责原则**
   - Board 只关心棋盘交互
   - App 只关心状态管理

2. **可复用性**
   - Board 组件可以在其他场景复用
   - Square 组件独立可用

3. **可测试性**
   - Board 可以独立测试
   - Mock `onPlay` 回调即可

4. **清晰的接口**
   - `Board(xIsNext, squares, onPlay)` 接口明确
   - 数据流向清晰

5. **符合 React 最佳实践**
   - 受控组件模式
   - 单向数据流
   - Props 向下，事件向上

---

## onPlay 回调机制详解

### `onPlay` 是自己定义的

`onPlay` 是**你自己定义的** prop 名称，不是 React 提供的。你可以把它改成任何名字，比如 `onMove`、`onSquareClick`、`handleMove` 等都可以。

### 完整调用流程

```
┌─────────────────────────────────────────────────────────────────┐
│                        数据流向                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. App.jsx                                                     │
│     └── <Board onPlay={handlePlay} />                          │
│         ↑                                                       │
│         └── 把 App 的 handlePlay 函数通过 props 传给 Board      │
│                                                                 │
│  2. Board.jsx                                                   │
│     └── function handleClick(index) {                          │
│           ...                                                   │
│           onPlay(nextSquares)  ───────────┐                    │
│         }                              │  │                    │
│         ↑                               │  │                    │
│         └── Board 调用传入的 onPlay      │  │                    │
│                                         │  │                    │
│  3. 实际执行                             │  │                    │
│     ┌─────────────────────────────────┘  │                    │
│     ↓                                   ↓                    │
│     App.jsx 中的 handlePlay(nextSquares) 被调用                 │
│     └── setSquares(nextSquares)                              │
│         setXIsNext(!xIsNext)                                  │
│         ...历史记录逻辑                                        │
└─────────────────────────────────────────────────────────────────┘
```

### 代码对照

#### App.jsx - 定义函数并传递

```jsx
function App() {
  // App 定义 handlePlay
  function handlePlay(nextSquares) {
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
    // ...
  }

  return (
    // 把 handlePlay 通过 onPlay 这个 prop 传给 Board
    <Board xIsNext={xIsNext} squares={squares} onPlay={handlePlay} />
  )
}
```

#### Board.jsx - 接收并调用

```jsx
function Board({ xIsNext, squares, onPlay }) {
  // Board 接收 onPlay（其实就是 App 的 handlePlay）

  function handleClick(index) {
    // ... 处理逻辑
    const nextSquares = squares.slice()
    nextSquares[index] = xIsNext ? 'X' : 'O'

    onPlay(nextSquares)  // ← 调用 App 的 handlePlay
  }
}
```

### 职责划分总结

| 位置 | 内容 | 原因 |
|------|------|------|
| **Board 独有** | `handleClick`、`calculateWinner`、`checkDraw` | 只有 Board 需要处理棋盘交互 |
| **App 公用** | `handlePlay`、历史记录、弹窗逻辑 | 需要跨组件共享的状态管理 |

这就是 React 中**受控组件**的核心思想：
- 子组件负责交互逻辑
- 父组件负责状态管理
- 通过回调函数通信