#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI2424 Video Engine v4.0 - CINEMATIC CLOSE-UP
No subtitles, violent motion, 15MB+ target
"""

import os
import sys

os.chdir(r'C:\Users\Administrator\Documents\aitoolguide-deploy\ai2424_engine_v3')
os.environ['IMAGEIO_FFMPEG_EXE'] = r'C:\Users\Administrator\AppData\Local\Programs\Python\Python312\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe'

from moviepy import *
import numpy as np

print("=" * 70)
print("AI2424 VIDEO ENGINE v4.0 - CINEMATIC CLOSE-UP")
print("=" * 70)

# Load audio
audio = AudioFileClip('audio.mp3')
audio_duration = audio.duration
print(f"[AUDIO] {audio_duration:.2f}s")

# Extend to 18s for more content
target_duration = 18
if audio_duration < target_duration:
    from moviepy.audio.AudioClip import AudioArrayClip
    silence = AudioArrayClip(np.zeros((int((target_duration - audio_duration) * 44100), 2)), fps=44100)
    audio = concatenate_audioclips([audio, silence])
audio_duration = target_duration
print(f"Extended to: {audio_duration}s")

# Create animated noise background
print("[BACKGROUND] Creating noise texture...")
def make_noise_bg(t):
    frame = np.zeros((1920, 1080, 3), dtype=np.uint8)
    # Dark blue base
    frame[:, :] = [10, 15, 30]
    # Add noise
    noise = np.random.randint(0, 20, (1920, 1080, 3), dtype=np.uint8)
    frame = np.clip(frame + noise, 0, 255).astype(np.uint8)
    return frame

bg = VideoClip(make_noise_bg, duration=audio_duration).resized((1080, 1920))

# Images: 4 close-ups + 1 CTA
durations = [3.5, 3.5, 4.0, 4.0, 3.0]  # Total 18s
images = ['shot1_header.png', 'shot2_dns.png', 'shot3_signin.png', 'shot4_domains.png', 'shot5_cta.png']

print(f"\n[TIMING] Total: {sum(durations)}s")
print("[RENDERING]")

clips = []
for i, (img_path, dur) in enumerate(zip(images, durations)):
    print(f"Clip {i+1}: {img_path} ({dur}s)")
    
    # Load image and fill screen
    img = ImageClip(img_path, duration=dur)
    
    # Resize to fill width (no black bars)
    img = img.resized(width=1080)
    
    # If too tall, crop center
    w, h = img.size
    if h > 1920:
        y_center = h // 2
        img = img.cropped(x1=0, y1=y_center-960, x2=w, y2=y_center+960)
    
    # Center vertically
    img = img.with_position('center')
    
    # VIOLENT MOTION: Rapid zoom 1.0 -> 1.3
    def rapid_zoom(t):
        progress = t / dur
        # Fast zoom with slight ease-out
        scale = 1.0 + 0.3 * (progress ** 0.7)
        return scale
    
    img = img.resized(rapid_zoom)
    
    # Composite with background
    bg_seg = bg.subclipped(sum(durations[:i]), sum(durations[:i+1]))
    comp = CompositeVideoClip([bg_seg, img], size=(1080, 1920))
    
    clips.append(comp)

# Concatenate
final = concatenate_videoclips(clips)
final = final.with_audio(audio)

# Export with MAXIMUM quality for 15MB target
output = 'ai2424_cinematic_v4.mp4'
print(f"\n[EXPORT] Maximum quality...")
print(f"  Bitrate: 15000k (15Mbps)")
print(f"  Preset: slow")
print(f"  Target: 15MB+")

final.write_videofile(
    output,
    fps=30,
    codec='libx264',
    audio_codec='aac',
    audio_bitrate='320k',
    bitrate='15000k',  # 15Mbps for 15MB+ target
    threads=4,
    preset='slow',
    logger=None
)

# VALIDATION
print("\n" + "=" * 70)
print("VALIDATION")
print("=" * 70)

if os.path.exists(output):
    size_mb = os.path.getsize(output) / 1024 / 1024
    print(f"File: {output}")
    print(f"Size: {size_mb:.2f} MB")
    print(f"Duration: {final.duration:.1f}s")
    
    if size_mb >= 15:
        print("[PASS] Size >= 15MB")
        status = "SUCCESS"
    elif size_mb >= 10:
        print("[WARN] Size 10-15MB")
        status = "ACCEPTABLE"
    else:
        print("[FAIL] Size < 10MB")
        status = "FAILED"
    
    print(f"\n[{status}] {os.path.abspath(output)}")

final.close()
audio.close()
print("\nDONE!")
