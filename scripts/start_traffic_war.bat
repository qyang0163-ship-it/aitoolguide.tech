@echo off
chcp 65001 >nul
echo 🚀 AIToolGuide 流量获取三大战役 - 快速启动器
echo ============================================
echo.

REM 检查Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 未检测到Python，请先安装Python 3.8+
    pause
    exit /b 1
)

echo ✅ Python已安装

REM 安装依赖
echo.
echo 📦 安装依赖...
cd /d "%~dp0"
pip install -q -r requirements.txt
if errorlevel 1 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)
echo ✅ 依赖安装完成

REM 生成首批内容
echo.
echo 📝 生成首批SEO文章...
python seo_content_generator.py > generated_content.json
if errorlevel 1 (
    echo ❌ 内容生成失败
    pause
    exit /b 1
)
echo ✅ 内容已生成到 generated_content.json

echo.
echo ============================================
echo 🎉 启动完成！
echo.
echo 下一步操作：
echo 1. 查看 generated_content.json 中的文章
echo 2. 复制文章内容到 /src/content/blog/
echo 3. 运行 npm run build 构建网站
echo 4. 部署到生产环境
echo.
echo 📖 详细方案请查看：
echo    - TRAFFIC_WAR_MASTERPLAN.md (总纲)
echo    - video_matrix_strategy.md (短视频)
echo    - community_backlinks_strategy.md (社区打榜)
echo.
pause
