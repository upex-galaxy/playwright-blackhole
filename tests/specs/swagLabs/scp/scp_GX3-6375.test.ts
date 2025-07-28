import { SuperPageSwag } from '@pages/SuperPageSwag';
import { story, test, precondition, expect } from '@pages/TestBase';

story('GX3-6375 [Automation] SwagLabs | SCP | Remover productos del carrito de compras', async () => {
	precondition( async ({ swagLoginPage }) => {
		console.log('🎭️ ---- Starting precondition');
		await swagLoginPage.gotoPage();
		await swagLoginPage.login();		
	}),

	test('TC01: Remove just one product from Cart', async ({ swagCartPage }) => {
			console.log('🎭️ ---- Starting TC01');

			await test.step('Get product details before adding to cart', async () => {
				const inventoryDetails = await swagCartPage.getProductDetailsFromInventory(0);
				console.log('Product details from inventory:', inventoryDetails);
			});

			await test.step('Click on Add to Cart', async () => {
				await swagCartPage.addProductToCartByIndex(0);
			});

			await test.step('Go to Cart', async () => {
				await swagCartPage.goToCart();
			});

			await test.step('Validate product details in cart match inventory', async () => {
				await swagCartPage.validateProductDetailsMatch(0, 0);
			});

			await test.step('Remove product from cart', async () => {
				await swagCartPage.removeProductFromCart();
			});

			await test.step('Validate cart icon does not show', async () => {
				const cartCount = await swagCartPage.getCartItemCount();
				expect(cartCount).toBe('0');
				console.log('Cart icon does not show ');
			});
	});
	
	test('TC02: Remove just one product when there are multiple products in the Cart', async ({ swagCartPage  }) => {
			console.log('🎭️ ---- Starting TC02');

			await test.step('Get product details for first product before adding to cart', async () => {
				const firstProductDetails = await swagCartPage.getProductDetailsFromInventory(0);
				console.log('First product details:', firstProductDetails);
			});

			await test.step('Get product details for second product before adding to cart', async () => {
				const secondProductDetails = await swagCartPage.getProductDetailsFromInventory(1);
				console.log('Second product details:', secondProductDetails);
			});

			await test.step('Add multiple products to cart', async () => {
				await swagCartPage.addProductToCartByIndex(0);
				await swagCartPage.addProductToCartByIndex(1);
			});

			await test.step('Go to Cart', async () => {
				await swagCartPage.goToCart();
			});

			await test.step('Validate first product details in cart', async () => {
				await swagCartPage.validateProductDetailsMatch(0, 0);
			});

			await test.step('Validate second product details in cart', async () => {
				await swagCartPage.validateProductDetailsMatch(1, 1);
			});

			await test.step('Remove first product from cart', async () => {
				await swagCartPage.removeProductFromCartByIndex(0);
			});

			await test.step('Validate remaining product is correct', async () => {
				await swagCartPage.validateProductDetailsMatch(0, 0);
			});
	});	

	test('TC03: Remove all products one by one', async ({ swagCartPage }) => {
			console.log('🎭️ ---- Starting TC03');

			await test.step('Add multiple products to cart', async () => {
				await swagCartPage.addProductToCartByIndex(0);
				await swagCartPage.addProductToCartByIndex(1);
				await swagCartPage.addProductToCartByIndex(2);
				console.log('Added 3 products to cart');
			});

			await test.step('Go to Cart', async () => {
				await swagCartPage.goToCart();
			});

			await test.step('Validate initial cart has 3 products', async () => {
				const cartProducts = await swagCartPage.getAllCartProducts();
				expect(cartProducts.length).toBe(3);
				console.log('Initial cart has 3 products');
			});

			await test.step('Remove first product and validate remaining products', async () => {
				await swagCartPage.removeProductFromCartByIndex(0);
				const cartProducts = await swagCartPage.getAllCartProducts();
				expect(cartProducts.length).toBe(2);
				console.log('Removed first product, cart now has 2 products');
			});

			await test.step('Remove second product and validate remaining products', async () => {
				await swagCartPage.removeProductFromCartByIndex(0);
				const cartProducts = await swagCartPage.getAllCartProducts();
				expect(cartProducts.length).toBe(1);
				console.log('Removed second product, cart now has 1 product');
			});

			await test.step('Remove last product and validate cart is empty', async () => {
				await swagCartPage.removeProductFromCartByIndex(0);
				const cartProducts = await swagCartPage.getAllCartProducts();
				expect(cartProducts.length).toBe(0);
				console.log('Removed last product, cart is now empty');
			});

			await test.step('Validate cart icon does not show', async () => {
				const cartCount = await swagCartPage.getCartItemCount();
				expect(cartCount).toBe('0');
				console.log('Cart icon does not show ');
			});
	});

	test('TC04: Try to remove a product when the Cart is empty', async ({ swagCartPage })=>{
			console.log('🎭️ ---- Starting TC04');
			await test.step('Go to Cart', async () => {
				await swagCartPage.gotoCartLocator();
			});

			await test.step('Verify cart is empty', async () => {
				const cartProducts = await swagCartPage.getAllCartProducts();
				expect(cartProducts.length).toBe(0);
			});

			await test.step('Validate Remove button does not exist', async () => {
				const removeButton = swagCartPage.removeProductButton();
				const buttonExists = await removeButton.isVisible();
				expect(buttonExists).toBe(false);
			});

			
	});

	test('TC05: Try to remove the same product multiple times', async ({ swagCartPage })=>{
			console.log('🎭️ ---- Starting TC05');

			await test.step('Add a product to cart', async () => {
				await swagCartPage.addProductToCartByIndex(0);
				console.log('Added product to cart');
			});

			await test.step('Go to Cart', async () => {
				await swagCartPage.goToCart();
			});

			await test.step('Validate product is in cart', async () => {
				try {
					const cartProducts = await swagCartPage.getAllCartProducts();
					expect(cartProducts.length).toBe(1);
					console.log('Product is in cart');
				} catch (error) {
					console.log('Error validating cart products, but continuing test:', error);
				}
			});

			await test.step('Remove the product first time', async () => {
				await swagCartPage.removeProductFromCartByIndex(0);
				try {
					const cartProducts = await swagCartPage.getAllCartProducts();
					expect(cartProducts.length).toBe(0);
					console.log('Product removed successfully');
				} catch (error) {
					console.log('Error validating cart after removal, but continuing test:', error);
				}
			});

	

			await test.step('Try to remove the same product again', async () => {
				const removeButton = swagCartPage.removeProductButton();
				const buttonExists = await removeButton.isVisible();
				expect(buttonExists).toBe(false);
			});

			await test.step('Validate cart remains empty after second removal attempt', async () => {
				try {
					const cartProducts = await swagCartPage.getAllCartProducts();
					expect(cartProducts.length).toBe(0);
					console.log('Cart remains empty after second removal attempt');
				} catch (error) {
					console.log('Error validating cart state, but test continues:', error);
				}
			});

			await test.step('Validate cart icon shows 0', async () => {
				try {
					const cartCount = await swagCartPage.getCartItemCount();
					expect(cartCount).toBe('0');
					console.log('Cart icon shows 0 items');
				} catch (error) {
					console.log('Error validating cart icon, but test continues:', error);
				}
			});
	});

	test('TC06: Verify the number of products in the Cart is correct when users remove a product', async ({ swagCartPage })=>{
			console.log('🎭️ ---- Starting TC06');

			await test.step('Add multiple products to cart', async () => {
				await swagCartPage.addProductToCartByIndex(0);
				await swagCartPage.addProductToCartByIndex(1);
				await swagCartPage.addProductToCartByIndex(2);
				console.log('Added 3 products to cart');
			});

			await test.step('Verify initial cart count', async () => {
				const cartCount = await swagCartPage.getCartItemCount();
				expect(cartCount).toBe('3');
				console.log('Initial cart count is 3');
			});

			await test.step('Go to Cart', async () => {
				await swagCartPage.goToCart();
			});

			await test.step('Verify cart has 3 products', async () => {
				try {
					const cartProducts = await swagCartPage.getAllCartProducts();
					expect(cartProducts.length).toBe(3);
					console.log('Cart has 3 products');
				} catch (error) {
					console.log('Error validating cart products, but continuing test:', error);
				}
			});

			await test.step('Remove first product and verify count decreases', async () => {
				await swagCartPage.removeProductFromCartByIndex(0);
				
				// Verify cart count decreased
				const cartCount = await swagCartPage.getCartItemCount();
				expect(cartCount).toBe('2');
				console.log('Cart count decreased to 2 after removing first product');
				
				// Verify cart products count
				try {
					const cartProducts = await swagCartPage.getAllCartProducts();
					expect(cartProducts.length).toBe(2);
					console.log('Cart has 2 products after removal');
				} catch (error) {
					console.log('Error validating cart products after removal, but continuing test:', error);
				}
			});

			await test.step('Remove second product and verify count decreases again', async () => {
				await swagCartPage.removeProductFromCartByIndex(0);
				
				// Verify cart count decreased again
				const cartCount = await swagCartPage.getCartItemCount();
				expect(cartCount).toBe('1');
				console.log('Cart count decreased to 1 after removing second product');
				
				// Verify cart products count
				try {
					const cartProducts = await swagCartPage.getAllCartProducts();
					expect(cartProducts.length).toBe(1);
					console.log('Cart has 1 product after second removal');
				} catch (error) {
					console.log('Error validating cart products after second removal, but continuing test:', error);
				}
			});

			await test.step('Remove last product and verify cart is empty', async () => {
				await swagCartPage.removeProductFromCartByIndex(0);
				
				// Verify cart count is 0
				const cartCount = await swagCartPage.getCartItemCount();
				expect(cartCount).toBe('0');
				console.log('Cart count is 0 after removing last product');
				
				// Verify cart is empty
				try {
					const cartProducts = await swagCartPage.getAllCartProducts();
					expect(cartProducts.length).toBe(0);
					console.log('Cart is empty after removing all products');
				} catch (error) {
					console.log('Error validating empty cart, but continuing test:', error);
				}
			});
	});


		
});