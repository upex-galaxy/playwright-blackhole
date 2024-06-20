import { precondition, story, test, expect } from 'tests/pages/TestBase';

// Test Suite:
story('GX3-116: Elements_buttons', () => {
    
	// Precondiciones antes de cada test
	precondition(async ({ page }) => {
		await page.goto('/buttons');
	});

	// Test Case 1
	test('TC1: Debería validar mensaje al hacer doble clic en el boton', async ({ page }) => {
	// Declaro las variables
		const doubleClickButton = page.getByRole('button', { name: 'Double Click Me' });
		const ouputMessageDoubleClick = page.getByText('You have done a double click');
        
		// Realizo la acción
		await doubleClickButton.dblclick();

		// Obtengo resultado esperado
		await ouputMessageDoubleClick.isVisible();
	});
  
	// Test Case 2
	test('TC2: Debería validar al hacer clic derecho en el boton', async ({ page }) => {
		// Declaro las variables 
		const rightClickButton = page.locator('#rightClickBtn');
		const outputMessageRightClick = page.locator('#rightClickMessage');
		const expectedMessage = 'You have done a right click';

		// Realizo la acción 
		await rightClickButton.click({ button: 'right' });

		// Obtengo el resultado esperado
		await expect(outputMessageRightClick).toHaveText(expectedMessage);	
	});

	// Test Case 3
	test('TC3: Debería mensaje al hacer clic en el boton', async ({ page }) => {
		// Declaro las variables
		const clickMeButton = page.getByRole('button', { name: 'Click Me', exact: true });   
		const outputMessageClick = page.getByText('You have done a dynamic click');

		// Realizo la Acción
		await clickMeButton.click();

		// Obtengo el resultado esperado
		await expect(outputMessageClick).toHaveText('You have done a dynamic click');
	});

});
