import { story, test, precondition, expect } from '@TestBase';
import data from '@data/GregorioUserDetails.json' assert { type: 'json' };

story('⚡️ToolsQA | Elements | Text Box: Fill form and Submit', () => {
	precondition(async ({ page }) => {
		await page.goto('/text-box');
	});

	test('TC1 Validar ingresar datos válidos en el formulario', async ({ page }) => {
		const userData = data[0] as {
            fullName: string;
            email: string;
            currentAddress: string;
            permanentAddress: string;
        };

		await page.getByPlaceholder('Full Name').fill(userData.fullName);
		await page.locator('#userEmail').fill(userData.email);
		await page.locator('#currentAddress').fill(userData.currentAddress);
		await page.locator('#permanentAddress').fill(userData.permanentAddress);

		await test.step('Click on submit button', async () => {
			await page.getByText('Submit', { exact: true }).click();
		});

		await test.step('Display all entry data', async () => {
			const outputLines = await page.locator('#output p').allInnerTexts();
			console.log('Raw Output Lines:', outputLines);

			const reducedOutput = outputLines.map(item => item.split(':')[1]?.trim() ?? '');
			const expectedOutput = [userData.fullName, userData.email, userData.currentAddress, userData.permanentAddress];

			console.log('Reduced Output:', reducedOutput);
			console.log('Expected Output:', expectedOutput);

			expect(reducedOutput).toEqual(expectedOutput);
		});
	});

	test('TC2 Validar ingresar datos válidos en el formulario dejando el campo "Full Name" vacío', async ({ page }) => {
		const userData = data[1] as {
            fullName: string;
            email: string;
            currentAddress: string;
            permanentAddress: string;
        };

		await page.locator('#userEmail').fill(userData.email);
		await page.locator('#currentAddress').fill(userData.currentAddress);
		await page.locator('#permanentAddress').fill(userData.permanentAddress);

		await test.step('Click on submit button', async () => {
			await page.getByText('Submit', { exact: true }).click();
		});

		await test.step('Display all entry data', async () => {
			const outputLines = await page.locator('#output p').allInnerTexts();
			console.log('Raw Output Lines:', outputLines);

			const reducedOutput = outputLines.map(item => item.split(':')[1]?.trim() ?? '');
			const expectedOutput = [userData.email, userData.currentAddress, userData.permanentAddress];

			console.log('Reduced Output:', reducedOutput);
			console.log('Expected Output:', expectedOutput);

			expect(reducedOutput).toEqual(expectedOutput);
		});
	});

	test('TC3 Validar ingresar datos válidos en el formulario dejando el campo "Email" (sin \'@\')', async ({ page }) => {
		const userData = data[2] as {
            fullName: string;
            email: string;
            currentAddress: string;
            permanentAddress: string;
        };

		await page.getByPlaceholder('Full Name').fill(userData.fullName);
		await page.locator('#userEmail').fill(userData.email);
		await page.locator('#currentAddress').fill(userData.currentAddress);
		await page.locator('#permanentAddress').fill(userData.permanentAddress);

		await test.step('Click on submit button', async () => {
			await page.getByText('Submit', { exact: true }).click();
		});

		await test.step('Display all entry data', async () => {
			const outputLines = await page.locator('#output p').allInnerTexts();
			console.log('Raw Output Lines:', outputLines);

			const reducedOutput = outputLines.map(item => item.split(':')[1]?.trim() ?? '');
			const expectedOutput = [userData.fullName, userData.email, userData.currentAddress, userData.permanentAddress];

			console.log('Reduced Output:', reducedOutput);
			console.log('Expected Output:', expectedOutput);

			expect(reducedOutput).toEqual(expectedOutput);
		});
	});

	test('TC5 Validar ingresar datos válidos en el formulario dejando el campo "Current Address" vacío', async ({ page }) => {
		const userData = data[3] as {
            fullName: string;
            email: string;
            currentAddress: string;
            permanentAddress: string;
        };

		await page.getByPlaceholder('Full Name').fill(userData.fullName);
		await page.locator('#userEmail').fill(userData.email);
		await page.locator('#permanentAddress').fill(userData.permanentAddress);

		await test.step('Click on submit button', async () => {
			await page.getByText('Submit', { exact: true }).click();
		});

		await test.step('Display all entry data', async () => {
			const outputLines = await page.locator('#output p').allInnerTexts();
			console.log('Raw Output Lines:', outputLines);

			const reducedOutput = outputLines.map(item => item.split(':')[1]?.trim() ?? '');
			const expectedOutput = [userData.fullName, userData.email, userData.permanentAddress];

			console.log('Reduced Output:', reducedOutput);
			console.log('Expected Output:', expectedOutput);

			expect(reducedOutput).toEqual(expectedOutput);
		});
	});

	test('TC7 Validar ingresar datos válidos en el formulario dejando el campo "Email" (sin alfanumérico después del \'@\') y el "Current Address" vacío', async ({ page }) => {
		const userData = data[4] as {
            fullName: string;
            email: string;
            currentAddress: string;
            permanentAddress: string;
        };

		await page.getByPlaceholder('Full Name').fill(userData.fullName);
		await page.locator('#userEmail').fill(userData.email);
		await page.locator('#permanentAddress').fill(userData.permanentAddress);

		await test.step('Click on submit button', async () => {
			await page.getByText('Submit', { exact: true }).click();
		});

		await test.step('Verify invalid email behavior', async () => {
			const emailField = await page.locator('#userEmail');
			expect(await emailField.isVisible()).toBe(true);
		});
	});

	test('TC9 Validar ingresar datos válidos en el formulario con "Permanent Address" vacío', async ({ page }) => {
		const userData = data[5] as {
            fullName: string;
            email: string;
            currentAddress: string;
            permanentAddress: string;
        };

		await page.getByPlaceholder('Full Name').fill(userData.fullName);
		await page.locator('#userEmail').fill(userData.email);
		await page.locator('#currentAddress').fill(userData.currentAddress);

		await test.step('Click on submit button', async () => {
			await page.getByText('Submit', { exact: true }).click();
		});

		await test.step('Display all entry data', async () => {
			const outputLines = await page.locator('#output p').allInnerTexts();
			const reducedOutput = outputLines.map(item => item.split(':')[1]?.trim() ?? '');
			const expectedOutput = [data[5].fullName, data[5].email, data[5].currentAddress];

			console.log('Reduced Output:', reducedOutput);
			console.log('Expected Output:', expectedOutput);

			expect(reducedOutput).toEqual(expectedOutput);
		});
	});

	test('TC11 Validar ingresar datos válidos en el formulario con "Email" y "Permanent Address" vacíos', async ({ page }) => {
		const userData = data[6] as {
            fullName: string;
            email: string;
            currentAddress: string;
            permanentAddress: string;
        };

		await page.getByPlaceholder('Full Name').fill(userData.fullName);
		await page.locator('#currentAddress').fill(userData.currentAddress);

		await test.step('Click on submit button', async () => {
			await page.getByText('Submit', { exact: true }).click();
		});

		await test.step('Display all entry data', async () => {
			const outputLines = await page.locator('#output p').allInnerTexts();
			const reducedOutput = outputLines.map(item => item.split(':')[1]?.trim() ?? '');
			const expectedOutput = [data[6].fullName, data[6].currentAddress];

			console.log('Reduced Output:', reducedOutput);
			console.log('Expected Output:', expectedOutput);

			expect(reducedOutput).toEqual(expectedOutput);
		});
	});

	test('TC13 Validar ingresar datos válidos en el formulario con "Current Address" y "Permanent Address" vacíos', async ({ page }) => {
		const userData = data[7] as {
            fullName: string;
            email: string;
        };

		await page.getByPlaceholder('Full Name').fill(userData.fullName);
		await page.locator('#userEmail').fill(userData.email);

		await test.step('Click on submit button', async () => {
			await page.getByText('Submit', { exact: true }).click();
		});

		await test.step('Display all entry data', async () => {
			const outputLines = await page.locator('#output p').allInnerTexts();
			console.log('Raw Output Lines:', outputLines);

			const reducedOutput = outputLines.map(item => item.split(':')[1]?.trim() ?? '');
			const expectedOutput = [data[7].fullName, data[7].email];

			console.log('Reduced Output:', reducedOutput);
			console.log('Expected Output:', expectedOutput);

			expect(reducedOutput).toEqual(expectedOutput);
		});
	});

	test('TC15 Validar ingresar datos válidos en el formulario con "Full Name", "Email" y "Permanent Address" vacíos', async ({ page }) => {

		const userData = data[8] as {
    fullName: string;
    email: string;
    currentAddress: string;
    permanentAddress: string;
};

		
		await page.locator('#currentAddress').fill(userData.currentAddress);
		
		await test.step('Click on submit button', async () => {
			await page.getByText('Submit', { exact: true }).click();
		});

		await test.step('Display all entry data', async () => {
			const outputLines = await page.locator('#output p').allInnerTexts();
			const reducedOutput = outputLines.map(item => item.split(':')[1]?.trim() ?? '');
			const expectedOutput = [data[8].currentAddress];

			expect(reducedOutput).toEqual(expectedOutput);
		});
	});
});
