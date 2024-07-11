import { expect, precondition, story, test } from '@TestBase';
import data from '@data/sagriUserDetails.json' assert { type: 'json' };
import type { SimpleForm } from '@type/inputTypes';

story('GX3_Sagri-1337: ToolsQA | Elements | Text Box: Fill form and Submit', () => {
	precondition(async ({ page }) => {
		await page.goto('/text-box', { waitUntil: 'domcontentloaded' });
	});	

	test('TC1: Se debería llenar el formulario y enviarlo', async ({ page }) => {

		const usernameInput = page.locator('#userName-wrapper input');
		const emailInput = page.locator('#userEmail-wrapper input');
		const currentAddressInput = page.locator('#currentAddress-wrapper textarea');
		const paramentAddressInput = page.locator('#permanentAddress-wrapper textarea');

		console.log(data);

		await test.step('Rellenar nombre de usuario', async () => {
			await usernameInput.fill(data[0].fullName);
		});
		await test.step('Rellenar email', async () => {
			await emailInput.fill(data[0].email);
		});
		await test.step('Rellenar dirección actual', async () => {
			await currentAddressInput.fill(data[0].currentAddress);
		});
		await test.step('Rellenar dirección permanente', async () => {
			await paramentAddressInput.fill(data[0].permanentAddress);
		});

		await test.step('Enviar el formulario', async () => {
			await page.locator('button', { hasText: 'Submit' }).click();
			await expect(page.locator('#output')).toBeVisible();
		});

		await test.step('Verificar el output', async () => {
			const outputName = await page.locator('#output #name').innerText();
			const cleanOuputName = outputName.replace('Name:', '').trim();
			expect(cleanOuputName).toEqual(data[0].fullName);
		});	
	});

	test('TC2: Se debería rellenar el formulario con diferentes datos', async ({ page }) => {

		const usernameInput = page.locator('#userName-wrapper input');
		const emailInput = page.locator('#userEmail-wrapper input');
		const currentAddressInput = page.locator('#currentAddress-wrapper textarea');
		const paramentAddressInput = page.locator('#permanentAddress-wrapper textarea');

		async function fillForm(_datos: SimpleForm) {
			await usernameInput.fill(_datos.fullName);
			await emailInput.fill(_datos.email);
			await currentAddressInput.fill(_datos.currentAddress);
			await paramentAddressInput.fill(_datos.permanentAddress);
		}

		for (const credencials of data) {
			await fillForm(credencials);
			await page.waitForTimeout(1000);
			await page.locator('button', { hasText: 'Submit' }).click();
		}
	});
});
