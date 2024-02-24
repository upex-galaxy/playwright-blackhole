import { story , test, expect, } from '@TestBase';
import { type Locator } from '@playwright/test';

story('test selectors', () => {
	test('test selectors', async ({ page }) => {
		await page.goto('https://demo.testim.io/');
		await page.locator('[data-react-toolbox="button"]' , { hasText: 'Select Destination' }).click();
		await page.locator('[data-react-toolbox="dropdown"]', { hasText: 'Launch' }).click();
		const dropdownmenu = page.locator('.theme__values___1jS4g').nth(2);
		await dropdownmenu.getByText('Tongli').click();
		const progressbar = page.locator('[data-react-toolbox="progress-bar"]');
		await progressbar.getAttribute('[value="829"]');
	});
});