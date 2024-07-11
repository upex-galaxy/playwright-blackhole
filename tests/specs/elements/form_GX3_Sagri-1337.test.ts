import { expect, precondition, story, test } from '@TestBase';
import data from '@data/sagriUserDetails.json' assert { type: 'json' };
import { getRealValues } from '@helper/SagriUtils';
import type { SimpleForm } from '@type/inputTypes';

story('GX3-Sagri: ToolsQA | Elements | Text Box: Rellenar formulario y enviar', () => {
	precondition(async ({ page }) => {
		await page.goto('/text-box', { waitUntil: 'domcontentloaded' });
	});	

	test('GX3-4057 | TC1: Se debería llenar el formulario y enviarlo', async ({ page }) => {

		const usernameInput = page.locator('#userName-wrapper input');
		const emailInput = page.locator('#userEmail-wrapper input');
		const currentAddressInput = page.locator('#currentAddress-wrapper textarea');
		const paramentAddressInput = page.locator('#permanentAddress-wrapper textarea');

		console.log(data);

		const expectedName = await test.step('Rellenar nombre de usuario', async () => {
			const name = data[0].fullName;
			await usernameInput.fill(name);
			return name;

		}); 
		const expectedEmail = await test.step('Rellenar email', async () => {
			const email = data[0].email;
			await emailInput.fill(email);
			return email;
		});

		const expectedCuAddress = await test.step('Rellenar dirección actual', async () => {
			const address = data[0].currentAddress;
			await currentAddressInput.fill(address);
			return address;
		});

		const expectedPerAddress = await test.step('Rellenar dirección permanente', async () => {
			const address = data[0].permanentAddress;
			await paramentAddressInput.fill(address);
			return address;
		});

		await test.step('Enviar el formulario', async () => {
			await page.locator('button', { hasText: 'Submit' }).click();
			await expect(page.locator('#output')).toBeVisible();
		});	

		await test.step('Verificar el Output', async () => {
			const outputTexts = page.locator('#output p');

			const displayedValues = await getRealValues(outputTexts);
			const expectedValues = [expectedName, expectedEmail, expectedCuAddress, expectedPerAddress];
			expect(displayedValues).toEqual(expectedValues);
			console.log('displayedValues: ', displayedValues);
		});	
	});

	test('GX3-4057 | TC2: Se debería rellenar el formulario con diferentes datos', async ({ page }) => {

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
