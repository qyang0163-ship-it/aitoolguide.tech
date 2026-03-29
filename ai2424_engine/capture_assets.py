#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Screenshot Capture Script for ai2424.com
Captures 5 key screenshots for video production
"""

import asyncio
from playwright.async_api import async_playwright
import os

os.chdir(r'C:\Users\Administrator\Documents\aitoolguide-deploy\ai2424_engine')

async def capture_screenshots():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            device_scale_factor=2
        )
        page = await context.new_page()
        
        screenshots = []
        
        # 1. Homepage Header
        print("Capturing: Homepage Header...")
        await page.goto('https://www.ai2424.com', wait_until='networkidle')
        await page.wait_for_timeout(2000)
        await page.screenshot(path='ai_assets_v1.png', full_page=False)
        screenshots.append('ai_assets_v1.png')
        print("  Saved: ai_assets_v1.png")
        
        # 2. Domains page
        print("Capturing: Domains page...")
        await page.goto('https://www.ai2424.com/domains/', wait_until='networkidle')
        await page.wait_for_timeout(2000)
        await page.screenshot(path='premium_list_v1.png', full_page=False)
        screenshots.append('premium_list_v1.png')
        print("  Saved: premium_list_v1.png")
        
        # 3. Sign-in page (for Clerk UI)
        print("Capturing: Sign-in page...")
        await page.goto('https://www.ai2424.com/sign-in/', wait_until='networkidle')
        await page.wait_for_timeout(2000)
        await page.screenshot(path='clerk_v1.png', full_page=False)
        screenshots.append('clerk_v1.png')
        print("  Saved: clerk_v1.png")
        
        # 4. Create DNS success page simulation
        print("Creating: DNS success page...")
        dns_html = """
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-family: 'SF Mono', Monaco, monospace;
                    color: #fff;
                }
                .status {
                    font-size: 24px;
                    color: #00ff88;
                    margin-bottom: 20px;
                }
                .domain {
                    font-size: 72px;
                    font-weight: bold;
                    color: #fff;
                    letter-spacing: 4px;
                }
                .tagline {
                    font-size: 18px;
                    color: #888;
                    margin-top: 20px;
                }
                .check {
                    font-size: 48px;
                    color: #00ff88;
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <div class="check">✓</div>
            <div class="status">DNS RESOLVED SUCCESSFULLY</div>
            <div class="domain">ai2424.com</div>
            <div class="tagline">Premium AI Domain Portfolio</div>
        </body>
        </html>
        """
        await page.set_content(dns_html)
        await page.wait_for_timeout(1000)
        await page.screenshot(path='dns_v1.png', full_page=False)
        screenshots.append('dns_v1.png')
        print("  Saved: dns_v1.png")
        
        # 5. Create CTA page
        print("Creating: CTA page...")
        cta_html = """
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background: #000;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-family: 'SF Mono', Monaco, monospace;
                }
                .domain {
                    font-size: 120px;
                    font-weight: bold;
                    color: #FFD700;
                    text-shadow: 0 0 40px #FFD700, 0 0 80px #FF8C00;
                    letter-spacing: 8px;
                    animation: pulse 2s ease-in-out infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.02); }
                }
                .cta {
                    font-size: 36px;
                    color: #fff;
                    margin-top: 40px;
                }
                .arrow {
                    font-size: 48px;
                    color: #FFD700;
                    margin-top: 20px;
                    animation: bounce 1s ease-in-out infinite;
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(10px); }
                }
            </style>
        </head>
        <body>
            <div class="cta">立即访问</div>
            <div class="domain">ai2424.com</div>
            <div class="arrow">↓</div>
        </body>
        </html>
        """
        await page.set_content(cta_html)
        await page.wait_for_timeout(1000)
        await page.screenshot(path='cta_v1.png', full_page=False)
        screenshots.append('cta_v1.png')
        print("  Saved: cta_v1.png")
        
        await browser.close()
        
        # Verify all screenshots
        print("\n=== Verification ===")
        all_valid = True
        for img in screenshots:
            if os.path.exists(img):
                size = os.path.getsize(img)
                status = "OK" if size > 1000 else "TOO SMALL"
                print(f"  {img}: {size/1024:.1f} KB [{status}]")
                if size < 1000:
                    all_valid = False
            else:
                print(f"  {img}: MISSING")
                all_valid = False
        
        if all_valid:
            print("\n✓ All screenshots captured successfully!")
        else:
            print("\n✗ Some screenshots failed!")
        
        return all_valid

# Run
result = asyncio.run(capture_screenshots())
exit(0 if result else 1)
