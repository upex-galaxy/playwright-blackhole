import { precondition, story, test, expect } from '@pages/TestBase';

//  Test Suite 
story ('GX3-3746: Element Buttons', () => {

	//precondition
	precondition( async ({ page }) => {
		await page.goto('/buttons',{ waitUntil:'domcontentloaded' });
	});
	
	test ('TC1: should trigger when using Double click', async ({ page }) => {
		await page.locator('#doubleClickBtn').dblclick();
		const resultado= page.locator('#doubleClickMessage');
		await expect (resultado).toHaveText('You have done a double click');

	});
	test ('TC2: should trigger when using  Right Click', async ({ page }) => {
		await page.locator('#rightClickBtn').click({ button:'right' });
		const resultado= page.locator('#rightClickMessage');
		await expect(resultado).toHaveText('You have done a right click');
	});
	test ('TC3: should trigger when using  ClickMessage', async ({ page }) => {
		await page.locator('#rightClickBtn').click();
		const resultado= page.locator('#dynamicClickMessage');
		await expect(resultado).toHaveText('You have done a dynamic click');

	});
});
