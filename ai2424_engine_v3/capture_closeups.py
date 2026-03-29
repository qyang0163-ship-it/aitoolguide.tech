#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Capture CLOSE-UP shots for cinematic video
Focus on text and key elements, not full page
"""

import asyncio
from playwright.async_api import async_playwright
import os

os.chdir(r'C:\Users\Administrator\Documents\aitoolguide-deploy\ai2424_engine_v3')

async def capture_closeups():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1920, 'height': 1080})
        page = await context.new_page()
        
        # Shot 1: Header "AI工具助手" close-up
        print("Shot 1: Header close-up...")
        await page.goto('https://www.ai2424.com', wait_until='networkidle')
        await page.wait_for_timeout(2000)
        # Capture just the header area (top 30%)
        await page.screenshot(path='shot1_header.png', clip={'x': 0, 'y': 0, 'width': 1920, 'height': 600})
        print("  Saved: shot1_header.png")
        
        # Shot 2: DNS success checkmark close-up
        print("Shot 2: DNS success close-up...")
        dns_html = """
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    margin: 0;
                    background: #0a0a0a;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-family: monospace;
                }
                .check {
                    font-size: 200px;
                    color: #00ff88;
                    text-shadow: 0 0 60px #00ff88;
                    margin-bottom: 40px;
                }
                .domain {
                    font-size: 80px;
                    color: #fff;
                    letter-spacing: 8px;
                }
                .status {
                    font-size: 24px;
                    color: #00ff88;
                    margin-top: 30px;
                }
            </style>
        </head>
        <body>
            <div class="check">✓</div>
            <div class="domain">ai2424.com</div>
            <div class="status">DNS RESOLVED SUCCESSFULLY</div>
        </body>
        </html>
        """
        await page.set_content(dns_html)
        await page.wait_for_timeout(1000)
        await page.screenshot(path='shot2_dns.png')
        print("  Saved: shot2_dns.png")
        
        # Shot 3: Sign In button close-up
        print("Shot 3: Sign In button close-up...")
        await page.goto('https://www.ai2424.com/sign-in/', wait_until='networkidle')
        await page.wait_for_timeout(2000)
        # Capture the center area where sign-in form is
        await page.screenshot(path='shot3_signin.png', clip={'x': 560, 'y': 300, 'width': 800, 'height': 700})
        print("  Saved: shot3_signin.png")
        
        # Shot 4: Domain portfolio grid close-up
        print("Shot 4: Domain portfolio close-up...")
        await page.goto('https://www.ai2424.com/domains/', wait_until='networkidle')
        await page.wait_for_timeout(2000)
        # Capture first domain card
        await page.screenshot(path='shot4_domains.png', clip={'x': 100, 'y': 200, 'width': 900, 'height': 500})
        print("  Saved: shot4_domains.png")
        
        await browser.close()
        print("\nAll close-up shots captured!")

asyncio.run(capture_closeups())
