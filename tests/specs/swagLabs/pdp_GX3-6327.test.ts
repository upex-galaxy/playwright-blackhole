import { SwagProductDetailsPage } from '@pages/SwagProductDetailsPage';
import { story, test, precondition, expect } from '@pages/TestBase';
import { random } from 'lodash';



story('GX3-6327: [Automation] SwagLabs | PDP | Visualizar Detalles del Item (Producto)', async () => {
	
	precondition( async ({ swagLoginPage })=>{
		
		await swagLoginPage.gotoPage();
		await swagLoginPage.login();
		
	});
	

	test("TC1: Validate product's details by clicking on product's name", async ({ swagProductDetailsPage, page  }) => {
		console.log('🎭️ ---- Starting TC1');

		let randomProduct: {
			title: string | null;
			description: string | null;
			image: string | null;
			price: string | null;
		};

		await test.step('Click on a random product\'s name', async () => {
			randomProduct = await swagProductDetailsPage.getRandomProductFromList();
			if (randomProduct.title) {
				await swagProductDetailsPage.clickProductByName(randomProduct.title);
			} else {
				throw new Error("Random product title is null");
			}
		});

		await test.step('Check if the product\'s details are displayed', async () => {
			
			await expect(swagProductDetailsPage.productTitle()).toHaveText(randomProduct.title ?? '');
			await expect(swagProductDetailsPage.addCartButton()).toBeVisible();
			await expect(swagProductDetailsPage.addCartButton()).toBeEnabled();
			await expect(swagProductDetailsPage.productDescription()).toBeVisible();
			await expect(swagProductDetailsPage.productDescription()).toHaveText(randomProduct.description ?? '');
			await expect(swagProductDetailsPage.backProductButton()).toBeVisible();
			await expect(swagProductDetailsPage.productImage()).toBeVisible();
			await expect(swagProductDetailsPage.productImage()).toHaveAttribute(randomProduct.image ? 'src' : '', randomProduct.image ?? '');
			await expect(swagProductDetailsPage.productPrice()).toHaveText(randomProduct.price ?? '');
			await expect(swagProductDetailsPage.addCartButton()).toBeVisible();

		});

	});

	test("TC2: Validate product's details by clicking on product's image", async ({  swagProductDetailsPage })=>{
		console.log('🎭️ ---- Starting TC2');

		let randomProduct: {
			title: string | null;
			description: string | null;
			image: string | null;
			price: string | null;
		};

		await test.step('Click on a random product\'s image', async () => {
			randomProduct = await swagProductDetailsPage.getRandomProductFromList();
			if (randomProduct.title) {
				await swagProductDetailsPage.clickProductByImage(randomProduct.title);
			} else {
				throw new Error("Random product title is null");
			}
		});

		await test.step('Check if the product\'s details are displayed', async () => {

			await expect(swagProductDetailsPage.productTitle()).toHaveText(randomProduct.title ?? '');
			await expect(swagProductDetailsPage.addCartButton()).toBeVisible();
			await expect(swagProductDetailsPage.addCartButton()).toBeEnabled();
			await expect(swagProductDetailsPage.productDescription()).toBeVisible();
			await expect(swagProductDetailsPage.productDescription()).toHaveText(randomProduct.description ?? '');
			await expect(swagProductDetailsPage.backProductButton()).toBeVisible();
			await expect(swagProductDetailsPage.productImage()).toBeVisible();
			await expect(swagProductDetailsPage.productImage()).toHaveAttribute(randomProduct.image ? 'src' : '', randomProduct.image ?? '');
			await expect(swagProductDetailsPage.productPrice()).toHaveText(randomProduct.price ?? '');
			await expect(swagProductDetailsPage.addCartButton()).toBeVisible();

		});

	});

});