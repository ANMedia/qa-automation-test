import { test, expect } from "@playwright/test";

test.describe("Test WP-JSON @api endpoints @desktopOnly", () => {
	test("Test metro app editions endpoint", async ({ page }) => {
		const url = "/wp-json/wp/v2/metro-app-editions?metro_app_content=1";

		// Uses baseURL from config.
		const response = await page.goto(url, { waitUntil: "domcontentloaded" });

		expect(response.status()).toBe(200);
	});

	test("Test trending commercial video endpoint", async ({
		page,
		isMobile,
	}) => {
		test.skip(isMobile, "This test is not applicable to mobile viewports");
		const url =
			"/wp-json/videos/trending-commercial?per_page=50&fields=id,headline";

		// Uses baseURL from config.
		const response = await page.goto(url, { waitUntil: "domcontentloaded" });

		expect(response.status()).toBe(200);

		const body = await response.json();
		expect(body.videos.length).toBeGreaterThan(0);
	});
});
