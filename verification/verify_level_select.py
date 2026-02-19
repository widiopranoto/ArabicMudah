from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    try:
        page.goto("http://localhost:8080/index.html")

        # Login
        page.fill("#username-input", "NewUser")
        page.click("#btn-login")

        # Check Level Select Screen
        expect(page.locator("#level-select-screen")).to_be_visible()
        print("Level Select Screen visible")

        # Check Locked/Unlocked logic
        # Chapter 1 should be unlocked
        chap1 = page.locator(".level-card").nth(0)
        expect(chap1).not_to_have_class("locked")

        # Chapter 2 should be locked (assuming fresh user)
        chap2 = page.locator(".level-card").nth(1)
        # Note: CSS class check might need exact string or partial
        # expect(chap2).to_have_class(re.compile(r"locked"))
        # Using attribute check if class list is complex
        classes = chap2.get_attribute("class")
        assert "locked" in classes
        print("Lock logic verified: Chap 1 Open, Chap 2 Locked")

        # Click Chapter 1
        chap1.click()

        # Check Play Screen
        expect(page.locator("#play-screen")).to_be_visible()
        print("Navigation to Game verified")

        # Check Header XP format "0 / 1000"
        xp_text = page.locator("#xp-value").text_content()
        assert "/" in xp_text
        print(f"XP Format verified: {xp_text}")

        page.screenshot(path="verification/level_select_check.png")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
