# SYSTEM_MEMORY.md - 首席架构师深度记忆系统

## 项目元数据
- **项目名称**: ChipAltDB - 国产芯片替代数据库平台
- **版本**: v2.0.0-Industrial
- **最后更新**: 2026-05-09
- **架构师**: OpenClaw Chief Architect

## 核心商业战略

### SEO 战略
- **目标关键词**: "STM32F103C8T6 国产替代", "TPS5430 P2P兼容", "AD7606 国产平替"
- **技术实现**: Astro 静态生成 + getStaticPaths 预渲染所有芯片详情页
- **Meta 策略**: 每个芯片页面独立 title/description，包含型号+替代关键词

### 变现策略
1. **VIP 手册下载**: 首屏显眼位置放置"解锁完整参数对比表"按钮
2. **原厂推广位**: 预留国产原厂（兆易创新、极海、沁恒微）广告位
3. **BOM 配单服务**: 批量替代方案咨询转化

## 技术架构

### 技术栈
- **框架**: Astro 4.x (静态生成优先)
- **样式**: Tailwind CSS 3.x
- **部署**: Vercel (GitHub 自动触发)
- **域名**: www.ai2424.com

### 核心路由
- `/chip/[id].astro` - 芯片详情页（SEO 核心）
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
- [x] 准备种子数据 (STM32, AD7606, LM358, TPS5430)

## 环境配置

### 本地路径
- **工作目录**: `F:\llama_cpp\workspace\aitoolguide.tech`
- **禁止操作**: C 盘任何路径

### 远程仓库
- **GitHub**: `qyang0163-ship-it/aitoolguide.tech.git`
- **分支**: master
- **部署**: Vercel 自动部署

## 待办事项
- [ ] 完成 [id].astro 核心页面开发
- [ ] 注入种子数据到 getStaticPaths
- [ ] 构建测试 npm run build
- [ ] Git 提交并推送
- [ ] Vercel 部署验证
