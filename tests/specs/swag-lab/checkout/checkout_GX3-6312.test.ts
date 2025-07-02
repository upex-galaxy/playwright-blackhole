import { SwagLoginPage } from '@pages/SwagLoginPage';
import { SwagAddProductsPage } from '@pages/SwagAddProductsPage';
import { SwagCheckoutPage } from '@pages/SwagCheckoutPage';
import { story, test, precondition, expect } from '@pages/TestBase';

	const checkoutuser = {
	firstName: "Christian",
	lastName:"Martinez",
	zip:"1234"  ,
	zip_special:"@#$%/1234",
	empty: null,
	firstName_special: "!@#$%^Christian&*()_+",
	lastName_special: "!@#$%^Martinez&*()_+"
}

story('GX3-6312: [Automation] SwagLabs | Checkout Info | Insertar información del comprador', async () => {
	precondition( async ({ swagLoginPage, swagAddProducts, swagCheckout })=>{
		
		await swagLoginPage.gotoPage();
		await swagLoginPage.login();
		
		await swagAddProducts.addProducts();
		await swagCheckout.gotoStepOne();
	});


	test('TC01: Verify users fill out the form with correct info in every field', async ({ swagCheckout, page })=>{
		console.log('🎭️ ---- Starting TC1');

		await test.step('Fill out valid information', async () => {
			await swagCheckout.filloutInfo(checkoutuser.firstName, checkoutuser.lastName, checkoutuser.zip);
		});

		await test.step('Click on Continue', async () => {
			await swagCheckout.continue();
			await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
		});

	});

	test('TC02: Verify zip/postal code with special characters', async ({ swagCheckout , page })=>{
		console.log('🎭️ ---- Starting TC2');
		
		await test.step('Fill out valid information', async () => {
			await swagCheckout.filloutInfo(checkoutuser.firstName, checkoutuser.lastName, checkoutuser.zip_special);
		});

		await test.step('Click on Continue', async () => {
			await swagCheckout.continue();
			await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
		});
		
	});

	test('TC03: Verify users click on continue when all field are empty', async ({ swagCheckout })=>{
		console.log('🎭️ ---- Starting TC3');

		await test.step('Fill out valid information', async () => {
			await swagCheckout.filloutInfo(checkoutuser.empty, checkoutuser.empty, checkoutuser.empty);
		});

		await test.step('Click on Continue', async () => {
			await swagCheckout.continue();
			const errorMessage = await swagCheckout.getErrorMessage();
			expect(errorMessage).toContain("Error: First Name is required");
		});
		
	});

	test('TC04: Verify the field "first name" with special characters and other fields with the right info', async ({ swagCheckout, page })=>{
		console.log('🎭️ ---- Starting TC4');

		await test.step('Fill out valid information', async () => {
			await swagCheckout.filloutInfo(checkoutuser.firstName_special, checkoutuser.lastName, checkoutuser.zip);
		});

		await test.step('Click on Continue', async () => {
			await swagCheckout.continue();
			await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
		});
	});

	test('TC05: Verify field "lastname" with special characters and other fields with the right info ', async ({ swagCheckout, page })=>{
		console.log('🎭️ ---- Starting TC5');

		await test.step('Fill out valid information', async () => {
			await swagCheckout.filloutInfo(checkoutuser.firstName, checkoutuser.lastName_special, checkoutuser.zip);
		});

		await test.step('Click on Continue', async () => {
			await swagCheckout.continue();
			await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
		});

	});

		test(' TC06: Verify button "Cancel" is working as expected', async ({ swagCheckout, page })=>{
		console.log('🎭️ ---- Starting TC6');

		await test.step('Fill out valid information', async () => {
			await swagCheckout.filloutInfo(checkoutuser.firstName, checkoutuser.lastName, checkoutuser.zip);
		});

		await test.step('Click on Cancel', async () => {
			await swagCheckout.cancel();
			await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
		});

	});



		test('TC07: Verify when users leave field { First name, Last name, zip/ postal code} empty and other fields are filled with valid info', async ({ swagCheckout, page }) => {
		console.log('🎭️ ---- Starting TC7');

		const emptyCases = [
			{ first: checkoutuser.empty, last: checkoutuser.lastName, zip: checkoutuser.zip },
			{ first: checkoutuser.firstName, last: checkoutuser.empty, zip: checkoutuser.zip },
			{ first: checkoutuser.firstName, last: checkoutuser.lastName, zip: checkoutuser.empty },
		];

		for (const [i, { first, last, zip }] of emptyCases.entries()) {
			
			await page.goto('https://www.saucedemo.com/checkout-step-one.html');

			await test.step(`Repetition ${i + 1}: Fill out info`, async () => {
				await swagCheckout.filloutInfo(first, last, zip);
			});

			await test.step(`Repetition ${i + 1}: Click on Continue`, async () => {
				await swagCheckout.continue();
				const errorMessage = await swagCheckout.getErrorMessage();
				expect(errorMessage).toContain("Error:");
			});
		}
	});



		
});