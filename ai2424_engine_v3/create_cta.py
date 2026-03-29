#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate CTA image with golden text on black background
"""

from PIL import Image, ImageDraw, ImageFont
import os

os.chdir(r'C:\Users\Administrator\Documents\aitoolguide-deploy\ai2424_engine_v3')

# Create black background
img = Image.new('RGB', (1080, 1920), color='#000000')
draw = ImageDraw.Draw(img)

# Try to use a bold font, fallback to default
try:
    # Try system fonts
    font_large = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 140)
    font_small = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 60)
except:
    font_large = ImageFont.load_default()
    font_small = ImageFont.load_default()

# Draw golden text with glow effect
# Main domain text
text = "ai2424.com"

# Get text size
bbox = draw.textbbox((0, 0), text, font=font_large)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]

x = (1080 - text_width) // 2
y = (1920 - text_height) // 2 - 100

# Draw glow (multiple layers)
for offset in range(20, 0, -4):
    alpha = int(255 * (20 - offset) / 20 * 0.3)
    glow_color = (255, 215, 0)  # Gold
    draw.text((x, y), text, font=font_large, fill=glow_color)

# Draw main text in bright gold
draw.text((x, y), text, font=font_large, fill='#FFD700')

# Draw subtitle
sub = "100个AI工具搞钱秘籍"
bbox2 = draw.textbbox((0, 0), sub, font=font_small)
sub_width = bbox2[2] - bbox2[0]
x2 = (1080 - sub_width) // 2
draw.text((x2, y + 200), sub, font=font_small, fill='#FFFFFF')

# Draw CTA
cta = "立即访问"
bbox3 = draw.textbbox((0, 0), cta, font=font_small)
cta_width = bbox3[2] - bbox3[0]
x3 = (1080 - cta_width) // 2
draw.text((x3, y + 350), cta, font=font_small, fill='#00FF88')

# Save
img.save('shot5_cta.png')
print(f"Created: shot5_cta.png ({os.path.getsize('shot5_cta.png')/1024:.1f} KB)")
