import { story, test, precondition, expect } from '@pages/TestBaseSwag';


story('GX3-6286: Swag Lab - Filter products of PLP ', async () => {

	precondition( async ({ swagLoginPage })=>{
		console.log('🎭️ ---- Starting Precondition');
		await swagLoginPage.loginSuccess();
		expect(swagLoginPage.page.url()).toContain('inventory.html');	

	});

	test('TC1:User filters products by name in descending order', async ({ swagFilterPage })=>{
		console.log('🎭️ ---- Starting TC1');
		const expected = await swagFilterPage.getExpectedNames("za");
		await swagFilterPage.selectFilter("za");
		const itemNames = await swagFilterPage.getItemNames();
		await swagFilterPage.validateItems(expected);
	});

	test('TC2:User filters products by name ascending order', async ({ swagFilterPage })=>{
		console.log('🎭️ ---- Starting TC2');
		const expected = await swagFilterPage.getExpectedNames("az");
		await swagFilterPage.selectFilter("az");
		const itemNames = await swagFilterPage.getItemNames();
		console.log(itemNames);
		await swagFilterPage.validateItems(expected);
	});

	test('TC3:User filters product by price in ascending order', async ({ swagFilterPage })=>{
		console.log('🎭️ ---- Starting TC3');
		const expected = await swagFilterPage.getExpectedPrice("lohi");
		await swagFilterPage.selectFilter("lohi");
		const itemNames = await swagFilterPage.getItemNames();
		console.log(itemNames);
		await swagFilterPage.validateItems(expected);
		
	});

	test('TC4:User filters product by price in descending order', async ({ swagFilterPage })=>{
		console.log('🎭️ ---- Starting TC4');
		const expected = await swagFilterPage.getExpectedPrice("hilo");
		await swagFilterPage.selectFilter("hilo");
		const itemNames = await swagFilterPage.getItemNames();
		console.log(itemNames);
		await swagFilterPage.validateItems(expected);
	});

});