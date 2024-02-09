import { story, precondition, test, expect } from '@TestBase';
import data from '@data/GX3-1862-Fill-Form.json' assert { type: 'json' };
import { getRealValues } from '@helper/testUtils';
import type { SimpleForm } from '@type/inputTypes';

story('ToolsQA | Elements | Text Box: Fill form and Submit', () => {
	precondition(async ({ page }) => {
		await page.goto('/text-box', { waitUntil: 'domcontentloaded' });
	});

	test('GX3-1863 | TC1: Validar que se visualice el envío exitoso cuando todos los campos tienen data valida', async ({ page }) => {
		const usernameInput = page.locator('#userName-wrapper input');
		const emailInput = page.locator('#userEmail-wrapper input');
		const currentInput = page.locator('#currentAddress-wrapper textarea');
		const permanentInput = page.locator('#permanentAddress-wrapper textarea');

		const expectName = await test.step('Llenar el username', async () => {
			const name = data[0].fullName;
			await usernameInput.fill(name);
			return name;
		});
		const expectedEmail = await test.step('Llenar el Email', async () => {
			const email = data[0].email;
			await emailInput.fill(email);
			return email;
		});
		const expectedCurrent = await test.step('Llenar Current', async () => {
			const current = data[0].currentAddress;
			await currentInput.fill(current);
			return current;
		});
		const expectedPermanent = await test.step('llenar permanent', async () => {
			const permanent = data[0].permanentAddress;
			await permanentInput.fill(permanent);
			return permanent;
		});
		await test.step('Enviar formulario', async () => {
			await page.locator('button', { hasText: 'Submit' }).click();
			await expect(page.locator('#output')).toBeVisible();
		});
		await test.step('verificar el output', async () => {
			const outputText = page.locator('#output p');
			const Values = await getRealValues(outputText);
			const expectedValues = [expectName, expectedEmail, expectedCurrent, expectedPermanent];
			expect(Values).toEqual(expectedValues);
		});
	});
	test('GX3-1863 | TC2: Validar que se visualice el envío exitoso con diferentes datas', async ({ page }) => {
		const usernameInput = page.locator('#userName-wrapper input');
		const emailInput = page.locator('#userEmail-wrapper input');
		const currentInput = page.locator('#currentAddress-wrapper textarea');
		const permanentInput = page.locator('#permanentAddress-wrapper textarea');

		async function fillForm(datos: SimpleForm) {
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
