# 主题配置说明

## 📁 文件结构

```
src/
├── styles/
│   └── variables.less          # Less 变量定义（颜色的单一数据源）
└── config/
    └── theme.config.ts         # Ant Design 主题配置
```

## 🎨 如何修改主题颜色？

### 步骤 1：修改 Less 变量

所有颜色变量定义在 `src/styles/variables.less` 中：

```less
// 主题色系统
@theme-primary: #6200ea; // 主色调：深紫色
@theme-secondary: #7e3ff2; // 次要色：中紫色
@theme-light: #f4eeff; // 浅色调：淡紫色

// 功能色
@success: #10b981; // 成功色：翠绿
@warning: #f59e0b; // 警告色：橙色
@danger: #ef4444; // 危险色：红色
@info: #3b82f6; // 信息色：蓝色

// 文字颜色
@text-primary: #1f2937; // 主要文字：深灰
@text-secondary: #4b5563; // 次要文字：中灰
@text-tertiary: #9ca3af; // 第三级文字：浅灰
```

### 步骤 2：同步 Ant Design 主题配置

修改 `src/config/theme.config.ts` 中对应的颜色值：

```typescript
const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: "#6200ea", // 对应 @theme-primary
    colorSuccess: "#10b981", // 对应 @success
    // ...
  },
};
```

## 🔄 主题配置映射关系

| Less 变量             | Ant Design Token     | 说明     |
| --------------------- | -------------------- | -------- |
| `@theme-primary`      | `colorPrimary`       | 主题色   |
| `@success`            | `colorSuccess`       | 成功色   |
| `@warning`            | `colorWarning`       | 警告色   |
| `@danger`             | `colorError`         | 错误色   |
| `@info`               | `colorInfo`          | 信息色   |
| `@text-primary`       | `colorText`          | 主要文字 |
| `@text-secondary`     | `colorTextSecondary` | 次要文字 |
| `@border-light`       | `colorBorder`        | 边框颜色 |
| `@bg-white`           | `colorBgContainer`   | 容器背景 |
| `@border-radius-base` | `borderRadius`       | 基础圆角 |

## 📝 示例：更换主题为蓝色系

### 1. 修改 `variables.less`

```less
// 主题色系统
@theme-primary: #1890ff; // 主色调：蓝色
@theme-secondary: #40a9ff; // 次要色：亮蓝色
@theme-light: #e6f7ff; // 浅色调：淡蓝色
```

### 2. 修改 `theme.config.ts`

```typescript
token: {
  colorPrimary: "#1890ff",  // 对应 @theme-primary
},
components: {
  Button: {
    colorPrimary: "#1890ff",        // 主题色
    colorPrimaryHover: "#40a9ff",   // 悬浮态
  },
  Segmented: {
    itemSelectedBg: "#1890ff",      // 选中背景
  },
  // ...
}
```

## ⚠️ 注意事项

1. **保持一致性**：修改 Less 变量后，务必同步更新 `theme.config.ts`
2. **变量命名**：遵循 Less 变量的命名规范（见 `variables.less`）
3. **颜色对比度**：确保文字与背景有足够的对比度，满足可访问性要求
4. **测试验证**：修改后测试所有组件的视觉效果

## 🚀 快速切换预设主题

### 紫色系（当前）

```typescript
colorPrimary: "#6200ea";
```

### 蓝色系

```typescript
colorPrimary: "#1890ff";
```

### 绿色系

```typescript
colorPrimary: "#52c41a";
```

### 橙色系

```typescript
colorPrimary: "#fa8c16";
```

### 红色系

```typescript
colorPrimary: "#f5222d";
```

## 📚 相关文档

- [Ant Design 主题定制](https://ant.design/docs/react/customize-theme-cn)
- [Less 变量](https://lesscss.org/features/#variables-feature)
- [颜色系统设计](https://ant.design/docs/spec/colors-cn)
