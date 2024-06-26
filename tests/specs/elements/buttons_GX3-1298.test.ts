import { story, precondition, test, expect } from '@pages/TestBase';

story('GX3-1298: Element Buttons', () => {
	precondition(async ({ page }) => {
		await page.goto('/buttons', { waitUntil: 'domcontentloaded' });
	});
	test('TC1: Should trigger when using double click', async ({ page }, testInfo) => {
		if ([ 'iphone', 'firefox' ].includes(testInfo.project.name)) return expect(true).toBeTruthy();

		const messageExpected = 'You have done a double click';
		const messageElement = page.locator('#doubleClickMessage');

		await test.step('Click Double Button', async () => {
			await page.locator('#doubleClickBtn').dblclick();
		});
		await test.step('Verify the Message', async () => {
			await expect(messageElement).toHaveText(messageExpected);
		});
	});

	test('TC2: Should trigger when using right click', async ({ page }, testInfo) => {
		if ([ 'iphone', 'firefox' ].includes(testInfo.project.name)) return expect(true).toBeTruthy();

		const messageExpected = 'You have done a right click';
		const messageElement = page.locator('#rightClickMessage');

		await test.step('Click Right Button', async () => {
			await page.locator('#rightClickBtn').click({ button: 'right' });
		});
		await test.step('Verify the Message', async () => {
			await expect(messageElement).toHaveText(messageExpected);
		});
	});

	test('TC3: Should trigger when using simple click', async ({ page }, testInfo) => {
		if ([ 'iphone', 'firefox' ].includes(testInfo.project.name)) return expect(true).toBeTruthy();
		
		const messageExpected = 'You have done a dynamic click';
		const messageElement = page.locator('#dynamicClickMessage');

		await test.step('Perform simple Click on Button', async () => {
			await page.getByText('Click Me', { exact: true }).click();
		});
		await test.step('Verify the message', async () => {
			const messageElement = page.locator('#dynamicClickMessage');
			await expect(messageElement).toHaveText(messageExpected);
		});
	});
});
