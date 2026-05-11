#!/usr/bin/env python3
"""
SCIP MONITOR - 本地到云端一键同步与部署脚本
功能：同步 F:\mined_data\ 到 src/data/ 并自动推送到GitHub触发Vercel部署
"""

import os
import shutil
import json
import subprocess
from datetime import datetime
from pathlib import Path

# 配置
SOURCE_DIR = Path(r"F:\mined_data")
PROJECT_ROOT = Path(__file__).parent
DATA_DIR = PROJECT_ROOT / "src" / "data"
CATEGORIES = ["chips", "materials", "equipment", "enterprise", "policy"]

def log(message, level="INFO"):
    """彩色日志输出"""
    colors = {
        "INFO": "\033[36m",    # 青色
        "SUCCESS": "\033[32m", # 绿色
        "WARNING": "\033[33m", # 黄色
        "ERROR": "\033[31m", # 红色
        "RESET": "\033[0m"
    }
    timestamp = datetime.now().strftime("%H:%M:%S")
    print(f"{colors.get(level, '')}[{timestamp}] [{level}] {message}{colors['RESET']}")

def ensure_directories():
    """确保所有分类目录存在"""
    log("检查数据目录结构...")
    for category in CATEGORIES:
        category_dir = DATA_DIR / category
        category_dir.mkdir(parents=True, exist_ok=True)
        log(f"  ✓ {category}/ 目录就绪", "SUCCESS")

def clean_category_dir(category_dir: Path):
    """清理分类目录中的旧JSON文件"""
    json_files = list(category_dir.glob("*.json"))
    if json_files:
        log(f"  清理 {len(json_files)} 个旧文件...")
        for f in json_files:
            f.unlink()

def sync_category(category: str) -> int:
    """同步单个分类的数据"""
    source_dir = SOURCE_DIR / category
    target_dir = DATA_DIR / category
    
    if not source_dir.exists():
        log(f"  ⚠ 源目录不存在: {source_dir}", "WARNING")
        return 0
    
    # 清理旧文件
    clean_category_dir(target_dir)
    
    # 复制新文件
    json_files = list(source_dir.glob("*.json"))
    copied = 0
    
    for src_file in json_files:
        try:
            # 验证JSON格式
            with open(src_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            target_file = target_dir / src_file.name
            shutil.copy2(src_file, target_file)
            copied += 1
            
        except json.JSONDecodeError as e:
            log(f"  ✗ 无效JSON {src_file.name}: {e}", "ERROR")
        except Exception as e:
            log(f"  ✗ 复制失败 {src_file.name}: {e}", "ERROR")
    
    log(f"  ✓ 同步 {copied}/{len(json_files)} 个文件", "SUCCESS")
    return copied

def sync_all_data():
    """同步所有分类数据"""
    log("=" * 60)
    log("开始数据同步", "INFO")
    log(f"源目录: {SOURCE_DIR}")
    log(f"目标目录: {DATA_DIR}")
    log("=" * 60)
    
    total_files = 0
    for category in CATEGORIES:
        log(f"\n[{category.upper()}]")
        count = sync_category(category)
        total_files += count
    
    log(f"\n{'=' * 60}")
    log(f"总计同步: {total_files} 个文件", "SUCCESS")
    return total_files

def run_git_command(cmd: list, description: str) -> bool:
    """执行Git命令"""
    try:
        log(f"执行: {description}")
        result = subprocess.run(
            cmd,
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='ignore'
        )
        
        if result.returncode == 0:
            if result.stdout.strip():
                log(f"  {result.stdout.strip()}", "SUCCESS")
            return True
        else:
            log(f"  ✗ {result.stderr}", "ERROR")
            return False
            
    except Exception as e:
        log(f"  ✗ 执行失败: {e}", "ERROR")
        return False

def git_operations():
    """执行Git提交和推送"""
    log("\n" + "=" * 60)
    log("开始Git操作", "INFO")
    log("=" * 60)
    
    # 检查Git状态
    if not run_git_command(["git", "status", "--short"], "检查Git状态"):
        log("Git仓库可能有问题，继续尝试...", "WARNING")
    
    # git add .
    if not run_git_command(["git", "add", "."], "git add ."):
        log("添加文件失败", "ERROR")
        return False
    
    # 检查是否有变更
    status_result = subprocess.run(
        ["git", "status", "--short"],
        cwd=PROJECT_ROOT,
        capture_output=True,
        text=True,
        encoding='utf-8'
    )
    
    if not status_result.stdout.strip():
        log("没有文件变更，跳过提交", "WARNING")
        return True
    
    # git commit
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    commit_msg = f"Data Update: {timestamp} | Auto-sync from P100 node"
    
    if not run_git_command(["git", "commit", "-m", commit_msg], f"git commit -m \"{commit_msg}\""):
        log("提交失败", "ERROR")
        return False
    
    # git push
    if not run_git_command(["git", "push", "origin", "master"], "git push origin master"):
        log("推送失败", "ERROR")
        return False
    
    log("\n✓ Git操作完成", "SUCCESS")
    return True

def verify_deployment():
    """验证部署状态"""
    log("\n" + "=" * 60)
    log("部署验证", "INFO")
    log("=" * 60)
    log("Vercel将在推送后自动触发构建")
    log("监控地址: https://www.ai2424.com")
    log("构建日志: https://vercel.com/dashboard")

def main():
    """主流程"""
    print("\n" + "=" * 60)
    print(" SCIP MONITOR - 数据同步与自动部署系统 ")
    print("=" * 60 + "\n")
    
    # 1. 确保目录结构
    ensure_directories()
    
    # 2. 同步数据
    total = sync_all_data()
    
    if total == 0:
        log("\n⚠ 没有文件被同步，检查源目录是否有数据", "WARNING")
        response = input("\n是否继续Git操作? (y/N): ")
        if response.lower() != 'y':
            log("操作已取消", "INFO")
            return
    
    # 3. Git操作
    if git_operations():
        # 4. 验证部署
        verify_deployment()
        
        log("\n" + "=" * 60)
        log("✓ 同步与部署流程完成！", "SUCCESS")
        log("=" * 60)
        log(f"同步文件: {total} 个")
        log(f"部署时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        log("=" * 60 + "\n")
    else:
        log("\n✗ 流程中断", "ERROR")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        log("\n用户中断", "WARNING")
    except Exception as e:
        log(f"\n✗ 意外错误: {e}", "ERROR")
        import traceback
        traceback.print_exc()