import { story, test, precondition, expect } from '@TestBase';

// Test Suite 
story('GX3-1290 Element Buttons', () => {


    precondition(async ({ page }) => {
        await page.goto('/buttons', { waitUntil: 'domcontentloaded' });

    });

   test('TC1: Should trigger when using Double Click', async ({ page }) => {
	  //  <-- here
       const expectedMessage = await test.step('Perform Double Click on Button', async () => {
			const expectedMessage = 'You have done a double click';
			await page.locator('#doubleClickBtn').dblclick();
			return expectedMessage;
		});
		await test.step('Verify the message', async () => {
			const messageElement = page.locator('#doubleClickMessage');
			await expect(messageElement).toHaveText(expectedMessage);
		});
	});

    test('TC2:Should trigger when using Right Click', async ({ page }) => {

 
 const expectedMessage = await test.step('Perform Right Click on Button', async () => {
			const expectedMessage = 'You have done a right click';
			await page.locator('#rightClickBtn').click({ button: 'right' });
			return expectedMessage;
		});
		await test.step('Verify the message', async () => {
			const messageElement = page.locator('#rightClickMessage');
			await expect(messageElement).toHaveText(expectedMessage);
		});
    });

    test('TC3: Should trigger when using Simple Click', async ({ page }) => {
 
        const expectedMessage = await test.step('Perform simple Click on Button', async () => {
            const expectedMessage = 'You have done a dynamic click';
            await page.getByText('Click Me', { exact: true }).click();
            return expectedMessage;
        });
        await test.step('Verify the message', async () => {
            const messageElement = page.locator('#dynamicClickMessage');
            await expect(messageElement).toHaveText(expectedMessage);
        });
    });


    test('TC4: Should trigger corresponden messages by each button', async ({ page }) => {
    
        const expectedMessage = await test.step('Click on Double Click button', async () => {
            await page.locator('#doubleClickBtn').dblclick();
            const expectMessage = "You have done a double click"
            return expectMessage
        });
        test.step('Verify the message', async () => {
            const messageElement = page.locator('#doubleClickMessage')
            await expect(messageElement).toHaveText(expectedMessage) // se declara como return para que devuelva el valor
        });
              
  
        const expectedRigthMessage = await test.step('Click on Right Click button', async () => {
            await page.locator('#rightClickBtn').click({ button: 'right' })
            const expectMessage = "You have done a right click"
            return expectMessage
        });
        test.step('Verify the message', async () => {
            const messageElement = page.locator('#rightClickMessage')
            await expect(messageElement).toHaveText(expectedRigthMessage) // se declara como return para que devuelva el valor
        });

         const expectedSimpleMessage = await test.step('Perform simple Click on Button', async () => {
            const expectedMessage = 'You have done a dynamic click';
            await page.getByText('Click Me', { exact: true }).click();
            return expectedMessage;
        });
        await test.step('Verify the message', async () => {
            const messageElement = page.locator('#dynamicClickMessage');
            await expect(messageElement).toHaveText(expectedSimpleMessage);
        });
    });

});
