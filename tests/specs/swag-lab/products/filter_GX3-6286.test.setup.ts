import { story, test, precondition, expect } from '@pages/TestBaseSwag';

	const expectedItemsZA = [
			'Test.allTheThings() T-Shirt (Red)','Sauce Labs Onesie','Sauce Labs Fleece Jacket','Sauce Labs Bolt T-Shirt','Sauce Labs Bike Light','Sauce Labs Backpack'
		]
	const expectedItemsAZ = [
			'Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket','Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)'
		]
	const expectedItemsLOHI = [
			'Sauce Labs Onesie','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Test.allTheThings() T-Shirt (Red)','Sauce Labs Backpack','Sauce Labs Fleece Jacket'
		]
	const expectedItemsHILO = [
			'Sauce Labs Fleece Jacket','Sauce Labs Backpack','Sauce Labs Bolt T-Shirt','Test.allTheThings() T-Shirt (Red)','Sauce Labs Bike Light','Sauce Labs Onesie'
		]

story('GX3-6286: Swag Lab - Filter products of PLP ', async () => {

	precondition( async ({ swagLoginPage })=>{
		await swagLoginPage.loginSuccess();
		expect(swagLoginPage.page.url()).toContain('inventory.html');	

	});

	test('TC1:User filters products by name in descending order', async ({ swagFilter })=>{
		console.log('🎭️ ---- Starting first test');
		await swagFilter.selectFilter("za");
		const itemNames = await swagFilter.getItemNames();
		console.log(itemNames);
		await swagFilter.validateItems(expectedItemsZA);
	});

	test('TC2:User filters products by name ascending order', async ({ swagFilter })=>{
		console.log('🎭️ ---- Starting Setup: Login Session');
		await swagFilter.selectFilter("az");
		const itemNames = await swagFilter.getItemNames();
		console.log(itemNames);
		await swagFilter.validateItems(expectedItemsAZ);
	});

	test('TC3:User filters product by price in ascending order', async ({ swagFilter })=>{
		console.log('🎭️ ---- Starting Setup: Login Session');
		await swagFilter.selectFilter("lohi");
		const itemNames = await swagFilter.getItemNames();
		console.log(itemNames);
		await swagFilter.validateItems(expectedItemsLOHI);
		
	});

	test('TC4:User filters product by price in descending order', async ({ swagFilter })=>{
		console.log('🎭️ ---- Starting Setup: Login Session');
		await swagFilter.selectFilter("hilo");
		const itemNames = await swagFilter.getItemNames();
		console.log(itemNames);
		await swagFilter.validateItems(expectedItemsHILO);
	});
});