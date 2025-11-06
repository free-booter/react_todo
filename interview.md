## 为什么 React 运行时出现“渲染两次”？

我现在的项目结构是
views/
├── Task  
 ├── index.tsx #引入了 BoardView，从这里开始传递 todos
└── components
├── BoardView
├── index.tsx # 引入了 TaskColumn
└── TaskColumn
├── index.tsx #引入了 TaskCard
├── ListView
├── index.tsx
├── TaskCard
├── index.tsx
└── TaskFilters
├── index.tsx
