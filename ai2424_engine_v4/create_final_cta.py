#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate pure image CTA - no text rendering in code
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

os.chdir(r'C:\Users\Administrator\Documents\aitoolguide-deploy\ai2424_engine_v4')

# Create 1080x1920 black background
img = Image.new('RGB', (1080, 1920), color='#000000')
draw = ImageDraw.Draw(img)

# Use Arial Bold
try:
    font_big = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 180)
    font_mid = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 80)
    font_small = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 50)
except:
    font_big = ImageFont.load_default()
    font_mid = ImageFont.load_default()
    font_small = ImageFont.load_default()

# Draw golden glow effect for domain
text = "ai2424.com"

# Get size
bbox = draw.textbbox((0, 0), text, font=font_big)
tw = bbox[2] - bbox[0]
th = bbox[3] - bbox[1]

x = (1080 - tw) // 2
y = 700

# Multiple glow layers
for i in range(10, 0, -2):
    glow = Image.new('RGBA', (1080, 1920), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    offset = i * 2
    alpha = int(50 - i * 4)
    gdraw.text((x, y), text, font=font_big, fill=(255, 215, 0, alpha))
    # Blur and paste
    glow = glow.filter(ImageFilter.GaussianBlur(radius=i))
    img = Image.alpha_composite(img.convert('RGBA'), glow).convert('RGB')
    draw = ImageDraw.Draw(img)

# Main gold text
draw.text((x, y), text, font=font_big, fill='#FFD700')

# Subtitle
sub = "100 AI TOOLS"
bbox2 = draw.textbbox((0, 0), sub, font=font_mid)
x2 = (1080 - (bbox2[2] - bbox2[0])) // 2
draw.text((x2, y + 250), sub, font=font_mid, fill='#FFFFFF')

# CTA
cta = "VISIT NOW"
bbox3 = draw.textbbox((0, 0), cta, font=font_small)
x3 = (1080 - (bbox3[2] - bbox3[0])) // 2
draw.text((x3, y + 400), cta, font=font_small, fill='#00FF88')

# Save
img.save('final_cta.png')
print(f"Created: final_cta.png ({os.path.getsize('final_cta.png')/1024:.1f} KB)")
