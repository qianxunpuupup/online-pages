# TaskFlow · 待办清单

一个简洁优雅的待办清单应用，支持任务分组、优先级、截止时间与数据本地持久化。

## 技术栈

- React 19
- Vite 5
- lucide-react（图标）
- 数据通过 localStorage 持久化

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 打包构建
npm run build

# 预览生产构建
npm run preview
```

## 功能特性

- **快捷筛选**：全部任务 / 今日任务 / 即将到来 / 已完成
- **任务分组**：工作、个人、学习、购物，支持新建与删除自定义分组
- **优先级**：高 / 中 / 低
- **截止时间**：为每个任务设置截止时间
- **进度统计**：完成率环形图、分组完成情况、即将到来的任务
- **本地持久化**：所有数据自动保存到浏览器 localStorage

## 目录结构

```
├── src/
│   ├── components/      # 组件（Sidebar / TaskList / TaskItem / AddTask / Stats）
│   ├── hooks/           # useLocalStorage 等自定义 Hook
│   ├── data.js          # 默认分组与任务数据
│   ├── App.jsx          # 根组件
│   ├── main.jsx         # 应用入口
│   └── index.css        # 全局样式
├── public/              # 静态资源（favicon / icons）
├── index.html           # Vite 入口 HTML
├── vite.config.js       # Vite 配置
└── package.json
```

## 部署

GitHub Actions 工作流（`.github/workflows/static.yml`）会在推送 `main` 分支时自动安装依赖、构建，并将 `dist/` 部署到 GitHub Pages。
