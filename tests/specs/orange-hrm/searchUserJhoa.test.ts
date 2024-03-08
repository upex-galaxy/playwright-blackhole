import { story, test, expect, precondition } from '@TestBase';

story('GX3-2362 | OrangeHRM | Admin | Search User' , async () => {
	precondition('Login User' , async ({ orangeLoginPage }) => {
		await orangeLoginPage.loginSuccess();
	});
	test('Search User' , async ({ page }) => {
		await page.locator('a', { hasText: 'Admin' }).click();
		await page.locator('[class*="input--active"]').nth(1).fill('Admin');
		await page.locator('[class*="text--active"]').nth(0).click();
		await page.locator('.oxd-select-option').nth(1).click();
		await page.locator('input').nth(2).fill('Bob Tester');
		await page.waitForTimeout(2000);
		await page.locator('.oxd-autocomplete-option').click();
		await page.locator('[class*="text--active"]').nth(1).click();
		await page.locator('span', { hasText: 'Enabled' }).click();
		await page.locator('button[type=submit]').click();
	});
});