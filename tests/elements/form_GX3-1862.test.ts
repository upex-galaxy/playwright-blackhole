import { story, precondition, test, expect } from '@TestBase';
import data from '@data/GX3-1862-Fill-Form.json' assert { type: 'json' };
import type { simpleForm } from '@type/inputTypes';

story('ToolsQA | Elements | Text Box: Fill form and Submit', () => {
	precondition(async ({ page }) => {
		await page.goto('/text-box', { waitUntil: 'domcontentloaded' });
	});

	test('TC1: Validar que se visualice el envío exitoso cuando todos los campos tienen data valida', async ({ page }) => {
		const usernameInput = page.locator('#userName-wrapper input');
		const emailInput = page.locator('#userEmail-wrapper input');
		const currentInput = page.locator('#currentAddress-wrapper textarea');
		const permanentInput = page.locator('#permanentAddress-wrapper textarea');

		await test.step('Llenar el username', async () => {
			await usernameInput.fill(data[0].fullName);
		});
		await test.step('Llenar el Email', async () => {
			await emailInput.fill(data[0].email);
		});
		await test.step('Llenar Current', async () => {
			await currentInput.fill(data[0].currentAddress);
		});
		await test.step('llenar permanent', async () => {
			await permanentInput.fill(data[0].permanentAddress);
		});
		await page.locator('button', { hasText: 'Submit' }).click();
	});
	test('TC2: Validar que se visualice el envío exitoso con diferentes datas', async ({ page }) => {
		const usernameInput = page.locator('#userName-wrapper input');
		const emailInput = page.locator('#userEmail-wrapper input');
		const currentInput = page.locator('#currentAddress-wrapper textarea');
		const permanentInput = page.locator('#permanentAddress-wrapper textarea');

		async function fillForm(datos: simpleForm) {
			await usernameInput.fill(datos.fullName);
			await emailInput.fill(datos.email);
			await currentInput.fill(datos.currentAddress);
			await permanentInput.fill(datos.permanentAddress);
		}

		for (const credenciales of data) {
			await fillForm(credenciales);
			await page.locator('button', { hasText: 'Submit' }).click();
		}
	});
});
