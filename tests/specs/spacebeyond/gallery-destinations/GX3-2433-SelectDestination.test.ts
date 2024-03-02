import { story , test, expect, precondition } from '@TestBase';
import { type Locator } from '@playwright/test';

story('GX3-2433 | Select Destination | ', () => {
	precondition('test selectors', async ({ page, loginSpaceJhoa }) => {
		await page.goto('https://demo.testim.io/');
		await loginSpaceJhoa.loginSuccess();
	});
	test('GX3-2433 | TC1: Select Destination' , async ({ destinationSpace, filterPage }) => {
		await destinationSpace.selectDestination();
		await filterPage.moveSliderTo(-80);
	});
});