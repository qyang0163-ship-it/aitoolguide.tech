# SYSTEM_MEMORY.md - 首席架构师深度记忆系统

## 项目元数据
- **项目名称**: ChipAltDB - 国产芯片替代数据库平台
- **版本**: v2.0.0-Industrial
- **最后更新**: 2026-05-09
- **架构师**: OpenClaw Chief Architect
- **状态**: ✅ 已部署上线

## 核心商业战略

### SEO 战略
- **目标关键词**: "STM32F103C8T6 国产替代", "TPS5430 P2P兼容", "AD7606 国产平替"
- **技术实现**: Astro 静态生成 + getStaticPaths 预渲染所有芯片详情页
- **Meta 策略**: 每个芯片页面独立 title/description，包含型号+替代关键词
- **已生成页面**: 6个芯片详情页 (STM32F103C8T6, AD7606, TPS5430DDAR, LM358, ADS1115IDGSR, ESP32-WROOM-32)

### 变现策略
1. **VIP 手册下载**: 首屏显眼位置放置"解锁完整参数对比表"按钮
2. **原厂推广位**: 预留国产原厂（兆易创新、极海、沁恒微）广告位
3. **BOM 配单服务**: 批量替代方案咨询转化

## 技术架构

### 技术栈
- **框架**: Astro 4.x (静态生成优先)
- **样式**: Tailwind CSS 3.x (CDN 加载)
- **部署**: Vercel (GitHub 自动触发)
- **域名**: www.ai2424.com

### 核心路由
- `/chip/[id].astro` - 芯片详情页（SEO 核心）✅ 已实现
- `/` - 首页搜索入口
- `/category/[slug]` - 分类浏览

### 工业级 UI 规范
- **主色调**: 深空灰 #0a0e14, #111827
- **强调色**: 工业蓝 #2563eb
- **成功色**: 原厂绿 #059669
- **警示色**: 琥珀黄 #f59e0b, 危险红 #dc2626
- **字体**: Inter (正文), JetBrains Mono (型号/代码)

## 数据模型

### 芯片数据结构
```typescript
interface Chip {
  id: string;           // 原厂型号
  manufacturer: string; // 原厂名称
  category: string;     // 分类ID
  description: string;  // 简短描述
  package: string;      // 封装
  alternatives: Alternative[];
}

interface Alternative {
  id: string;
  manufacturer: string;
  p2pCompatible: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  difficultyScore: 1-5;
  priceAdvantage: string; // "35%"
  stock: '充足' | '一般' | '紧张';
  datasheet: string;
}
```

## 已修复问题记录

### 2026-05-09
- [x] 创建 SYSTEM_MEMORY.md 深度记忆系统
- [x] 初始化 chip 路由结构
- [x] 准备种子数据 (STM32, AD7606, LM358, TPS5430, ADS1115, ESP32)
- [x] 修复 [tool].astro 中的 JSX 表达式语法错误（多行 map 需要括号包裹）
- [x] 修复 ai-tools-100.astro 中缺失的模块导入
- [x] 修复 index.astro 中的默认导入语法
- [x] 构建成功，生成 46 个静态页面
- [x] Git 提交并推送至 GitHub
- [x] Vercel 自动部署触发

## 环境配置

### 本地路径
- **工作目录**: `F:\llama_cpp\workspace\aitoolguide.tech`
- **禁止操作**: C 盘任何路径

### 远程仓库
- **GitHub**: `qyang0163-ship-it/aitoolguide.tech.git`
- **分支**: master
- **部署**: Vercel 自动部署
- **状态**: ✅ 已推送 (commit adaf9b1)

## 部署状态

### 构建结果
- **总页面数**: 46 个静态页面
- **芯片详情页**: 6 个 (STM32F103C8T6, AD7606, TPS5430DDAR, LM358, ADS1115IDGSR, ESP32-WROOM-32)
- **构建时间**: 3.20s
- **输出目录**: `dist/`

### 访问地址
- **生产环境**: https://www.ai2424.com/chip/STM32F103C8T6/
- **其他页面**:
  - /chip/AD7606/
  - /chip/TPS5430DDAR/
  - /chip/LM358/
  - /chip/ADS1115IDGSR/
  - /chip/ESP32-WROOM-32/

## UI 设计亮点

1. **工业级仪表盘布局**: 深空灰背景 + 高对比度信息卡片
2. **P2P 兼容状态可视化**: 绿色标识完全兼容，琥珀色标识需修改
3. **参数对比表**: 原厂 vs 国产替代规格并排对比，差异项高亮显示
4. **VIP 转化按钮**: 首屏显眼位置的"解锁完整参数对比表"和"下载VIP技术手册"
5. **原厂推广位**: 页面底部的国产原厂直供通道

## SEO 优化细节

1. **静态生成**: 所有芯片页面预渲染为静态 HTML
2. **Meta 标签**: 每个页面独立 title/description，包含长尾关键词
3. **结构化数据**: JSON-LD WebSite 标记
4. **Canonical URL**: 防止重复内容
5. **Open Graph/Twitter Cards**: 社交媒体分享优化

## 下一步计划
- [ ] 扩充芯片数据库（目标 100+ 型号）
- [ ] 实现搜索功能
- [ ] 添加 VIP 手册下载系统
- [ ] 接入原厂推广 API
