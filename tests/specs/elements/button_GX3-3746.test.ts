import { precondition, story, test, expect } from '@pages/TestBase';

//  Test Suite 
story ('GX3-3746: Element Buttons', () => {

	//precondition
	precondition( async ({ page }) => {
		await page.goto('/buttons',{ waitUntil:'domcontentloaded' });
	});
	
	test ('TC1: should trigger when using Double click', async ({ page }) => {
		// *Given (precondicion)
		
		const expectMessage= await test.step ('Perform Click on Double Click Button', async () => {
			const expectMessage ='You have done a double click';
			await page.locator('#doubleClickBtn').dblclick();
			return expectMessage;
		});
		await test.step ('Verify the message', async () => {
		// *Then (asercion)
			const messageElement= page.locator('#doubleClickMessage');
			await expect (messageElement).toHaveText(expectMessage);
		});
	});
	test ('TC2: should trigger when using  Right Click', async ({ page }) => {
		const expectMessage= await test.step ('Perform Click on Right Click', async () => {
			const expectMessage ='You have done a right click';
			await page.locator('#rightClickBtn').click({ button:'right' });
			return expectMessage;
		});
		await test.step ('Verify the message', async () => {
		// *Then (asercion)
			const messageElement= page.locator('#rightClickMessage');
			await expect (messageElement).toHaveText(expectMessage);
		});
	});
	test ('TC3: should trigger when using  ClickMessage', async ({ page }) => {
		const expectMessage= await test.step ('Perform Click on ClickMessage', async () => {
			const expectMessage ='You have done a dynamic click';
			await page.getByText('Click Me',{ exact:true }).click({ button:'left' }); // trabaja con el texto y busca exactitud
			return expectMessage;
		});
		await test.step ('Verify the message', async () => {
		// *Then (asercion)
			const messageElement= page.locator('#dynamicClickMessage');
			await expect (messageElement).toHaveText(expectMessage);
		});
	});
	
	test ('TC4: should trigger corresponent message by each button ', async ({ page }) => {
		const expectDoubleClick= await test.step ('Perform Click on Double Click Button', async () => {
			const expectMessage ='You have done a double click';
			await page.locator('#doubleClickBtn').dblclick();
			return expectMessage;
		});
		await test.step ('Verify the message', async () => {
		// *Then (asercion)
			const messageElement= page.locator('#doubleClickMessage');
			await expect (messageElement).toHaveText(expectDoubleClick);
		});

		const expectRightClick= await test.step ('Perform Click on Right Click', async () => {
			const expectMessage ='You have done a right click';
			await page.locator('#rightClickBtn').click({ button:'right' });
			return expectMessage;
		});
		await test.step ('Verify the message', async () => {
		// *Then (asercion)
			const messageElement= page.locator('#rightClickMessage');
			await expect (messageElement).toHaveText(expectRightClick);
		});

		const expectMessage= await test.step ('Perform Click on ClickMessage', async () => {
			const expectMessage ='You have done a dynamic click';
			await page.getByText('Click Me',{ exact:true }).click({ button:'left' }); // trabaja con el texto y busca exactitud
			return expectMessage;
		});
		await test.step ('Verify the message', async () => {
		// *Then (asercion)
			const messageElement= page.locator('#dynamicClickMessage');
			await expect (messageElement).toHaveText(expectMessage);
		});
	});
});
