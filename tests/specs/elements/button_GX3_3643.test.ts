import { test } from '@pages/TestBase';
import { expect } from '@playwright/test';

test.describe('GX3-3643:ToolsQA|Elements|Buttons', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://demoqa.com/buttons', { waitUntil: 'domcontentloaded' });
	});
	test('TC1: Validar hacer click en el botón doble click', async ({ page }) => {
		const doubleClickBtn = page.locator('#doubleClickBtn');
		await doubleClickBtn.dblclick();
		var doubleClickMessage = page.locator('#doubleClickMessage');
		await expect(doubleClickMessage).toBeVisible();
		await expect(doubleClickMessage).toHaveText('You have done a double click');
	});
	test('TC2:Realizar click en el botón Right Click', async ({ page }) => {
		const rightClickBtn = page.locator('#rightClickBtn');
		await rightClickBtn.click({ button: 'right' });
		var rightClickMessage = page.locator('#rightClickMessage');
		await expect(rightClickMessage).toBeVisible();
		await expect(rightClickMessage).toHaveText('You have done a right click');
	});
	test('TC3:Realizar click en el botón Click', async ({ page }) => {
		const clickBtn = page.getByText('Click Me', { exact: true });
		await clickBtn.waitFor({ state: 'visible' });
		await clickBtn.click();
		var dynamicClickMessage = page.locator('#dynamicClickMessage');
		await expect(dynamicClickMessage).toHaveText('You have done a dynamic click');
	});
});
