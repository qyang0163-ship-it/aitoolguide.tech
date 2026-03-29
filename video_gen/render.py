#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI2424 Promo Video Generator
Task 3: Video Rendering with MoviePy v2.0
Simplified version using gradient backgrounds + text animations
"""

import os
os.chdir(r'C:\Users\Administrator\Documents\aitoolguide-deploy\video_gen')

# Check if voice.mp3 exists
if not os.path.exists('voice.mp3'):
    print("ERROR: voice.mp3 not found!")
    exit(1)

print("voice.mp3 found!")

# Import moviepy v2.0
from moviepy import *
print("MoviePy imported successfully!")

# Get audio duration
audio = AudioFileClip('voice.mp3')
audio_duration = audio.duration
print(f"Audio duration: {audio_duration:.2f} seconds")

# Target duration: 30 seconds
target_duration = 28.5  # Match audio

# If audio is longer, trim it
if audio_duration > target_duration:
    audio = audio.subclipped(0, target_duration)
    audio_duration = target_duration
    print(f"Audio trimmed to {target_duration} seconds")

# Create video clips
print("\nCreating video clips...")

# Clip 1: Opening hook (0-5s) - Black background with attention text
clip1_duration = 5
clip1 = ColorClip(size=(1080, 1920), color=(10, 10, 10), duration=clip1_duration)

text1 = TextClip(
    text="2026年\nAI搞钱秘籍",
    font_size=120,
    color='white',
    size=(900, None),
    text_align='center',
    duration=clip1_duration
)
text1 = text1.with_position('center')

# Add red accent text
text1_sub = TextClip(
    text="别再瞎聊ChatGPT了！",
    font_size=60,
    color='#FF4444',
    size=(900, None),
    duration=clip1_duration
)
text1_sub = text1_sub.with_position(('center', 1300))

clip1 = CompositeVideoClip([clip1, text1, text1_sub])

# Clip 2: Problem + Solution (5-15s) - Dark gradient
clip2_duration = 10
clip2 = ColorClip(size=(1080, 1920), color=(20, 20, 30), duration=clip2_duration)

text2_1 = TextClip(
    text="免费ChatGPT\n赚不到钱？",
    font_size=100,
    color='#FF6666',
    size=(900, None),
    duration=5
)
text2_1 = text2_1.with_position('center')

text2_2 = TextClip(
    text="100个隐藏AI工具\n正在偷偷发财",
    font_size=90,
    color='#44FF88',
    size=(900, None),
    duration=5
)
text2_2 = text2_2.with_position('center').with_start(5)

clip2 = CompositeVideoClip([clip2, text2_1, text2_2])

# Clip 3: Value proposition (15-25s) - Purple gradient
clip3_duration = 10
clip3 = ColorClip(size=(1080, 1920), color=(40, 30, 60), duration=clip3_duration)

text3 = TextClip(
    text="全球最赚钱的AI工具\n+ 保姆级变现教程\n+ 私活接单渠道",
    font_size=80,
    color='white',
    size=(950, None),
    text_align='center',
    duration=clip3_duration
)
text3 = text3.with_position('center')

clip3 = CompositeVideoClip([clip3, text3])

# Clip 4: CTA with glowing text (25-30s) - Black with yellow glow
clip4_duration = 8.5
clip4 = ColorClip(size=(1080, 1920), color=(5, 5, 5), duration=clip4_duration)

# Main CTA text with glow effect
text4_main = TextClip(
    text="直接访问",
    font_size=80,
    color='#FFD700',
    duration=clip4_duration
)
text4_main = text4_main.with_position(('center', 750))

# Domain name - BIG and glowing
text4_domain = TextClip(
    text="ai2424.com",
    font_size=140,
    color='#FFD700',
    duration=clip4_duration
)
text4_domain = text4_domain.with_position(('center', 950))

# Subtitle
text4_sub = TextClip(
    text="名额有限，懂的赶紧去领！",
    font_size=50,
    color='#AAAAAA',
    duration=clip4_duration
)
text4_sub = text4_sub.with_position(('center', 1250))

clip4 = CompositeVideoClip([clip4, text4_main, text4_domain, text4_sub])

# Concatenate all clips
print("\nConcatenating clips...")
final_video = concatenate_videoclips([clip1, clip2, clip3, clip4], method="compose")

# Add audio
print("Adding audio...")
final_video = final_video.with_audio(audio)

# Export
output_path = 'ai2424_promo_final.mp4'
print(f"\nExporting to {output_path}...")
print("This may take 2-3 minutes...")

final_video.write_videofile(
    output_path,
    fps=30,
    codec='libx264',
    audio_codec='aac',
    temp_audiofile='temp-audio.m4a',
    remove_temp=True,
    threads=4,
    preset='medium'
)

print(f"\nVideo exported successfully!")
print(f"File: {os.path.abspath(output_path)}")
print(f"Size: {os.path.getsize(output_path) / 1024 / 1024:.2f} MB")

# Cleanup
final_video.close()
audio.close()
