import { story, precondition, test, expect } from '@TestBase';

story('GX3-1510: Elements | Upload and Download', () => {
	precondition(async ({ page }) => {
		await page.goto('/upload-download', { waitUntil: 'domcontentloaded' });
	});

	test('TC1: Should Download images When Click in DOWNLOAD Button ', async ({ page }) => {
		await page.locator('#downloadButton').click();
	});

	test('TC2: Should Upload images when Click in UPLOAD Button and Select image', async ({ page }) => {
		await page.locator('#uploadFile').click();
	});
});
