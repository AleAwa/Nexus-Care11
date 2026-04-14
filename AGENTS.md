# 项目上下文

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4

## 目录结构

```
├── public/                 # 静态资源
├── scripts/                # 构建与启动脚本
│   ├── build.sh            # 构建脚本
│   ├── dev.sh              # 开发环境启动脚本
│   ├── prepare.sh          # 预处理脚本
│   └── start.sh            # 生产环境启动脚本
├── src/
│   ├── app/                # 页面路由与布局
│   ├── components/ui/      # Shadcn UI 组件库
│   ├── hooks/              # 自定义 Hooks
│   ├── lib/                # 工具库
│   │   └── utils.ts        # 通用工具函数 (cn)
│   └── server.ts           # 自定义服务端入口
├── next.config.ts          # Next.js 配置
├── package.json            # 项目依赖管理
└── tsconfig.json           # TypeScript 配置
```

- 项目文件（如 app 目录、pages 目录、components 等）默认初始化到 `src/` 目录下。

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。
**常用命令**：
- 安装依赖：`pnpm add <package>`
- 安装开发依赖：`pnpm add -D <package>`
- 安装所有依赖：`pnpm install`
- 移除依赖：`pnpm remove <package>`

## 开发规范

### Hydration 问题防范

1. 严禁在 JSX 渲染逻辑中直接使用 typeof window、Date.now()、Math.random() 等动态数据。**必须使用 'use client' 并配合 useEffect + useState 确保动态内容仅在客户端挂载后渲染**；同时严禁非法 HTML 嵌套（如 <p> 嵌套 <div>）。
2. **禁止使用 head 标签**，优先使用 metadata，详见文档：https://nextjs.org/docs/app/api-reference/functions/generate-metadata
   1. 三方 CSS、字体等资源可在 `globals.css` 中顶部通过 `@import` 引入或使用 next/font
   2. preload, preconnect, dns-prefetch 通过 ReactDOM 的 preload、preconnect、dns-prefetch 方法引入
   3. json-ld 可阅读 https://nextjs.org/docs/app/guides/json-ld

## UI 设计与组件规范 (UI & Styling Standards)

- 模板默认预装核心组件库 `shadcn/ui`，位于`src/components/ui/`目录下
- Next.js 项目**必须默认**采用 shadcn/ui 组件、风格和规范，**除非用户指定用其他的组件和规范。**

---

# Nexus Care 国际医疗AI双语导诊与陪护系统

## 项目概述

Nexus Care 是一款面向国际医疗场景的AI双语导诊与陪护系统，支持中英文界面，提供智能问诊、预约挂号、陪护照料和健康档案管理功能。

## 核心功能模块

| 模块 | 路由 | 功能描述 |
|------|------|----------|
| 首页 | `/` | 功能入口、快速咨询入口 |
| AI导诊 | `/consultation` | 智能症状分析、科室推荐（流式输出） |
| 预约挂号 | `/appointment` | 科室选择、医生选择、日期时间预约 |
| 陪护照料 | `/companion` | 陪护申请、状态跟踪、陪护员管理 |
| 健康档案 | `/records` | 就诊历史、处方记录、检查报告、过敏信息 |
| 个人中心 | `/profile` | 语言切换、通知设置 |

## 技术架构

### 国际化

- 完整的双语支持（中/英文）
- Context Provider: `src/hooks/use-language.tsx`
- 配置文件: `src/lib/i18n.ts`
- 切换方式: 页面右上角语言切换器

### AI 导诊（流式输出）

- 后端 API: `src/app/api/consultation/route.ts`
- 使用 `coze-coding-dev-sdk` 的流式输出
- 支持多轮对话
- 实时打字机效果

### 数据库

- **Supabase PostgreSQL**
- Schema: `src/storage/database/shared/schema.ts`
- 核心表：
  - `appointments` - 预约挂号
  - `companion_requests` - 陪护申请
  - `consultations` - AI问诊记录
  - `health_records` - 健康档案
  - `allergies` - 过敏信息
  - `doctors` - 医生信息

### API 接口

| 接口 | 方法 | 描述 |
|------|------|------|
| `/api/consultation` | POST | AI导诊对话（流式） |
| `/api/appointments` | GET/POST | 预约查询/创建 |
| `/api/companion` | GET/POST | 陪护申请查询/创建 |
| `/api/doctors` | GET | 医生列表查询 |

## 开发命令

```bash
pnpm dev      # 启动开发服务器 (端口5000)
pnpm build    # 构建生产版本
pnpm start    # 启动生产服务器
pnpm lint     # 代码检查
pnpm ts-check # TypeScript类型检查
```

## 数据库管理

```bash
coze-coding-ai db generate-models  # 从数据库拉取模型
coze-coding-ai db upgrade           # 同步Schema到数据库
```

## 注意事项

1. **流式输出**: AI导诊必须使用流式输出，用户体验更好
2. **RLS策略**: 所有表已配置公开读写策略（无Auth系统）
3. **语言切换**: 页面刷新会保持语言选择（localStorage）
