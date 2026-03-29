#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI2424 Video Engine - Industrial Grade Rendering
Static image sequence + breathing animation + high quality export
"""

import os
import sys

os.chdir(r'C:\Users\Administrator\Documents\aitoolguide-deploy\ai2424_engine')

# Force FFmpeg
os.environ['IMAGEIO_FFMPEG_EXE'] = r'C:\Users\Administrator\AppData\Local\Programs\Python\Python312\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe'

from moviepy import *
import numpy as np

print("=" * 60)
print("AI2424 Video Engine v1.0")
print("=" * 60)

# Check assets
assets = ['ai_assets_v1.png', 'premium_list_v1.png', 'clerk_v1.png', 'dns_v1.png', 'cta_v1.png', 'audio.mp3']
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
audio = AudioFileClip('audio.mp3')
audio_duration = audio.duration
print(f"  Duration: {audio_duration:.2f}s")

# Target duration
target_duration = min(25, audio_duration)
if audio_duration > target_duration:
    audio = audio.subclipped(0, target_duration)
    print(f"  Trimmed to: {target_duration}s")

# Calculate clip durations (5 clips, total = target_duration)
clip_durations = [5, 5, 5, 5, 5]  # 5 clips x 5s = 25s
if sum(clip_durations) > target_duration:
    # Adjust last clip
    clip_durations[-1] = target_duration - sum(clip_durations[:-1])

print(f"\n[CLIP PLAN]")
print(f"  Total: {sum(clip_durations):.1f}s")
for i, d in enumerate(clip_durations):
    print(f"  Clip {i+1}: {d:.1f}s")

# Create clips with breathing animation
print("\n[RENDERING CLIPS]")

clips = []
images = ['ai_assets_v1.png', 'premium_list_v1.png', 'clerk_v1.png', 'dns_v1.png', 'cta_v1.png']

for i, (img_path, duration) in enumerate(zip(images, clip_durations)):
    print(f"  Clip {i+1}: {img_path} ({duration}s)")
    
    # Load image
    img_clip = ImageClip(img_path, duration=duration)
    
    # Resize to vertical 1080x1920
    img_clip = img_clip.resized(height=1920)
    
    # Center crop to 1080 width
    w, h = img_clip.size
    if w > 1080:
        x_center = w // 2
        img_clip = img_clip.cropped(x1=x_center-540, y1=0, x2=x_center+540, y2=h)
    
    # Breathing animation: subtle zoom from 1.0 to 1.08
    def breathe(t):
        progress = t / duration
        scale = 1.0 + (0.08 * progress)
        return scale
    
    img_clip = img_clip.resized(breathe)
    
    # Add CTA text on last clip
    if i == 4:  # Last clip
        cta_text = TextClip(
            text="ai2424.com",
            font_size=100,
            color='#FFD700',
            stroke_color='#FF8C00',
            stroke_width=3,
            duration=duration
        )
        cta_text = cta_text.with_position(('center', 1400))
        img_clip = CompositeVideoClip([img_clip, cta_text])
    
    clips.append(img_clip)

# Concatenate
print("\n[CONCATENATING]")
final_video = concatenate_videoclips(clips, method="compose")
final_video = final_video.with_audio(audio)

# Export settings
output_path = 'ai2424_final_video.mp4'
print(f"\n[EXPORT]")
print(f"  File: {output_path}")
print(f"  Resolution: 1080x1920")
print(f"  Codec: libx264")
print(f"  Audio: aac")
print(f"  Bitrate: 8000k")
print(f"  FPS: 30")
print("\n  Rendering... (this takes 2-3 minutes)")

try:
    final_video.write_videofile(
        output_path,
        fps=30,
        codec='libx264',
        audio_codec='aac',
        audio_bitrate='192k',
        bitrate='8000k',
        threads=4,
        preset='medium',
        logger=None
    )
    
    # Validate output
    print("\n[VALIDATION]")
    if os.path.exists(output_path):
        file_size = os.path.getsize(output_path)
        size_mb = file_size / 1024 / 1024
        
        print(f"  File size: {size_mb:.2f} MB")
        
        if size_mb >= 10:
            print("  [PASS] File size >= 10MB")
            status = "SUCCESS"
        elif size_mb >= 5:
            print("  [WARN] File size 5-10MB")
            status = "ACCEPTABLE"
        elif size_mb >= 1:
            print("  [WARN] File size 1-5MB")
            status = "MARGINAL"
        else:
            print("  [FAIL] File size < 1MB - Likely corrupted!")
            status = "FAILED"
            
        if status in ["SUCCESS", "ACCEPTABLE"]:
            print(f"\n[RESULT]")
            print(f"  Status: {status}")
            print(f"  Path: {os.path.abspath(output_path)}")
            print(f"  Size: {size_mb:.2f} MB")
            print(f"  Ready for TikTok!")
        else:
            print(f"\n[ERROR] Rendering failed - file too small")
            sys.exit(1)
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

print("\n" + "=" * 60)
print("RENDER COMPLETE")
print("=" * 60)
