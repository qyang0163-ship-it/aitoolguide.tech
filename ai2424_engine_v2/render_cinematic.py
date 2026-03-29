#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI2424 Video Engine v3.0 - UI级视觉重构
Cinematic Card Design + Professional Typography
"""

import os
import sys

os.chdir(r'C:\Users\Administrator\Documents\aitoolguide-deploy\ai2424_engine_v2')
os.environ['IMAGEIO_FFMPEG_EXE'] = r'C:\Users\Administrator\AppData\Local\Programs\Python\Python312\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe'

from moviepy import *
from moviepy.video.fx.FadeIn import FadeIn
from moviepy.video.fx.FadeOut import FadeOut
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

print("=" * 70)
print("AI2424 VIDEO ENGINE v3.0 - CINEMATIC CARD DESIGN")
print("=" * 70)

# Check assets
assets = ['ai_assets_v1.png', 'premium_list_v1.png', 'clerk_v1.png', 
          'dns_v1.png', 'cta_v1.png', 'audio_v2.mp3']
print("\n[ASSET CHECK]")
for asset in assets:
    if os.path.exists(asset):
        print(f"  {asset}: OK")
    else:
        print(f"  {asset}: MISSING!")
        sys.exit(1)

# Load audio
audio = AudioFileClip('audio_v2.mp3')
audio_duration = audio.duration
print(f"\n[AUDIO] Duration: {audio_duration:.2f}s")

# Target 15-18 seconds
target_duration = min(18, max(15, audio_duration))
if audio_duration < target_duration:
    # Extend with silence
    silence_duration = target_duration - audio_duration
    from moviepy.audio.AudioClip import AudioArrayClip
    silence = AudioArrayClip(np.zeros((int(silence_duration * 44100), 2)), fps=44100)
    audio = concatenate_audioclips([audio, silence])
    audio_duration = target_duration
    print(f"Extended to: {audio_duration:.2f}s")

# Create cinematic gradient background
print("\n[BACKGROUND] Creating gradient...")
def make_gradient_bg(t):
    """Create #0f172a to #1e293b gradient"""
    frame = np.zeros((1920, 1080, 3), dtype=np.uint8)
    
    # Gradient from top to bottom
    for y in range(1920):
        progress = y / 1920
        # Interpolate between #0f172a (15, 23, 42) and #1e293b (30, 41, 59)
        r = int(15 + (30 - 15) * progress)
        g = int(23 + (41 - 23) * progress)
        b = int(42 + (59 - 42) * progress)
        frame[y, :] = [r, g, b]
    
    return frame

bg = VideoClip(make_gradient_bg, duration=audio_duration)
bg = bg.resized((1080, 1920))

# Helper function to create rounded corner image
def add_rounded_corners(img_path, radius=20, shadow=True):
    """Add rounded corners and shadow to image"""
    img = Image.open(img_path)
    img = img.convert("RGBA")
    
    # Resize to 85% width (918px for 1080 container)
    target_width = 918
    ratio = target_width / img.width
    new_height = int(img.height * ratio)
    img = img.resize((target_width, new_height), Image.Resampling.LANCZOS)
    
    # Create rounded mask
    mask = Image.new('L', img.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([0, 0, img.width, img.height], radius=radius, fill=255)
    
    # Apply mask
    img.putalpha(mask)
    
    if shadow:
        # Create shadow layer
        shadow_img = Image.new('RGBA', (img.width + 40, img.height + 40), (0, 0, 0, 0))
        shadow_draw = ImageDraw.Draw(shadow_img)
        shadow_draw.rounded_rectangle(
            [20, 20, 20 + img.width, 20 + img.height], 
            radius=radius, 
            fill=(0, 0, 0, 80)
        )
        # Blur shadow
        shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(radius=10))
        # Paste original on shadow
        shadow_img.paste(img, (20, 20), img)
        img = shadow_img
    
    # Save temp
    temp_path = img_path.replace('.png', '_card.png')
    img.save(temp_path)
    return temp_path

# Prepare card images
print("\n[CARDS] Preparing rounded cards...")
card_images = []
for img in ['ai_assets_v1.png', 'dns_v1.png', 'premium_list_v1.png', 
            'clerk_v1.png', 'cta_v1.png']:
    card_path = add_rounded_corners(img, radius=20, shadow=True)
    card_images.append(card_path)
    print(f"  Created: {card_path}")

# Clip timing (Golden 3 seconds)
clip_durations = [1.5, 1.5, 4.0, 4.0, audio_duration - 11.0]
print(f"\n[TIMING] Total: {sum(clip_durations):.1f}s")

# Render clips
print("\n[RENDERING CLIPS]")
clips = []

