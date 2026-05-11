#!/usr/bin/env python3
"""
SCIP MONITOR - 数据同步脚本
将 F:\mined_data\ 下的所有分类 JSON 复制到 src/data/ 目录
用于 Vercel 构建前的数据准备
"""

import os
import shutil
import json
from pathlib import Path

# 配置
SOURCE_DIR = Path("F:/mined_data")
TARGET_DIR = Path("./src/data")

def sync_data():
    """同步数据文件"""
    print("[SCIP SYNC] 开始数据同步...")
    
    # 确保目标目录存在
    TARGET_DIR.mkdir(parents=True, exist_ok=True)
    
    # 如果源目录不存在，创建示例数据
    if not SOURCE_DIR.exists():
        print(f"[SCIP SYNC] 警告: 源目录 {SOURCE_DIR} 不存在，创建示例数据...")
        create_sample_data()
        return
    
    # 遍历源目录
    copied = 0
    for json_file in SOURCE_DIR.rglob("*.json"):
        # 计算相对路径
        rel_path = json_file.relative_to(SOURCE_DIR)
        target_file = TARGET_DIR / rel_path
        
        # 确保子目录存在
        target_file.parent.mkdir(parents=True, exist_ok=True)
        
        # 复制文件
        shutil.copy2(json_file, target_file)
        copied += 1
        print(f"[SCIP SYNC] 已复制: {rel_path}")
    
    print(f"[SCIP SYNC] 同步完成，共复制 {copied} 个文件")

def create_sample_data():
    """创建示例数据（当源目录不存在时）"""
    
    # 芯片数据
    chips = [
        {"id": "stm32f103c8t6", "name": "APM32F103C8T6", "manufacturer": "极海半导体", "originalEquivalent": "STM32F103C8T6", "category": "MCU", "price": "¥2.35", "substituteLevel": "pin2pin"},
        {"id": "stm32f407vet6", "name": "AT32F407VET6", "manufacturer": "雅特力", "originalEquivalent": "STM32F407VET6", "category": "MCU", "price": "¥5.80", "substituteLevel": "pin2pin"},
        {"id": "ascend-910b", "name": "昇腾910B", "manufacturer": "华为海思", "originalEquivalent": "NVIDIA A100", "category": "AI芯片", "price": "¥85,000", "substituteLevel": "functional"},
    ]
    
    # 设备数据
    equipment = [
        {"id": "naura-nmc508", "name": "北方华创 NMC508 刻蚀机", "manufacturer": "北方华创", "category": "刻蚀设备", "price": "¥2,800万", "status": "量产"},
        {"id": "amec-ccp", "name": "中微 CCP 刻蚀机", "manufacturer": "中微公司", "category": "刻蚀设备", "price": "¥3,200万", "status": "量产"},
    ]
    
    # 材料数据
    materials = [
        {"id": "nata-arf", "name": "南大光电 ArF 光刻胶", "manufacturer": "南大光电", "category": "光刻胶", "price": "¥12,000/L", "status": "量产"},
        {"id": "jsmc-wafer", "name": "沪硅产业 12寸硅片", "manufacturer": "沪硅产业", "category": "硅片", "price": "¥3,500/片", "status": "量产"},
    ]
    
    # 企业数据
    enterprises = [
        {"id": "naura", "name": "北方华创", "category": "设备制造", "status": "监控中", "risk": "高", "revenue": "¥146亿"},
        {"id": "smic", "name": "中芯国际", "category": "晶圆代工", "status": "受限", "risk": "极高", "revenue": "¥452亿"},
    ]
    
    # 政策数据
    policies = [
        {"id": "bis-2024-001", "title": "BIS 新增 14 家中国实体至实体清单", "source": "BIS联邦公报", "date": "2024-12-02", "type": "实体清单", "severity": "critical"},
        {"id": "bis-2024-002", "title": "更新先进计算芯片出口管制规则", "source": "BIS联邦公报", "date": "2024-10-17", "type": "出口管制", "severity": "high"},
    ]
    
    # 写入文件
    (TARGET_DIR / "chips.json").write_text(json.dumps(chips, ensure_ascii=False, indent=2), encoding='utf-8')
    (TARGET_DIR / "equipment.json").write_text(json.dumps(equipment, ensure_ascii=False, indent=2), encoding='utf-8')
    (TARGET_DIR / "materials.json").write_text(json.dumps(materials, ensure_ascii=False, indent=2), encoding='utf-8')
    (TARGET_DIR / "enterprises.json").write_text(json.dumps(enterprises, ensure_ascii=False, indent=2), encoding='utf-8')
    (TARGET_DIR / "policies.json").write_text(json.dumps(policies, ensure_ascii=False, indent=2), encoding='utf-8')
    
    print("[SCIP SYNC] 已创建示例数据文件")

if __name__ == "__main__":
    sync_data()