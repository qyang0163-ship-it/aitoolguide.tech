# AIToolGuide.tech 部署指南

## 当前状态
商业化版本代码已准备就绪，位于：
`C:\Users\Administrator\Documents\aitoolguide-tech`

## 需要完成的步骤

### 步骤1：安装 Git
由于当前系统没有安装Git，需要先安装：

**选项A：安装 GitHub Desktop（推荐新手）**
1. 访问 https://desktop.github.com/download/
2. 下载并安装 GitHub Desktop
3. 登录您的GitHub账户
4. 克隆仓库 `qyang0163-ship-it/aitoolguide.tech`

**选项B：安装 Git for Windows**
1. 访问 https://git-scm.com/download/win
2. 下载并安装 Git
3. 使用命令行操作

### 步骤2：替换代码文件

安装Git后，将以下文件复制到克隆的仓库中：

1. **替换首页**：
   - 源文件：`C:\Users\Administrator\Documents\aitoolguide-tech\src\pages\index.astro`
   - 目标：`[克隆路径]\src\pages\index.astro`

2. **创建布局文件**：
   - 源文件：`C:\Users\Administrator\Documents\aitoolguide-tech\src\layouts\Layout.astro`
   - 目标：`[克隆路径]\src\layouts\Layout.astro`

3. **创建工具详情页**：
   - 源文件：`C:\Users\Administrator\Documents\aitoolguide-tech\src\pages\tool\[tool].astro`
   - 目标：`[克隆路径]\src\pages\tool\[tool].astro`

### 步骤3：提交并推送

**使用 GitHub Desktop：**
1. 打开 GitHub Desktop
2. 选择 aitoolguide.tech 仓库
3. 查看变更列表，应该显示修改的文件
4. 填写提交信息：`Day 1: 商业化首页改造 - 赚钱导向设计`
5. 点击 "Commit to master"
6. 点击 "Push origin" 推送到GitHub

**使用命令行：**
```bash
cd [克隆路径]
git add .
git commit -m "Day 1: 商业化首页改造 - 赚钱导向设计"
git push origin master
```

### 步骤4：验证部署

1. 推送后，访问 https://vercel.com/dashboard
2. 找到 aitoolguide-tech 项目
3. 查看部署状态（通常2-3分钟完成）
4. 访问生产环境 https://aitoolguide-tech.vercel.app 验证

## 文件清单

已创建的商业化版本文件：

```
aitoolguide-tech/
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # ✅ 基础布局组件
│   └── pages/
│       ├── index.astro           # ✅ 商业化首页（赚钱导向）
│       └── tool/
│           └── [tool].astro      # ✅ 工具详情页模板
├── public/
│   └── favicon.svg               # ✅ 网站图标
├── astro.config.mjs              # ✅ Astro配置
├── package.json                  # ✅ 依赖配置
├── tsconfig.json                 # ✅ TypeScript配置
└── README.md                     # ✅ 项目说明
```

## 商业化版本亮点

### 首页改造
- 💰 强烈的赚钱场景标题："用AI工具轻松赚钱，普通人也能月入过万"
- 🔥 多处CTA按钮：导航栏、Hero区、工具卡片、底部CTA（共10+个按钮）
- ⏰ 紧迫感元素：限时福利、名额限制、实时数据
- 📊 收入展示：每个工具显示预期收入范围

### 工具详情页模板
- ✅ 标题格式："工具名怎么赚钱？2026年实测月入XXX的X种方法"
- ✅ 工具介绍 + 赚钱方法详解
- ✅ 操作步骤（4步流程）
- ✅ 3个转化按钮："立即免费使用"、"查看赚钱教程"、"加入交流群"
- ✅ 紧迫感标签："正在爆火"

### 变现导向设计
- 六大AI变现赛道分类
- 真实成功案例展示
- 接单平台推荐
- 经验技巧总结
- FAQ常见问题

## 下一步（Day 2-3）

部署完成后，继续执行：
1. 创建SEO流量页面（/ai赚钱工具、/chatgpt怎么赚钱等）
2. 接入Affiliate推广链接
3. 添加Google Analytics追踪

---

**代码已准备就绪，等待Git安装完成后即可部署！**
