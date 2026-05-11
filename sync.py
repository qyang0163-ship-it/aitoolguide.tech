#!/usr/bin/env python3
"""
SCIP MONITOR 数据同步脚本
用法：
1. 手动将 F:\mined_data\ 下的数据文件复制到本目录
2. 运行: python sync.py
3. 数据将自动同步到 src/data/ 目录
"""

import json
import os
import shutil
from pathlib import Path

# 配置
SOURCE_DIR = Path("./mined_data")  # 手动复制到此目录
TARGET_DIR = Path("./src/data")

# 数据文件映射
DATA_FILES = {
    "chips.json": "chips.json",
    "equipment.json": "equipment.json",
    "materials.json": "materials.json",
    "enterprises.json": "enterprises.json",
    "policies.json": "policies.json",
}

def sync_data():
    """同步数据文件"""
    print("=" * 60)
    print("SCIP MONITOR 数据同步工具")
    print("=" * 60)
    
    # 确保目标目录存在
    TARGET_DIR.mkdir(parents=True, exist_ok=True)
    
    # 检查源目录
    if not SOURCE_DIR.exists():
        print(f"\n⚠️  源目录不存在: {SOURCE_DIR}")
        print("请手动将 F:\\mined_data\\ 下的文件复制到 ./mined_data/ 目录")
        print("\n操作步骤:")
        print("1. 在 Windows 资源管理器中打开 F:\\mined_data\\")
        print("2. 复制所有 .json 文件")
        print(f"3. 粘贴到: {SOURCE_DIR.absolute()}")
        print("4. 再次运行此脚本")
        return False
    
    print(f"\n📁 源目录: {SOURCE_DIR.absolute()}")
    print(f"📁 目标目录: {TARGET_DIR.absolute()}")
    
    # 同步文件
    synced = []
    failed = []
    
    for src_name, dst_name in DATA_FILES.items():
        src_path = SOURCE_DIR / src_name
        dst_path = TARGET_DIR / dst_name
        
        if src_path.exists():
            try:
                # 验证JSON
                with open(src_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                # 复制文件
                shutil.copy2(src_path, dst_path)
                count = len(data) if isinstance(data, list) else 1
                synced.append(f"  ✓ {src_name} -> {dst_name} ({count} 条记录)")
            except json.JSONDecodeError as e:
                failed.append(f"  ✗ {src_name} - JSON格式错误: {e}")
            except Exception as e:
                failed.append(f"  ✗ {src_name} - 错误: {e}")
        else:
            failed.append(f"  ✗ {src_name} - 源文件不存在")
    
    # 输出结果
    print("\n" + "=" * 60)
    if synced:
        print("✅ 同步成功:")
        for msg in synced:
            print(msg)
    
    if failed:
        print("\n❌ 同步失败:")
        for msg in failed:
            print(msg)
    
    print("\n" + "=" * 60)
    print(f"总计: {len(synced)} 成功, {len(failed)} 失败")
    print("=" * 60)
    
    return len(failed) == 0

if __name__ == "__main__":
    success = sync_data()
    exit(0 if success else 1)
