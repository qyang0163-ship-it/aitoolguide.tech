#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI2424 Video Engine v2.1 - HIGH QUALITY VERSION
Higher bitrate for 8MB+ target
"""

import os
import sys

os.chdir(r'C:\Users\Administrator\Documents\aitoolguide-deploy\ai2424_engine_v2')
os.environ['IMAGEIO_FFMPEG_EXE'] = r'C:\Users\Administrator\AppData\Local\Programs\Python\Python312\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe'

from moviepy import *
import numpy as np

print("=" * 70)
print("AI2424 VIDEO ENGINE v2.1 - HIGH QUALITY (8MB+ TARGET)")
print("=" * 70)

# Load audio and extend to 15s
audio = AudioFileClip('audio_v2.mp3')
print(f"Audio: {audio.duration:.2f}s")

# Extend with silence to reach 15s
target_duration = 15.0
if audio.duration < target_duration:
    silence_duration = target_duration - audio.duration
    from moviepy.audio.AudioClip import AudioArrayClip
    import numpy as np
    silence = AudioArrayClip(np.zeros((int(silence_duration * 44100), 2)), fps=44100)
    audio = concatenate_audioclips([audio, silence])
    print(f"Extended to: {audio.duration:.2f}s")

# Load background
bg_video = VideoFileClip('tech_bg.mp4').subclipped(0, target_duration)
bg_video = bg_video.resized((1080, 1920))

# Clip durations (total 15s)
clip_durations = [1.0, 1.0, 4.0, 4.0, 5.0]  # Total 15s
images = ['ai_assets_v1.png', 'dns_v1.png', 'premium_list_v1.png', 
          'clerk_v1.png', 'cta_v1.png']

print("\n[RENDERING]")
clips = []

for i, (img_path, duration) in enumerate(zip(images, clip_durations)):
    print(f"Clip {i+1}: {img_path} ({duration}s)")
    
    img = ImageClip(img_path, duration=duration)
    img = img.resized(height=1400)
    
    # Motion effects
    if i <= 1:  # Fast zoom
        def zoom(t):
            return 1.0 + (0.3 * t / duration)
        img = img.resized(zoom)
    elif i <= 3:  # Pan
        def pan(t):
            return 1.0 + 0.1 * np.sin(t * 0.5)
        img = img.resized(pan)
    else:  # Pulse
        def pulse(t):
            return 1.0 + 0.02 * np.sin(t * 3)
        img = img.resized(pulse)
    
    img = img.with_position('center')
    
    # Composite
    bg_seg = bg_video.subclipped(sum(clip_durations[:i]), sum(clip_durations[:i+1]))
    composite = CompositeVideoClip([bg_seg, img], size=(1080, 1920))
    
    # Flash transition
    if i > 0:
        flash = ColorClip(size=(1080, 1920), color=(255, 255, 255), duration=0.08)
        composite = concatenate_videoclips([flash, composite.subclipped(0.08, duration)])
        composite = composite.with_duration(duration)
    
    clips.append(composite)

# Concatenate
final_video = concatenate_videoclips(clips, method="compose")

# Subtitles
subtitles = [
    (0.0, 1.5, "别盯着免费GPT瞎聊了！"),
    (1.5, 3.5, "2026年，高手都在用"),
    (3.5, 5.5, "这100个隐藏AI工具搞钱"),
    (5.5, 8.0, "打开浏览器，直接敲："),
    (8.0, 11.0, "ai2424点com"),
    (11.0, 15.0, "支持16国语言，懂的赶快去领！"),
]

subtitle_clips = []
for start, end, text in subtitles:
    if start < target_duration:
        end = min(end, target_duration)
        duration = end - start
        
        is_domain = "ai2424" in text
        font_size = 100 if is_domain else 75
        color = '#FFD700' if is_domain else '#FFFFFF'
        
        sub = TextClip(
            text=text,
            font_size=font_size,
            color=color,
            stroke_color='black',
            stroke_width=5,
            size=(1000, None),
            text_align='center',
            duration=duration
        ).with_position(('center', 1550)).with_start(start)
        
        subtitle_clips.append(sub)

final_video = CompositeVideoClip([final_video] + subtitle_clips, size=(1080, 1920))
final_video = final_video.with_audio(audio)

# Export with HIGH bitrate
output_path = 'ai2424_viral_final.mp4'
print(f"\n[EXPORT - HIGH QUALITY]")
print(f"Bitrate: 10000k (10Mbps)")

final_video.write_videofile(
    output_path,
    fps=30,
    codec='libx264',
    audio_codec='aac',
    audio_bitrate='256k',
    bitrate='10000k',  # 10Mbps for quality
    threads=4,
    preset='slow',
    logger=None
)

# Validation
print("\n" + "=" * 70)
print("VALIDATION")
print("=" * 70)

if os.path.exists(output_path):
    size_mb = os.path.getsize(output_path) / 1024 / 1024
    print(f"File: {output_path}")
    print(f"Size: {size_mb:.2f} MB")
    print(f"Duration: {final_video.duration:.1f}s")
    
    if size_mb >= 8:
        print("[PASS] Size >= 8MB")
    else:
        print("[WARN] Size < 8MB")
    
    if 15 <= final_video.duration <= 20:
        print("[PASS] Duration 15-20s")
    else:
        print("[WARN] Duration outside range")
    
    print(f"\nPath: {os.path.abspath(output_path)}")

final_video.close()
audio.close()
bg_video.close()

print("\nDONE!")
