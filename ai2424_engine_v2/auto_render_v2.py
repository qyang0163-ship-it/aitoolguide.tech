#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI2424 Video Engine v2.0 - "Visual Hammer + Golden 3 Seconds"
High-conversion short video production system
"""

import os
import sys

os.chdir(r'C:\Users\Administrator\Documents\aitoolguide-deploy\ai2424_engine_v2')
os.environ['IMAGEIO_FFMPEG_EXE'] = r'C:\Users\Administrator\AppData\Local\Programs\Python\Python312\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe'

from moviepy import *
import numpy as np

print("=" * 70)
print("AI2424 VIDEO ENGINE v2.0 - Visual Hammer + Golden 3 Seconds")
print("=" * 70)

# Check assets
assets = ['ai_assets_v1.png', 'premium_list_v1.png', 'clerk_v1.png', 
          'dns_v1.png', 'cta_v1.png', 'audio_v2.mp3', 'tech_bg.mp4']
print("\n[ASSET CHECK]")
for asset in assets:
    if os.path.exists(asset):
        size = os.path.getsize(asset)
        print(f"  {asset}: {size/1024:.1f} KB [OK]")
    else:
        print(f"  {asset}: MISSING!")
        sys.exit(1)

# Load audio
print("\n[AUDIO LOAD]")
audio = AudioFileClip('audio_v2.mp3')
audio_duration = audio.duration
print(f"  Duration: {audio_duration:.2f}s")

# Target: 15-18 seconds
if audio_duration > 18:
    audio = audio.subclipped(0, 18)
    audio_duration = 18
    print(f"  Trimmed to: {audio_duration}s")

# GOLDEN 3 SECONDS PACING
# Clip 1: 0-1s (Flash impact)
# Clip 2: 1-2s (Flash impact)  
# Clip 3: 2-6s (Slow pan)
# Clip 4: 6-10s (Slow pan)
# Clip 5: 10-end (CTA with subtitle)
clip_durations = [1.0, 1.0, 4.0, 4.0, audio_duration - 10.0]
print(f"\n[GOLDEN 3 SECONDS PACING]")
print(f"  Total: {sum(clip_durations):.1f}s")
print(f"  Clip 1 (Header): {clip_durations[0]}s - FAST ZOOM IN")
print(f"  Clip 2 (DNS): {clip_durations[1]}s - FAST ZOOM IN")
print(f"  Clip 3 (List): {clip_durations[2]}s - PAN RIGHT")
print(f"  Clip 4 (Clerk): {clip_durations[3]}s - PAN RIGHT")
print(f"  Clip 5 (CTA): {clip_durations[4]:.1f}s - SUBTITLES")

# Load background
print("\n[LOADING BACKGROUND]")
bg_video = VideoFileClip('tech_bg.mp4').subclipped(0, audio_duration)
bg_video = bg_video.resized((1080, 1920))
print(f"  Background loaded: {bg_video.duration}s")

# Prepare images
images = ['ai_assets_v1.png', 'dns_v1.png', 'premium_list_v1.png', 
          'clerk_v1.png', 'cta_v1.png']

print("\n[RENDERING CLIPS]")
clips = []

for i, (img_path, duration) in enumerate(zip(images, clip_durations)):
    print(f"\n  Clip {i+1}: {img_path} ({duration}s)")
    
    # Load and prepare image
    img = ImageClip(img_path, duration=duration)
    
    # Resize to card size (smaller than screen for floating effect)
    img = img.resized(height=1400)
    w, h = img.size
    
    # Add rounded corners effect (simulate with resize and position)
    if w > 900:
        img = img.resized(width=900)
        w, h = img.size
    
    # Apply motion based on clip type
    if i <= 1:  # GOLDEN 3 SECONDS - Fast zoom in
        print(f"    Motion: FAST ZOOM IN (1.3x)")
        def fast_zoom(t):
            return 1.0 + (0.3 * t / duration)  # 1.0 -> 1.3
        img = img.resized(fast_zoom)
        img = img.with_position('center')
        
    elif i <= 3:  # Middle clips - Pan right
        print(f"    Motion: PAN RIGHT")
        def pan_right(t):
            progress = t / duration
            x_offset = -100 * progress  # Move left (content moves right)
            return ('center', 'center')
        img = img.with_position(pan_right)
        
    else:  # CTA clip - Stable with pulse
        print(f"    Motion: STABLE + PULSE")
        def pulse(t):
            return 1.0 + 0.02 * np.sin(t * 3)  # Subtle breathing
        img = img.resized(pulse)
        img = img.with_position('center')
    
    # Composite with background
    composite = CompositeVideoClip([bg_video.subclipped(
        sum(clip_durations[:i]), 
        sum(clip_durations[:i+1])
    ), img], size=(1080, 1920))
    
    # Add FLASH transition at start (except first clip)
    if i > 0:
        print(f"    Transition: FLASH WHITE")
        flash = ColorClip(size=(1080, 1920), color=(255, 255, 255), duration=0.1)
        composite = concatenate_videoclips([flash, composite.subclipped(0.1, duration)])
        composite = composite.with_duration(duration)
    
    clips.append(composite)

# Concatenate all clips
print("\n[CONCATENATING]")
final_video = concatenate_videoclips(clips, method="compose")

# ADD SUBTITLES
print("\n[ADDING SUBTITLES]")

# Subtitle timing (approximate based on speech)
subtitles = [
    (0.0, 1.5, "别盯着免费GPT瞎聊了！"),
    (1.5, 3.5, "2026年，高手都在用"),
    (3.5, 5.5, "这100个隐藏AI工具搞钱"),
    (5.5, 8.0, "打开浏览器，直接敲这6个字："),
    (8.0, 11.0, "ai2424点com"),
    (11.0, 13.0, "支持16国语言"),
    (13.0, 15.0, "懂的赶快去领！"),
]

subtitle_clips = []
for start, end, text in subtitles:
    # Check if within video duration
    if start < final_video.duration:
        end = min(end, final_video.duration)
        duration = end - start
        
        # Special effect for domain name
        is_domain = "ai2424" in text
        font_size = 90 if is_domain else 70
        color = '#FFD700' if is_domain else '#FFFFFF'
        
        # Create subtitle
        sub = TextClip(
            text=text,
            font_size=font_size,
            color=color,
            stroke_color='black',
            stroke_width=4,
            size=(1000, None),
            text_align='center',
            duration=duration
        )
        
        # Position at bottom
        sub = sub.with_position(('center', 1600))
        sub = sub.with_start(start)
        
        subtitle_clips.append(sub)

# Add subtitles to video
final_video = CompositeVideoClip([final_video] + subtitle_clips, size=(1080, 1920))

# Add audio
print("\n[ADDING AUDIO]")
final_video = final_video.with_audio(audio)

# Export
output_path = 'ai2424_viral_v2.mp4'
print(f"\n[EXPORT]")
print(f"  File: {output_path}")
print(f"  Resolution: 1080x1920")
print(f"  Codec: libx264")
print(f"  Audio: aac")
print(f"  Bitrate: 5000k")
print(f"  FPS: 30")
print("\n  Rendering... (3-5 minutes)")

try:
    final_video.write_videofile(
        output_path,
        fps=30,
        codec='libx264',
        audio_codec='aac',
        audio_bitrate='192k',
        bitrate='5000k',
        threads=4,
        preset='medium',
        logger=None
    )
    
    # VALIDATION
    print("\n" + "=" * 70)
    print("VALIDATION")
    print("=" * 70)
    
    if os.path.exists(output_path):
        file_size = os.path.getsize(output_path)
        size_mb = file_size / 1024 / 1024
        
        print(f"  File size: {size_mb:.2f} MB")
        print(f"  Duration: {final_video.duration:.1f}s")
        
        checks = []
        
        # Check 1: Size >= 8MB
        if size_mb >= 8:
            print(f"  [PASS] Size >= 8MB")
            checks.append(True)
        else:
            print(f"  [FAIL] Size < 8MB")
            checks.append(False)
        
        # Check 2: Duration 15-20s
        if 15 <= final_video.duration <= 20:
            print(f"  [PASS] Duration 15-20s")
            checks.append(True)
        else:
            print(f"  [WARN] Duration outside 15-20s")
            checks.append(False)
        
        # Check 3: Golden 3 seconds
        print(f"  [INFO] Golden 3s: Fast cuts + Zoom impact")
        
        if all(checks):
            print(f"\n[RESULT] SUCCESS - VIRAL READY!")
            print(f"  Path: {os.path.abspath(output_path)}")
            print(f"  Ready for TikTok/抖音!")
        else:
            print(f"\n[RESULT] MARGINAL - Review needed")
            
    else:
        print("  [FAIL] Output file not created!")
        sys.exit(1)
        
except Exception as e:
    print(f"\n[ERROR] {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

# Cleanup
final_video.close()
audio.close()
bg_video.close()

print("\n" + "=" * 70)
print("RENDER COMPLETE")
print("=" * 70)
