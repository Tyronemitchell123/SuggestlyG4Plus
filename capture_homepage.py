from pathlib import Path
import sys
import time

from playwright.sync_api import sync_playwright


def capture(url: str, out_path: Path, viewport=(1440, 900)) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": viewport[0], "height": viewport[1]})
        page = context.new_page()
        page.goto(url, wait_until="networkidle")
        # Give animations a moment to settle
        time.sleep(0.8)
        page.screenshot(path=str(out_path), full_page=True)
        browser.close()


if __name__ == "__main__":
    # Default to local server URL; allow override via CLI
    target_url = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000/aurum-private"
    output = Path("aurum-private/homepage.png")
    print(f"Capturing {target_url} -> {output}")
    capture(target_url, output)
    print(f"Saved screenshot to: {output.resolve()}")



