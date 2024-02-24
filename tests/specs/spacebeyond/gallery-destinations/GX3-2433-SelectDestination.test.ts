import { story , test, expect, } from '@TestBase';
import { type Locator } from '@playwright/test';

story('test selectors', () => {
	test('test selectors', async ({ page, destinationSpace }) => {
		await page.goto('https://demo.testim.io/');
		await destinationSpace.selectradomdestination();
	});
});