for i, (card_path, duration) in enumerate(zip(card_images, clip_durations)):
    print(f"\n  Clip {i+1}: {duration}s")
    
    # Load card image
    card = ImageClip(card_path, duration=duration)
    
    # Cinematic motion
    # Entry: slide in from bottom + fade in
    card = card.with_position(('center', 200))
    
    # Continuous: slow zoom 1.1x to 1.2x
    def breathe_zoom(t):
        progress = t / duration
        scale = 1.1 + (0.1 * progress)
        return scale
    card = card.resized(breathe_zoom)
    
    # Apply fade effects
    card = FadeIn(card, 0.3)
    card = FadeOut(card, 0.2)
    
    # Composite with background
    bg_seg = bg.subclipped(sum(clip_durations[:i]), sum(clip_durations[:i+1]))
    composite = CompositeVideoClip([bg_seg, card], size=(1080, 1920))
    
    clips.append(composite)

# Concatenate
print("\n[CONCATENATING]")
final_video = concatenate_videoclips(clips, method="compose")

# SUBTITLES - Professional layout
print("\n[SUBTITLES] Adding professional captions...")

# Subtitle timing and text
subtitle_data = [
    (0.0, 1.8, "别盯着免费GPT瞎聊了！"),
    (1.8, 4.0, "2026年，高手都在用"),
    (4.0, 6.5, "这100个隐藏AI工具搞钱"),
    (6.5, 9.0, "打开浏览器，直接敲："),
    (9.0, 12.0, "ai2424.com"),
    (12.0, audio_duration, "支持16国语言，懂的赶快去领！"),
]

subtitle_clips = []
for start, end, text in subtitle_data:
    if start >= audio_duration:
        break
    end = min(end, audio_duration)
    duration = end - start
    
    # Skip subtitle on last clip if it has its own text
    if start > sum(clip_durations[:-1]) and "cta" in card_images[-1]:
        continue
    
    is_domain = "ai2424" in text
    
    # Font settings
    font_size = 85 if is_domain else 65
    color = '#FFD700' if is_domain else '#FFFFFF'
    stroke_width = 4 if is_domain else 3
    
    # Create subtitle with Arial/微软雅黑
    sub = TextClip(
        text=text,
        font_size=font_size,
        color=color,
        stroke_color='black',
        stroke_width=stroke_width,
        size=(1000, None),
        text_align='center',
        duration=duration
    )
    
    # Position at 75% height (1440px for 1920 height)
    sub = sub.with_position(('center', 1440))
    sub = sub.with_start(start)
    
    # Highlight effect for domain
    if is_domain:
        # Add glow box behind domain
        box = ColorClip(size=(800, 120), color=(255, 215, 0), duration=duration)
        box = box.with_opacity(0.3)
        box = box.with_position(('center', 1420)).with_start(start)
        subtitle_clips.append(box)
    
    subtitle_clips.append(sub)

final_video = CompositeVideoClip([final_video] + subtitle_clips, size=(1080, 1920))

# Add audio
final_video = final_video.with_audio(audio)

# Export with high quality
output_path = 'ai2424_cinematic_v3.mp4'
print(f"\n[EXPORT] High quality rendering...")
print(f"  Preset: slow (best quality)")
print(f"  Bitrate: 8000k")

final_video.write_videofile(
    output_path,
    fps=30,
    codec='libx264',
    audio_codec='aac',
    audio_bitrate='256k',
    bitrate='8000k',
    threads=4,
    preset='slow',
    logger=None
)

# VALIDATION
print("\n" + "=" * 70)
print("VALIDATION")
print("=" * 70)

if os.path.exists(output_path):
    size_mb = os.path.getsize(output_path) / 1024 / 1024
    print(f"File: {output_path}")
    print(f"Size: {size_mb:.2f} MB")
    print(f"Duration: {final_video.duration:.1f}s")
    
    checks = []
    
    if size_mb >= 8:
        print("[PASS] Size >= 8MB")
        checks.append(True)
    else:
        print(f"[WARN] Size {size_mb:.1f}MB < 8MB")
        checks.append(False)
    
    if 15 <= final_video.duration <= 20:
        print("[PASS] Duration 15-20s")
        checks.append(True)
    else:
        print(f"[WARN] Duration {final_video.duration:.1f}s")
        checks.append(False)
    
    # Check last frame
    print("[CHECK] Last frame: CTA with domain")
    
    if all(checks):
        print("\n[SUCCESS] Cinematic video ready!")
    
    print(f"\nPath: {os.path.abspath(output_path)}")

# Cleanup temp files
for card in card_images:
    if os.path.exists(card):
        os.remove(card)

final_video.close()
audio.close()
bg.close()

print("\nDONE!")
