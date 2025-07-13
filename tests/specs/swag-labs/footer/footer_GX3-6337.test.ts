
import { story, test, precondition, expect } from '@pages/TestBase';



story('GX3-6312: [Automation] SwagLabs | Checkout Info | Insertar información del comprador', async () => {
	precondition( async ({ page, swagLoginPage })=>{
		
		await swagLoginPage.gotoPage();
		await swagLoginPage.login();
		await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
		
	});


	test('TC01: Validate that the user can access Twitter social media', async ({ page, swagSocialMediaPage }) => {
		console.log('🎭️ ---- Starting TC1');

		await test.step('Click on Twitter icon', async () => {
			    // Listen for the new page event before clicking
				await expect(swagSocialMediaPage.twitterIcon()).toBeVisible();
    			const [newPage] = await Promise.all([
				page.context().waitForEvent('page'),
				swagSocialMediaPage.clickonIcons('twitter'), // This triggers the new tab
				]);
				await newPage.waitForLoadState();

		await test.step('Verify the new tab URL is Twitter', async () => {
				await expect(newPage).toHaveURL('https://x.com/saucelabs');
					});
		})
				
	});

	test('TC02: Validate that the user can access to Facebook social media', async ({  page, swagSocialMediaPage })=>{
		console.log('🎭️ ---- Starting TC2');
		
		await test.step('Click on Facebook icon', async () => {
				await expect(swagSocialMediaPage.facebookIcon()).toBeVisible();
			    // Listen for the new page event before clicking
    			const [newPage] = await Promise.all([
				page.context().waitForEvent('page'),
				swagSocialMediaPage.clickonIcons('facebook'), // This triggers the new tab
				]);
				await newPage.waitForLoadState();

		await test.step('Verify the new tab URL is Facebook', async () => {
				await expect(newPage).toHaveURL('https://www.facebook.com/saucelabs');
					});
		})
		
	});

	test('TC03: Validate that the user can access LinkedIn social media', async ({ page, swagSocialMediaPage })=>{
		console.log('🎭️ ---- Starting TC3');

		await test.step('Click on LinkedIn icon', async () => {
				await expect(swagSocialMediaPage.linkedInIcon()).toBeVisible();
			    // Listen for the new page event before clicking
    			const [newPage] = await Promise.all([
				page.context().waitForEvent('page'),
				swagSocialMediaPage.clickonIcons('linkedIn'), // This triggers the new tab
				]);
				await newPage.waitForLoadState();

		await test.step('Verify the new tab URL is LinkedIn', async () => {
				await expect(newPage).toHaveURL('https://www.linkedin.com/company/sauce-labs/');
					});
		})

	});
});