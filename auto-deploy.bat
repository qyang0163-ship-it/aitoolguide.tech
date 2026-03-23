@echo off
chcp 65001 >nul
title AIToolGuide.tech 自动部署工具
color 0A

echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║                                                              ║
echo  ║           🚀 AIToolGuide.tech 自动部署工具                    ║
echo  ║                                                              ║
echo  ║     商业化版本 - 赚钱导向设计                                  ║
echo  ║                                                              ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

:: 检查Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo  ❌ 未检测到Node.js，正在下载安装...
    echo.
    powershell -Command "& {Invoke-WebRequest -Uri 'https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi' -OutFile '%TEMP%\nodejs.msi'}"
    echo  📦 正在安装Node.js...
    start /wait msiexec /i "%TEMP%\nodejs.msi" /qn
    setx PATH "%PATH%;C:\Program Files\nodejs" /M
    echo  ✅ Node.js安装完成
    echo.
)

echo  ✅ Node.js已就绪
echo.

:: 创建自动部署脚本
echo  📝 创建部署脚本...

cd /d "C:\Users\Administrator\Documents\aitoolguide-tech"

:: 创建package.json（移除type: module）
echo {> package.json
echo   "name": "aitoolguide-tech",>> package.json
echo   "version": "2.0.0",>> package.json
echo   "scripts": {>> package.json
echo     "dev": "astro dev",>> package.json
echo     "build": "astro build",>> package.json
echo     "preview": "astro preview">> package.json
echo   },>> package.json
echo   "dependencies": {>> package.json
echo     "astro": "^4.0.0">> package.json
echo   }>> package.json
echo }>> package.json

echo  ✅ 配置文件创建完成
echo.

:: 启动浏览器进行GitHub操作
echo  🌐 正在打开GitHub...
echo.
echo  ┌─────────────────────────────────────────────────────────────┐
echo  │  请按以下步骤操作：                                           │
echo  │                                                             │
echo  │  1. 登录GitHub（如果未登录）                                   │
echo  │  2. 访问仓库：qyang0163-ship-it/aitoolguide.tech              │
echo  │  3. 点击 "Add file" → "Upload files"                          │
echo  │  4. 选择以下文件上传：                                         │
echo  │     • src/pages/index.astro                                   │
echo  │     • src/layouts/Layout.astro                                │
echo  │     • src/pages/tool/[tool].astro                             │
echo  │     • public/favicon.svg                                      │
echo  │  5. 填写提交信息并提交                                         │
echo  │                                                             │
echo  └─────────────────────────────────────────────────────────────┘
echo.

:: 打开文件资源管理器显示文件
echo  📂 正在打开文件位置...
explorer "C:\Users\Administrator\Documents\GitHub\aitoolguide.tech\aitoolguide.tech-master\src\pages"

:: 打开GitHub
echo  🌐 正在打开GitHub仓库...
start "" "https://github.com/qyang0163-ship-it/aitoolguide.tech"

echo.
echo  ✅ 自动化准备完成！
echo.
echo  文件位置：C:\Users\Administrator\Documents\GitHub\aitoolguide.tech\aitoolguide.tech-master\
echo.
echo  按任意键退出...
pause >nul
