#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Create tech background video with animated particles/grid
"""

import os
os.chdir(r'C:\Users\Administrator\Documents\aitoolguide-deploy\ai2424_engine_v2')

from moviepy import *
import numpy as np

print("Creating tech background video...")

# Create animated tech background
duration = 20  # 20 seconds loop
fps = 30

# Generate frames with moving grid/particles effect
def make_frame(t):
    # Create dark blue/black gradient background
    frame = np.zeros((1920, 1080, 3), dtype=np.uint8)
    
    # Dark gradient from top to bottom
    for y in range(1920):
        intensity = int(10 + (y / 1920) * 20)  # 10-30 range
        frame[y, :] = [intensity//3, intensity//2, intensity]  # Blue tint
    
    # Add moving grid lines
    grid_spacing = 100
    speed = 50  # pixels per second
    offset = int((t * speed) % grid_spacing)
    
    # Horizontal lines
    for y in range(offset, 1920, grid_spacing):
        if y < 1920:
            frame[y:y+2, :] = np.clip(frame[y:y+2, :] + 30, 0, 255)
    
    # Vertical lines
    for x in range(0, 1080, grid_spacing):
        frame[:, x:x+2] = np.clip(frame[:, x:x+2] + 20, 0, 255)
    
    # Add some "particles" (bright dots)
    np.random.seed(42)  # Consistent pattern
    num_particles = 50
    for i in range(num_particles):
        px = int((np.random.randint(0, 1080) + t * 30) % 1080)
        py = int((np.random.randint(0, 1920) + t * 20) % 1920)
        size = np.random.randint(2, 5)
        brightness = np.random.randint(100, 200)
        
        # Draw particle
        y_start = max(0, py - size)
        y_end = min(1920, py + size + 1)
        x_start = max(0, px - size)
        x_end = min(1080, px + size + 1)
        
        frame[y_start:y_end, x_start:x_end] = [brightness//4, brightness//2, brightness]
    
    return frame

# Create video clip
bg_clip = VideoClip(make_frame, duration=duration)
bg_clip = bg_clip.resized((1080, 1920))  # Resize to vertical

print("Exporting tech_bg.mp4...")
bg_clip.write_videofile(
    'tech_bg.mp4',
    fps=30,
    codec='libx264',
    bitrate='2000k',
    threads=4,
    preset='fast',
    logger=None
)

print(f"Created: tech_bg.mp4 ({os.path.getsize('tech_bg.mp4')/1024/1024:.2f} MB)")
bg_clip.close()
