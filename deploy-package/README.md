# ai2424.com 部署包

## 快速部署步骤

### 方法1：GitHub网页上传（最简单）

1. 访问: https://github.com/qyang0163-ship-it/ai2424.com
2. 点击 "Add file" → "Upload files"
3. 拖拽本文件夹中的文件到上传区域
4. 填写提交信息: "Day 1: 商业化首页改造 - 赚钱导向设计"
5. 点击 "Commit changes"

### 方法2：Git命令行

```bash
git clone https://github.com/qyang0163-ship-it/ai2424.com.git
cd ai2424.com
cp -r ../deploy-package/* .
git add .
git commit -m "Day 1: 商业化首页改造 - 赚钱导向设计"
git push origin master
```

## 文件清单

- src/pages/index.astro
- src/layouts/Layout.astro
- src/pages/tool/[tool].astro
- public/favicon.svg

## 部署后

网站地址: https://aitoolguide-tech.vercel.app
