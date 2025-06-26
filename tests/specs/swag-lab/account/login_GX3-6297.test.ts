import { SwagLoginPage } from '@pages/SwagLoginPage';
import { story, test, precondition, expect } from '@pages/TestBase';
import * as dotenv from 'dotenv';
dotenv.config();


const credentials = {
	username: process.env.STANDARD_USER || "",
	password: process.env.STANDARD_PASSWORD || "",
	lockedUsername: process.env.LOCKED_USER || "",
	nonExistingUsername: process.env.NONEXISTENT_USER || "",
	nonExistingPassword: process.env.NONEXISTENT_PASSWORD || "",
	emptyUsername: "",
	emptyPassword: ""
}

const urlsList = [ 
			"https://www.saucedemo.com/checkout-step-one.html", 
			"https://www.saucedemo.com/cart.html",
			"https://www.saucedemo.com/checkout-step-two.html",
			"https://www.saucedemo.com/checkout-complete.html",
			"https://www.saucedemo.com/inventory.html",
			"https://www.saucedemo.com/inventory-item.html?id=4",
			"https://www.saucedemo.com/inventory-item.html?id=2"
]



story('GX3-6286: Swag Lab - Filter products of PLP ', async () => {
	precondition( async ({ swagLoginPage })=>{
		console.log('🎭️ ---- Starting Precondition');
		await swagLoginPage.gotoPage();
	});

	test('TC1:Check user can log in when providing valid credentials', async ({ swagLoginPage})=>{
		console.log('🎭️ ---- Starting TC1');
		await swagLoginPage.login(credentials.username, credentials.password);
		expect(await swagLoginPage.page.url()).toContain('inventory.html');
	});

	test('TC2:Check locked user can not log into', async ({ swagLoginPage })=>{
		console.log('🎭️ ---- Starting TC2');
		await swagLoginPage.login(credentials.lockedUsername, credentials.password);
		const errorMessage = await swagLoginPage.getErrorMessage();
		expect(errorMessage).toContain("Epic sadface: Sorry, this user has been locked out.");
		
	});

	test('TC3:Check user can not log in using incorrect or nonexistent username', async ({ swagLoginPage })=>{
		console.log('🎭️ ---- Starting TC3');
		await swagLoginPage.login(credentials.nonExistingUsername, credentials.password);
		const errorMessage = await swagLoginPage.getErrorMessage();
		expect(errorMessage).toContain("Epic sadface: Username and password do not match any user in this service");
		
	});

	test('TC4:Check user can not  log in using an incorrect or nonexistent password', async ({ swagLoginPage })=>{
		console.log('🎭️ ---- Starting TC4');
		await swagLoginPage.login(credentials.username, credentials.nonExistingPassword);
		const errorMessage = await swagLoginPage.getErrorMessage();
		expect(errorMessage).toContain("Epic sadface: Username and password do not match any user in this service");
		
	});

	test('TC5:Check user ca not log in using an incorrect or nonexistent username and password', async ({ swagLoginPage })=>{
		console.log('🎭️ ---- Starting TC5');
		await swagLoginPage.login(credentials.nonExistingUsername, credentials.nonExistingPassword);
		const errorMessage = await swagLoginPage.getErrorMessage();
		expect(errorMessage).toContain("Epic sadface: Username and password do not match any user in this service");
	});

		test('TC6:Check user can not log in when leaving the username empty in the form', async ({ swagLoginPage })=>{
		console.log('🎭️ ---- Starting TC6');
		await swagLoginPage.login(credentials.emptyUsername, credentials.password);
		const errorMessage = await swagLoginPage.getErrorMessage();
		expect(errorMessage).toContain("Epic sadface: Username is required");
	});

		test('TC7:Check user can not log in when leaving the password empty in the form', async ({ swagLoginPage })=>{
		console.log('🎭️ ---- Starting TC7');
		await swagLoginPage.login(credentials.username, credentials.emptyPassword);
		const errorMessage = await swagLoginPage.getErrorMessage();
		expect(errorMessage).toContain("Epic sadface: Password is required");
	});

		test('TC8:Check user can not log in when leaving the username and password empty in the form', async ({ swagLoginPage })=>{
		console.log('🎭️ ---- Starting TC8');
		await swagLoginPage.login(credentials.emptyUsername, credentials.emptyPassword);
		const errorMessage = await swagLoginPage.getErrorMessage();
		expect(errorMessage).toContain("Epic sadface: Username is required");
	});

		test('TC9:Check user can not access to any of the endpoints if user is not log in', async ({ swagLoginPage })=>{
		console.log('🎭️ ---- Starting TC9');

		for ( const url of urlsList) {
			await swagLoginPage.accesstoPages(url);
			const errorMessage = await swagLoginPage.getErrorMessage();
			const expectedError = await swagLoginPage.getExpectedAccessError(url);
    		expect(errorMessage).toContain(expectedError);
		}
		
		
		
	});
});