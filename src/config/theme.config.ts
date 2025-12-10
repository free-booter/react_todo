import type { ThemeConfig } from "antd";

/**
 * Ant Design 主题配置
 * 所有颜色值对应 src/styles/variables.less 中的变量
 */
const themeConfig: ThemeConfig = {
  token: {
    // ========== 主色系 ==========
    // @theme-primary: #6200ea (深紫色)
    colorPrimary: "#6200ea",

    // 功能色 Functional Colors
    colorSuccess: "#10b981", // @success (翠绿)
    colorWarning: "#f59e0b", // @warning (橙色)
    colorError: "#ef4444", // @danger (红色)
    colorInfo: "#3b82f6", // @info (蓝色)

    // ========== 文字颜色 ==========
    colorText: "#1f2937", // @text-primary (主要文字：深灰)
    colorTextSecondary: "#4b5563", // @text-secondary (次要文字：中灰)
    colorTextTertiary: "#9ca3af", // @text-tertiary (第三级文字：浅灰)
    colorTextDisabled: "#8c8c8c", // @text-disabled (禁用文字)

    // ========== 边框颜色 ==========
    colorBorder: "#e5e7eb", // @border-light (浅色边框)
    colorBorderSecondary: "#d1d5db", // @border-medium (中等边框)

    // ========== 背景颜色 ==========
    colorBgContainer: "#ffffff", // @bg-white (容器背景：白色)
    colorBgLayout: "#f5f6f8", // @bg-base (布局背景：浅灰)
    colorBgElevated: "#ffffff", // @bg-white (浮层背景：白色)

    // ========== 圆角 ==========
    borderRadius: 12, // @border-radius-base: 12px
    borderRadiusSM: 8, // @border-radius-sm: 8px
    borderRadiusLG: 16, // @border-radius-lg: 16px
    borderRadiusXS: 6, // @border-radius-xs: 6px

    // ========== 字体大小 ==========
    fontSize: 16, // @font-size-base: 16px
    fontSizeHeading1: 32, // @font-size-xxl: 32px
    fontSizeHeading2: 20, // @font-size-xl: 20px
    fontSizeHeading3: 18, // @font-size-lg: 18px
    fontSizeSM: 14, // @font-size-sm: 14px
    fontSizeXL: 20, // @font-size-xl: 20px

    // ========== 阴影 ==========
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // @shadow-base
    boxShadowSecondary:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)", // @shadow-sm
  },

  components: {
    // ========== Button 按钮 ==========
    Button: {
      primaryColor: "#ffffff", // 按钮文字颜色
      colorPrimary: "#6200ea", // @theme-primary (主题色)
      colorPrimaryHover: "#7e3ff2", // @theme-secondary (悬浮态)
      colorPrimaryActive: "#4c1d95", // @purple-dark (激活态)
      borderRadius: 12, // @border-radius-base
    },

    // ========== Input 输入框 ==========
    Input: {
      borderRadius: 8, // @border-radius-sm
      colorBorder: "#e5e7eb", // @border-light
      colorPrimary: "#6200ea", // @theme-primary
    },

    // ========== Select 选择器 ==========
    Select: {
      borderRadius: 8, // @border-radius-sm
      colorBorder: "#e5e7eb", // @border-light
      colorPrimary: "#6200ea", // @theme-primary
    },

    // ========== Card 卡片 ==========
    Card: {
      borderRadius: 12, // @border-radius-base
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // @shadow-base
    },

    // ========== Modal 对话框 ==========
    Modal: {
      borderRadius: 16, // @border-radius-lg
      colorPrimary: "#6200ea", // @theme-primary
    },

    // ========== Tag 标签 ==========
    Tag: {
      borderRadius: 8, // @border-radius-sm
    },

    // ========== Segmented 分段控制器 ==========
    Segmented: {
      itemSelectedBg: "#6200ea", // @theme-primary (选中背景)
      itemSelectedColor: "#ffffff", // @text-light (选中文字)
      itemHoverColor: "#6200ea", // @theme-primary (文字颜色)
      trackBg: "rgba(0,0,0,0.06)", // 轨道背景
      borderRadius: 12, // @border-radius-base
    },

    // ========== DatePicker 日期选择器 ==========
    DatePicker: {
      borderRadius: 8, // @border-radius-sm
      colorPrimary: "#6200ea", // @theme-primary
    },

    // ========== Table 表格 ==========
    Table: {
      borderRadius: 12, // @border-radius-base
      colorBorderSecondary: "#e5e7eb", // @border-light
    },

    // ========== Dropdown 下拉菜单 ==========
    Dropdown: {
      borderRadius: 12, // @border-radius-base
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // @shadow-lg
    },

    // ========== Menu 菜单 ==========
    Menu: {
      itemBorderRadius: 8, // @border-radius-sm
      itemSelectedBg: "#6200ea", // @theme-primary (选中背景)
      itemSelectedColor: "#ffffff", // @text-light (选中文字)
    },

    // ========== Pagination 分页 ==========
    Pagination: {
      borderRadius: 8, // @border-radius-sm
      colorPrimary: "#6200ea", // @theme-primary
    },
  },
};

export default themeConfig;
