#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI2424 Video Engine v3.1 - Simplified Cinematic Design
"""

import os
import sys

os.chdir(r'C:\Users\Administrator\Documents\aitoolguide-deploy\ai2424_engine_v2')
os.environ['IMAGEIO_FFMPEG_EXE'] = r'C:\Users\Administrator\AppData\Local\Programs\Python\Python312\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe'

from moviepy import *
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

print("=" * 70)
print("AI2424 VIDEO ENGINE v3.1 - CINEMATIC")
print("=" * 70)

# Load audio
audio = AudioFileClip('audio_v2.mp3')
audio_duration = audio.duration
print(f"[AUDIO] {audio_duration:.2f}s")

# Extend to 15s
if audio_duration < 15:
    from moviepy.audio.AudioClip import AudioArrayClip
    silence = AudioArrayClip(np.zeros((int((15 - audio_duration) * 44100), 2)), fps=44100)
    audio = concatenate_audioclips([audio, silence])
audio_duration = 15

# Create gradient background
def make_bg(t):
    frame = np.zeros((1920, 1080, 3), dtype=np.uint8)
    for y in range(1920):
        progress = y / 1920
        r = int(15 + 15 * progress)
        g = int(23 + 18 * progress)
        b = int(42 + 17 * progress)
        frame[y, :] = [r, g, b]
    return frame

bg = VideoClip(make_bg, duration=audio_duration).resized((1080, 1920))

# Prepare rounded cards
def make_card(img_path):
    img = Image.open(img_path).convert("RGBA")
    target_width = 920
    ratio = target_width / img.width
    img = img.resize((target_width, int(img.height * ratio)))
    
    # Rounded corners
    mask = Image.new('L', img.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, img.width, img.height], radius=20, fill=255)
    img.putalpha(mask)
    
    # Shadow
    shadow = Image.new('RGBA', (img.width + 40, img.height + 40), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle([20, 20, 20+img.width, 20+img.height], radius=20, fill=(0, 0, 0, 100))
    shadow = shadow.filter(ImageFilter.GaussianBlur(10))
    shadow.paste(img, (20, 20), img)
    
    temp = img_path.replace('.png', '_card.png')
    shadow.save(temp)
    return temp

print("[CARDS]")
cards = [make_card(f) for f in ['ai_assets_v1.png', 'dns_v1.png', 'premium_list_v1.png', 'clerk_v1.png', 'cta_v1.png']]

# Clip durations: 1.5 + 1.5 + 4 + 4 + 4 = 15s
durations = [1.5, 1.5, 4.0, 4.0, 4.0]
print(f"[TIMING] Total: {sum(durations)}s")

# Render clips
clips = []
for i, (card_path, dur) in enumerate(zip(cards, durations)):
    print(f"Clip {i+1}: {dur}s")
    
    card = ImageClip(card_path, duration=dur).with_position('center')
    
    # Slow zoom
    def zoom(t):
        return 1.0 + 0.15 * (t / dur)
    card = card.resized(zoom)
    
    # Composite
    bg_seg = bg.subclipped(sum(durations[:i]), sum(durations[:i+1]))
    comp = CompositeVideoClip([bg_seg, card], size=(1080, 1920))
    clips.append(comp)

final = concatenate_videoclips(clips)

# Subtitles
subs = [
    (0, 1.8, "别盯着免费GPT瞎聊了！"),
    (1.8, 4, "2026年，高手都在用"),
    (4, 6.5, "这100个隐藏AI工具搞钱"),
    (6.5, 9, "打开浏览器，直接敲："),
    (9, 12, "ai2424.com"),
    (12, 15, "支持16国语言，懂的赶快去领！"),
]

sub_clips = []
for start, end, text in subs:
    is_domain = "ai2424" in text
    size = 90 if is_domain else 68
    color = '#FFD700' if is_domain else '#FFFFFF'
    
    sub = TextClip(text=text, font_size=size, color=color, 
                   stroke_color='black', stroke_width=4,
                   size=(1000, None), text_align='center',
                   duration=end-start).with_position(('center', 1450)).with_start(start)
    sub_clips.append(sub)

final = CompositeVideoClip([final] + sub_clips, size=(1080, 1920))
final = final.with_audio(audio)

# Export
print("\n[EXPORT]")
final.write_videofile('ai2424_final_v3.mp4', fps=30, codec='libx264', 
                      audio_codec='aac', bitrate='8000k', preset='slow', logger=None)

# Validate
size = os.path.getsize('ai2424_final_v3.mp4') / 1024 / 1024
print(f"\n[RESULT] {size:.2f} MB")
print(f"Path: {os.path.abspath('ai2424_final_v3.mp4')}")

# Cleanup
for c in cards:
    os.remove(c)

final.close()
audio.close()
print("DONE!")
