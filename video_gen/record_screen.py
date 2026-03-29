#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI2424 Promo Video Generator
Task 2: Screen Recording with Playwright
"""

import asyncio
from playwright.async_api import async_playwright
import os

os.chdir(r'C:\Users\Administrator\Documents\aitoolguide-deploy\video_gen')

async def record_website():
    async with async_playwright() as p:
        # Launch browser
        browser = await p.chromium.launch()
        
        # Create context with mobile viewport (vertical video)
        context = await browser.new_context(
            viewport={'width': 540, 'height': 960},  # Mobile ratio
            device_scale_factor=2
        )
        
        page = await context.new_page()
        
        # Recording 1: Homepage
        print("Recording bg1.mp4 - Homepage...")
        
        # Start recording
        await page.goto('https://www.ai2424.com')
        await page.wait_for_load_state('networkidle')
        
        # Record 10 seconds with scrolling
        await page.evaluate("""
            async () => {
                const duration = 10000;
                const start = Date.now();
                const scrollHeight = document.body.scrollHeight - window.innerHeight;
                
                while (Date.now() - start < duration) {
                    const progress = (Date.now() - start) / duration;
                    window.scrollTo(0, scrollHeight * progress);
                    await new Promise(r => setTimeout(r, 50));
                }
            }
        """)
        
        # Take screenshots for video (30fps, 10 seconds = 300 frames)
        frames1 = []
        for i in range(300):
            frame_path = f'frame1_{i:04d}.png'
            await page.screenshot(path=frame_path, full_page=False)
            frames1.append(frame_path)
            
            # Scroll
            scroll_pos = await page.evaluate('window.scrollY')
            await page.evaluate(f'window.scrollTo(0, {scroll_pos + 3})')
            await asyncio.sleep(1/30)
        
        print(f"Captured {len(frames1)} frames for bg1")
        
        # Recording 2: Domains page
        print("Recording bg2.mp4 - Domains page...")
        
        await page.goto('https://www.ai2424.com/domains/')
        await page.wait_for_load_state('networkidle')
        
        frames2 = []
        for i in range(300):
            frame_path = f'frame2_{i:04d}.png'
            await page.screenshot(path=frame_path, full_page=False)
            frames2.append(frame_path)
            
            scroll_pos = await page.evaluate('window.scrollY')
            await page.evaluate(f'window.scrollTo(0, {scroll_pos + 3})')
            await asyncio.sleep(1/30)
        
        print(f"Captured {len(frames2)} frames for bg2")
        
        await browser.close()
        
        return frames1, frames2

# Run
frames1, frames2 = asyncio.run(record_website())

print(f"\nTotal frames captured: {len(frames1) + len(frames2)}")
print("Frame files saved for video composition")
