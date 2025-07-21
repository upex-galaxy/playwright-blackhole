import { story, test, precondition, expect } from '@pages/TestBase';



story('GX3-6312: [Automation] SwagLabs | Checkout Info | Insertar información del comprador', async () => {
	precondition( async ({ swagLoginPage }) => {
		console.log('🎭️ ---- Starting precondition');
		await swagLoginPage.gotoPage();
		await swagLoginPage.login();		
	}),

	test('TC01: Validate burguer menu has all options: All items, About, Logout, Reset App State', async ({ swagBurguerMenuPage }) => {
			console.log('🎭️ ---- Starting TC1');
			await test.step('Click on Burguer Menu', async () => {
				await swagBurguerMenuPage.gotoMenu();
				await expect(swagBurguerMenuPage.menuButton()).toBeVisible();
			});

			await test.step('Validate options are visible', async () => {
				await expect(swagBurguerMenuPage.allItems()).toBeVisible();
				await expect(swagBurguerMenuPage.about()).toBeVisible();	
				await expect(swagBurguerMenuPage.logoutbutton()).toBeVisible();
				await expect(swagBurguerMenuPage.resetOption()).toBeVisible();
			});
	});
	
	test('TC02: Validate users are logged out when clicking the Logout option', async ({ swagBurguerMenuPage }) => {
			console.log('🎭️ ---- Starting TC1');
			await test.step('Click on Burguer Menu', async () => {
				await swagBurguerMenuPage.gotoMenu();
				await expect(swagBurguerMenuPage.menuButton()).toBeVisible();
			});

			await test.step('Click on Logout', async () => {
				await swagBurguerMenuPage.clickLogout();
				const title = await swagBurguerMenuPage.getTitlePage();
				expect(title).toBe('Swag Labs');
			});
	});	


	test('TC03: Validate users have access to All Items by clicking on the dropdown menu', async ({ swagBurguerMenuPage })=>{
			console.log('🎭️ ---- Starting TC1');
			await test.step('Click on Burguer Menu', async () => {
				await swagBurguerMenuPage.gotoMenu();
				await expect(swagBurguerMenuPage.menuButton()).toBeVisible();
			});

			await test.step('Click on All Items', async () => {
				await swagBurguerMenuPage.clickAllItems();
				const title = await swagBurguerMenuPage.getTitlePageClass();
				expect(title).toBe('Products');
			});
	});

	test('TC04: Validate users have access to About by clicking on the dropdown menu', async ({ swagBurguerMenuPage })=>{
			console.log('🎭️ ---- Starting TC2');
			await test.step('Click on Burguer Menu', async () => {
				await swagBurguerMenuPage.gotoMenu();
				await expect(swagBurguerMenuPage.menuButton()).toBeVisible();
			});

			await test.step('Click on About', async () => {
				await swagBurguerMenuPage.clickAbout();
				const title = await swagBurguerMenuPage.getTitlePage();
				await expect(title).toBe('Sauce Labs: Cross Browser Testing, Selenium Testing & Mobile Testing');
			});
		
		
	});

	test('TC05: Validate webpage is reset when clicking Reset App when there are no items in the Cart ', async ({ swagBurguerMenuPage })=>{
			console.log('🎭️ ---- Starting TC4');
			await test.step('Click on Burguer Menu', async () => {
				await swagBurguerMenuPage.gotoMenu();
				await expect(swagBurguerMenuPage.menuButton()).toBeVisible();
			});

			await test.step('Click on Reset App', async () => {
				await swagBurguerMenuPage.clickResetApp();
				const title = await swagBurguerMenuPage.getTitlePage();
				expect(title).toBe('Swag Labs');
			});

			await test.step('Validate Cart Icon Count', async () => {
				expect(swagBurguerMenuPage.cartIconLocator()).not.toBeVisible();
			});	
	});

	test('TC06: Validate webpage is reset when clicking Reset App when there are items in the Cart', async ({ swagBurguerMenuPage }) => {
			console.log('🎭️ ---- Starting TC5');
			await test.step('Click on Add to Cart', async () => {
				await swagBurguerMenuPage.clickAddToCart();
				const cartCount = await swagBurguerMenuPage.getCartIconCount();
				expect(cartCount).toBe('1');
			});

			await test.step('Click on Burguer Menu', async () => {
				await swagBurguerMenuPage.gotoMenu();
				await expect(swagBurguerMenuPage.menuButton()).toBeVisible();
			});

			await test.step('Click on Reset App', async () => {
				await swagBurguerMenuPage.clickResetApp();
				const title = await swagBurguerMenuPage.getTitlePage();
				expect(title).toBe('Swag Labs');
			});

			await test.step('Validate Cart Icon Count', async () => {
				expect(swagBurguerMenuPage.cartIconLocator()).not.toBeVisible();
			});	
	
	});

	test('TC07: Validate burger menu opens and closes correctly', async ({ swagBurguerMenuPage })=>{
			console.log('🎭️ ---- Starting TC7');
			await test.step('Click on Burguer Menu', async () => {
				await swagBurguerMenuPage.gotoMenu();
				await expect(swagBurguerMenuPage.menuButton()).toBeVisible();
			});
			await test.step('Click on close Burguer Menu', async () => {
				await swagBurguerMenuPage.clickCloseBurguerMenu();
				await expect(swagBurguerMenuPage.menuBox()).not.toBeVisible();
				const title = await swagBurguerMenuPage.getTitlePage();				
				expect(title).toBe('Swag Labs');
			});

	});


		
});