import { story, test, expect } from '@TestBase';


story('GX-3770: ToolsQA | Elements | Checkbox -', () => {
	test.beforeEach(async ({ page }) => {
		// Navega a la página de demoqa.com/checkbox antes de cada prueba
		await page.goto('https://demoqa.com/checkbox');
	});

	test('TC1: Verificar la funcionalidad "Expandir Todo"', async ({ page }) => {
		// Haz clic en el botón Expandir Todo
		await page.locator('.rct-option-expand-all').click();

		// Se observa los elementos checkbox expandidos
		const checkboxes = [
			'Desktop', 'Documents', 'Downloads', 'Notes', 'Commands', 'WorkSpace',
			'Office', 'React', 'Angular', 'Veu', 'Public', 'Private', 'Classified',
			'General', 'Word File.doc', 'Excel File.doc'
		];

		for (const checkbox of checkboxes) {
			const checkboxLocator = page.locator(`.rct-node .rct-title:text("${checkbox}")`);
			await expect(checkboxLocator).toBeVisible();
		}
	});

	test('TC2: Verificar la funcionalidad "Colapsar Todo"', async ({ page }) => {
		// Haz clic en el botón Colapsar Todo
		await page.locator('.rct-option-collapse-all').click();

        
		const homeLocator = page.locator('.rct-node .rct-title:text("Home")');
		await expect(homeLocator).toBeVisible();

       
		const checkboxes = [
			'Desktop', 'Documents', 'Downloads', 'Notes', 'Commands', 'WorkSpace',
			'Office', 'React', 'Angular', 'Veu', 'Public', 'Private', 'Classified',
			'General', 'Word File.doc', 'Excel File.doc'
		];

		for (const checkbox of checkboxes) {
			const checkboxLocator = page.locator(`.rct-node .rct-title:text("${checkbox}")`);
			await expect(checkboxLocator).not.toBeVisible();
		}
	});

	test('TC3: Verificar el toggle de cada carpeta "desktop"', async ({ page }) => {
		await page.locator('.rct-option-expand-all').click();
		const desktopToggle = page.locator('label').filter({ hasText: 'Desktop' }).getByRole('img').nth(1);
		const displayResult = page.locator('div.display-result.mt-4 span.text-success:has-text("desktop")');
		await desktopToggle.waitFor({ state: 'visible' });
		await desktopToggle.click();

		await expect (displayResult).toBeVisible();

       
	});



	test('TC4: Verificar  todos los  checkbox  interiores esten marcados  clickear la carpeta  "Home"', async ({ page }) => {
        
		await page.locator('.rct-option-expand-all').click();
    
       
		const homeCheckbox = page.getByText('Home');
        
		await homeCheckbox.click();
    
        
		const checkboxes = [
			'home','Desktop', 'Documents', 'Downloads', 'Notes', 'Commands', 'WorkSpace',
			'Office', 'React', 'Angular', 'Veu', 'Public', 'Private', 'Classified',
			'General', 'Word File.doc', 'Excel File.doc'
		];
    
		for (const checkbox of checkboxes) {
			const checkboxLocator = page.locator('.check-box-tree-wrapper');
            

           
		}
	});
    
	test('TC5: Verificar que se muestra la palabra "desktop, al clickear la carpeta Desktop', async ({ page }) => {
		await page.locator('.rct-option-expand-all').click();

		const desktopCheckbox = page.getByText('Desktop');
        
		await desktopCheckbox.click();

		const successMessage = page.locator('.display-result.mt-4');
		await expect(successMessage).toContainText('desktop');
	});
});
