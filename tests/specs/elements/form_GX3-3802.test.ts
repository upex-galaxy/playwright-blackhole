import { story, precondition, test, expect } from '@TestBase';
import data from '@data/iveUserDetails.json' assert { type: 'json' };
import { getRealValues } from '@helper/IvetestUtils';
import type { SimpleForm } from '@type/inputTypes';

story('GX3-3802: ToolsQA | Elements | Text Box: Fill form and Submit', () => {
	precondition(async ({ page }) => {
		await page.goto('/text-box', { waitUntil: 'domcontentloaded' });

	});
	test ('GX3-3803| TC1: Should fill the form adn Submit', async ({ page }) => {
		const usernameInput = page.locator('#userName-wrapper input');
		const emailInput = page.locator('#userEmail-wrapper input');
		const currentAdressInput = page.locator('#currentAddress-wrapper textarea');
		const permanentAdressInput = page.locator('#permanentAddress-wrapper textarea');

		const expectedName = await test.step('Fill the username', async () => {
			const name = data[0].fullName;
			await usernameInput.fill(name);
			return name;
		});

		const expectedEmail = await test.step('Fill email', async () => {
			const mail =data[0].email;
			await emailInput.fill(mail);
			return mail;
		});

		const expectedCuAddress= await test.step('Fill the Current Address', async () => {
			const currentAdress= data[0].currentAddress;
			await currentAdressInput.fill(currentAdress);
			return currentAdress;
		});

		const expectedPerAddress=await test.step('Fill the permanent Adress', async () => {
			const permanentAdress =data[0].permanentAddress;
			await permanentAdressInput.fill(permanentAdress);
			return permanentAdress;
		});
		
		await test.step('Submit the form', async () => {
			await page.locator('button', { hasText:'Submit' }).click();
			await expect(page.locator('#output')).toBeVisible();
		});		

		await test.step('Verify the output', async () => {
			const displayValues = page.locator('#output p');
			const values = await getRealValues(displayValues);
			const expectValues = [expectedName, expectedEmail, expectedCuAddress, expectedPerAddress];
			//   console.log(values);
			expect(values).toEqual(expectValues);
		});		
	});

	test ('GX3-3803|TC2: Should re-fill the forms with diferent data ', async ({ page }) => {
		const usernameInput = page.locator('#userName-wrapper input');
		const emailInput = page.locator('#userEmail-wrapper input');
		const currentAdressInput = page.locator('#currentAddress-wrapper textarea');
		const permanentAdressInput = page.locator('#permanentAddress-wrapper textarea');

		async function fillForm(datos: SimpleForm) {
			await usernameInput.fill(datos.fullName);
			await emailInput.fill(datos.email);
			await currentAdressInput.fill(datos.currentAddress);
			await permanentAdressInput.fill(datos.permanentAddress);
		}

		for (const credencials of data) { 
			await fillForm(credencials);
			await page.waitForTimeout(1000);
			await page.locator('button', { hasText:'Submit' }).click();

		}
	});

});