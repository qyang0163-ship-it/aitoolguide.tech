#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI2424 Promo Video Generator
Task 2: Voice Synthesis
"""

import subprocess
import os

# Change to script directory
os.chdir(r'C:\Users\Administrator\Documents\aitoolguide-deploy\video_gen')

# Voice script
script = """别再天天盯着免费的 ChatGPT 瞎聊了，根本赚不到钱！2026年，真正的高手都在利用这100个隐藏的AI工具接私活拿美金。我把全球最赚钱的100个AI工具和保姆级变现教程，全部整理好放在了一个极密导航站里。打开浏览器，直接敲这6个字：a i 2 4 2 4 点 com。名额有限，懂的赶紧去领！"""

# Save script to file
with open('script.txt', 'w', encoding='utf-8') as f:
    f.write(script)

print("Script saved to script.txt")
print(f"Script length: {len(script)} characters")

# Generate voice using edge-tts
# Using zh-CN-YunxiNeural (Male, Lively, Sunshine) for excited tone
cmd = [
    'edge-tts',
    '--voice', 'zh-CN-YunxiNeural',
    '--file', 'script.txt',
    '--write-media', 'voice.mp3',
    '--write-subtitles', 'voice.srt'
]

print("\nGenerating voice...")
print(f"Command: {' '.join(cmd)}")

result = subprocess.run(cmd, capture_output=True, text=True)

if result.returncode == 0:
    print("✅ Voice generated successfully!")
    # Check file size
    if os.path.exists('voice.mp3'):
        size = os.path.getsize('voice.mp3')
        print(f"File: voice.mp3 ({size} bytes)")
else:
    print(f"❌ Error: {result.stderr}")
    exit(1)
