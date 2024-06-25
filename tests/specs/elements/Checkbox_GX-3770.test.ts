import { story, test, precondition } from '@pages/TestBase';

story.only('GX-3770: ToolsQA | Elements | Checkbox', () => {
	precondition(async ({ page }) => {
		await page.goto('/checkbox', { waitUntil: 'domcontentloaded' });
	});

	test('TC1: Verify "Expand All" Functionality', async ({ page }) => {
		await page.locator('#rct-option rct-option-expand-all').click();
		await page.locator('.display-result mt-4').isVisible();

		
		
	});

	
});
