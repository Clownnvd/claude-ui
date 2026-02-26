#!/usr/bin/env python3
"""
Export HTML to PDF with proper per-page footer using Playwright.
Usage: python scripts/export-pdf.py
"""
import asyncio
from pathlib import Path

try:
    from playwright.async_api import async_playwright
except ImportError:
    print("[error] Playwright not installed. Run: pip install playwright && playwright install chromium")
    raise

HTML_FILE = Path(__file__).parent / "generate-pdf.html"
PDF_FILE  = Path(__file__).parent / "SKU-Skills-Universe.pdf"

FOOTER_TEMPLATE = """
<div style="
  width: 100%;
  padding: 0 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 9px;
  color: #999;
  border-top: 1px solid #e0e0e0;
">
  <span>SKU — Skills Universe Architecture · Personal Reference</span>
  <span>Feb 2026</span>
</div>
"""

async def export():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        await page.goto(HTML_FILE.as_uri(), wait_until="networkidle")

        # Hide the in-page footer (fixed div) — @page handles it
        await page.evaluate("""
            const el = document.querySelector('.page-footer');
            if (el) el.style.display = 'none';
        """)

        await page.pdf(
            path=str(PDF_FILE),
            format="A4",
            margin={"top": "16mm", "bottom": "20mm", "left": "16mm", "right": "16mm"},
            display_header_footer=True,
            header_template="<span></span>",
            footer_template=FOOTER_TEMPLATE,
            print_background=True,
        )

        await browser.close()
        print(f"[ok] PDF saved -> {PDF_FILE}")

asyncio.run(export())
