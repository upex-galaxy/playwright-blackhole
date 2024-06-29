import { story, test, precondition, expect } from '@TestBase';
import data from '@data/GregorioUserDetails.json' assert { type: 'json' };

story('⚡️ToolsQA | Elements | Text Box: Fill form and Submit', () => {
	precondition(async ({ page }) => {
		await page.goto('/text-box');
	});

	// Test case Nro 1
	test('TC1 Validar ingresar datos en el formulario con todos los campos válidos', async ({ page }) => {
		await page.getByPlaceholder('Full Name').fill('claud');
		await page.locator('#userEmail').fill('claud@gmail.com');
		await page.locator('#currentAddress').fill('caracas, venezuela');
		await page.locator('#permanentAddress').fill('buenos aires argentina');

		await test.step('Click on submit button', async () => {
			await page.getByText('Submit', { exact: true }).click();	
		});

		await test.step('Display all entry data', async () => {
			// aqui obtengo los elementos de salida juntos
			const outputLines = await page.locator('#output p').allInnerTexts();
			const reducedOutput = outputLines.map(item => item.split(':')[1].trim());
        
			// aqui se muestran los valores esperados
			const expectedOutput = [data[0].fullName, data[0].email, data[0].currentAddress, data[0].permanentAddress];
        
			// aqui los valores esperados deben ser igual a los obtenidos
			expect(reducedOutput).toEqual(expectedOutput);
		});
	});

	test('TC2 Validar ingresar datos válidos en el formulario dejando el campo "Full Name" vacío', async ({ page }) => {
		await page.getByPlaceholder('Full Name').fill('');
		await page.locator('#userEmail').fill('claud@gmail.com');
		await page.locator('#currentAddress').fill('caracas, venezuela');
		await page.locator('#permanentAddress').fill('buenos aires argentina');

		await test.step('Click on submit button', async () => {
			await page.getByText('Submit', { exact: true }).click();	
		});

		await test.step('Display all entry data', async () => {
			
			const outputLines = await page.locator('#output p').allInnerTexts();
			const reducedOutput = outputLines.map(item => item.split(':')[1].trim());
			const expectedOutput = [data[1].email, data[1].currentAddress, data[1].permanentAddress];
			
			// Verificar que los valores obtenidos coincidan con los esperados
			expect(reducedOutput).toEqual(expectedOutput);
        
			
		});
	
	});

	test('TC3 Validar ingresar datos válidos en el formulario dejando el campo "Email" (sin \'@\')', async ({ page }) => {
		await page.getByPlaceholder('Full Name').fill('claud');
		await page.locator('#userEmail').fill('claudgmail.com'); // Deja el campo Email sin '@'
		await page.locator('#currentAddress').fill('caracas, venezuela');
		await page.locator('#permanentAddress').fill('buenos aires argentina');

		// Hacer clic en el botón de submit
		await test.step('Click on submit button', async () => {
			await page.getByText('Submit', { exact: true }).click();    
		});

		// Verificar el comportamiento esperado después de enviar el formulario
		await test.step('Verify invalid email behavior', async () => {
			const emailField = await page.locator('#userEmail');

			// Verificar si el campo de correo electrónico es visible
			expect(await emailField.isVisible()).toBe(true);
		});
		
		
	});

	test('TC5 Validar ingresar datos válidos en el formulario dejando el campo "Current Address" vacío', async ({ page }) => {
		await page.getByPlaceholder('Full Name').fill('claud');
		await page.locator('#userEmail').fill('claud@gmail.com'); 
		await page.locator('#currentAddress').fill('');
		await page.locator('#permanentAddress').fill('buenos aires argentina');

		// Hacer clic en el botón de submit
		await test.step('Click on submit button', async () => {
			await page.getByText('Submit', { exact: true }).click();    
		});
	
	});

	test('TC7 Validar ingresar datos válidos en el formulario dejando el campo "Email" (sin alfanumérico después del \'@\') y el "Current Address" vacío', async ({ page }) => {
		await page.getByPlaceholder('Full Name').fill('claud');
		await page.locator('#userEmail').fill('claud@'); 
		await page.locator('#currentAddress').fill('');
		await page.locator('#permanentAddress').fill('buenos aires argentina');

		// Hacer clic en el botón de submit
		await test.step('Click on submit button', async () => {
			await page.getByText('Submit', { exact: true }).click();    
		});

		// Verificar el comportamiento esperado después de enviar el formulario
		await test.step('Verify invalid email behavior', async () => {
			const emailField = await page.locator('#userEmail');

			// Verificar si el campo de correo electrónico es visible
			expect(await emailField.isVisible()).toBe(true);
		});
	});

	test('TC9 Validar ingresar datos válidos en el formulario con "Permanent Address" vacío', async ({ page }) => {
		await page.getByPlaceholder('Full Name').fill('claud');
		await page.locator('#userEmail').fill('claud@gmail.com');
		await page.locator('#currentAddress').fill('');
		await page.locator('#permanentAddress').fill('buenos aires argentina');

		await test.step('Click on submit button', async () => {
			await page.getByText('Submit', { exact: true }).click();    
		});

		await test.step('Display all entry data', async () => {
			const outputLines = await page.locator('#output p').allInnerTexts();
			const reducedOutput = outputLines.map(item => item.split(':')[1].trim());
			const expectedOutput = [data[5].fullName, data[5].email, data[5].permanentAddress];

			// Verificar que los valores obtenidos coincidan con los esperados
			expect(reducedOutput).toEqual(expectedOutput);
		});
	});

	test('TC11 Validar ingresar datos válidos en el formulario con "Email" y "Permanent Address" vacíos', async ({ page }) => {
		await page.getByPlaceholder('Full Name').fill('claud');
		await page.locator('#userEmail').fill('');
		await page.locator('#currentAddress').fill('caracas, venezuela');
		await page.locator('#permanentAddress').fill('');

		await test.step('Click on submit button', async () => {
			await page.getByText('Submit', { exact: true }).click();
		});

		await test.step('Display all entry data', async () => {
			// aquí obtengo los elementos de salida juntos
			const outputLines = await page.locator('#output p').allInnerTexts();
			const reducedOutput = outputLines.map(item => item.split(':')[1].trim());

			// aquí se muestran los valores esperados
			const expectedOutput = [data[6].fullName, data[6].currentAddress];

			// aquí los valores esperados deben ser igual a los obtenidos
			expect(reducedOutput).toEqual(expectedOutput);
		});
	});

	test('TC13 Validar ingresar datos válidos en el formulario con "Current Address" y "Permanent Address" vacíos', async ({ page }) => {
		await page.getByPlaceholder('Full Name').fill('claud');
		await page.locator('#userEmail').fill('claud@gmail.com');
		await page.locator('#currentAddress').fill('');
		await page.locator('#permanentAddress').fill('');

		await test.step('Click on submit button', async () => {
			await page.getByText('Submit', { exact: true }).click();
		});

		await test.step('Display all entry data', async () => {
			// aquí obtengo los elementos de salida juntos
			const outputLines = await page.locator('#output p').allInnerTexts();
			const reducedOutput = outputLines.map(item => item.split(':')[1].trim());

			// aquí se muestran los valores esperados
			const expectedOutput = [data[7].fullName, data[7].email];

			// aquí los valores esperados deben ser igual a los obtenidos
			expect(reducedOutput).toEqual(expectedOutput);
		});
	});
});