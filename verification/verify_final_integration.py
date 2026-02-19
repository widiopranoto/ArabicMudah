from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    try:
        page.goto("http://localhost:8080/index.html")

        # Login
        page.fill("#username-input", "SyncUser")
        page.click("#btn-login")

        # Check Level Select
        expect(page.locator("#level-select-screen")).to_be_visible()

        # Verify unlocked Chapter 1
        chap1 = page.locator(".level-card").nth(0)
        expect(chap1).not_to_have_class("locked")

        # Click Chapter 1 to start
        chap1.click()

        # Verify Play Screen
        expect(page.locator("#play-screen")).to_be_visible()

        # Verify XP Display Format
        xp_value = page.locator("#xp-value").text_content()
        assert "/" in xp_value, f"XP value '{xp_value}' should format as 'Current / Target'"

        print("Integration test passed: Login -> Level Select -> Game Start + XP Format Check")
        page.screenshot(path="verification/final_integration.png")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
