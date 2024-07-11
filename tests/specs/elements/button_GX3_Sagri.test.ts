import { expect, precondition, story, test } from '@pages/TestBase';

story('GX3-1290: Elements Buttons', () => {

	//Preconditions antes de cada test
	precondition(async ({ page }) => {
		await page.goto('/buttons', { waitUntil: 'domcontentloaded' });
	});

	test('TC1: Debería activarse al hacer doble click', async ({ page }) => {

		const expectedMessage = await test.step('Perform Double Click on Button', async () => {
			await page.locator('#doubleClickBtn').dblclick();

			const expectedMessage = 'You have done a double click';
			
			return expectedMessage;
		});

		await test.step('Verifica el mensaje', async () => {
			const messageElement = page.locator('#doubleClickMessage');
			await expect(messageElement).toHaveText(expectedMessage);
		});
	
	});

	test('TC2: Debería activarse al hacer click derecho', async ({ page }) => {
		const expectedMessage = await test.step('Perform Right Click on Button', async () => {
			await page.locator('#rightClickBtn').click({ button: 'right' });

			const expectedMessage = 'You have done a right click';
			
			return expectedMessage;
		});

		await test.step('Verifica el mensaje', async () => {
			const messageElement = page.locator('#rightClickMessage');
			await expect(messageElement).toHaveText(expectedMessage);
		});
	});

	test('TC3: Debería activarse al hacer click simple', async ({ page }) => {
		const expectedMessage = await test.step('Perform Simple Click on Button', async () => {
			await page.getByText('Click Me', { exact: true }).click({ button: 'left' });

			const expectedMessage = 'You have done a dynamic click';
			
			return expectedMessage;
		});

		await test.step('Verifica el mensaje', async () => {
			const messageElement = page.locator('#dynamicClickMessage');
			await expect(messageElement).toHaveText(expectedMessage);
		});
	});

	test('TC4: Debería validar todos los mensajes correspondientes atraves de los botones', async ({ page }) => {
		const expectedDblClickMessage = await test.step('Perform Double Click on Button', async () => {
			await page.locator('#doubleClickBtn').dblclick();

			const expectedMessage = 'You have done a double click';
			
			return expectedMessage;
		});

		await test.step('Verifica el mensaje', async () => {
			const messageElement = page.locator('#doubleClickMessage');
			await expect(messageElement).toHaveText(expectedDblClickMessage);
		});

		const expectedRightClickMessage = await test.step('Perform Right Click on Button', async () => {
			await page.locator('#rightClickBtn').click({ button: 'right' });

			const expectedMessage = 'You have done a right click';
			
			return expectedMessage;
		});

		await test.step('Verifica el mensaje', async () => {
			const messageElement = page.locator('#rightClickMessage');
			await expect(messageElement).toHaveText(expectedRightClickMessage);
		});

		const expectedClickMessage = await test.step('Perform Simple Click on Button', async () => {
			await page.getByText('Click Me', { exact: true }).click({ button: 'left' });

			const expectedMessage = 'You have done a dynamic click';
			
			return expectedMessage;
		});

		await test.step('Verifica el mensaje', async () => {
			const messageElement = page.locator('#dynamicClickMessage');
			await expect(messageElement).toHaveText(expectedClickMessage);
		});

	});

});