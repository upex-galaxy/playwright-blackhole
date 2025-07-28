import { type Locator, type Page, expect } from '@playwright/test';
import { SuperPageSwag } from './SuperPageSwag';

// Define a type for product details
interface ProductDetails {
	title: string | null;
	description: string | null;
}

export class SwagCartPage extends SuperPageSwag {
	usernameInput: () => Locator;
	cartIconLocator: () => Locator;
	removeProductButton: () => Locator;
	titleInventory: () => Locator;
	descriptionInventory: () => Locator;
	titleCart: () => Locator;
	descriptionCart: () => Locator;
	onlyCartLocator: () => Locator;


	constructor(driver: Page) {
		super(driver);
		this.usernameInput = () => this.page.locator('[data-test="username"]');
		this.cartIconLocator = () => this.page.locator('.shopping_cart_badge');
		this.removeProductButton = () => this.page.locator('[data-test="remove-sauce-labs-backpack"]');
		this.titleInventory = () => this.page.locator('.inventory_item_name');
		this.descriptionInventory = () => this.page.locator('.inventory_item_desc');
		this.titleCart = () => this.page.locator('.cart_item .inventory_item_name');
		this.descriptionCart = () => this.page.locator('.cart_item .inventory_item_desc');
		this.onlyCartLocator = () => this.page.locator('[data-test="shopping-cart-link"]');
	}

	async getCartItemCount(): Promise<string> {
		try {
			const cartBadge = this.cartIconLocator();
			const isVisible = await cartBadge.isVisible();
			
			if (!isVisible) {
				return '0';
			}
			
			return await cartBadge.textContent() || '0';
		} catch (error) {
			console.log('Error getting cart item count, returning 0:', error);
			return '0';
		}
	}

	async goToCart() {
		try {
			await this.cartIconLocator().click();
		} catch (error) {
			console.log('Error going to cart:', error);
		}
	}

	async gotoCartLocator(){
		await this.onlyCartLocator().click();
	}

	async addProductToCartByIndex(index: number) {
		try {
			const addToCartButton = this.page.locator('.inventory_item').nth(index).locator('.btn_inventory');
			await addToCartButton.click();	
		} catch (error) {
			console.log(`Error adding product at index ${index} to cart:`, error);
		}
	}

	async getProductDetailsFromInventory(index: number): Promise<ProductDetails> {
		try {
			const title = await this.titleInventory().nth(index).textContent();
			const description = await this.descriptionInventory().nth(index).textContent();
			
			return { 
				title: title?.trim() || null,
				description: description?.trim() || null
			};
		} catch (error) {
			console.log(`Error getting product details from inventory at index ${index}:`, error);
			return { title: null, description: null };
		}
    }

	async removeProductFromCart() {
		try {
			await this.removeProductButton().click();
		} catch (error) {
			console.log('Error removing product from cart:', error);
		}
	}

	async removeProductFromCartByIndex(index: number) {
		try {
			const removeButton = this.page.locator('.cart_item').nth(index).locator('[data-test^="remove-"]');
			const isVisible = await removeButton.isVisible();
			
			if (isVisible) {
				await removeButton.click();
			} else {
				console.log(`Remove button at index ${index} is not visible (product may already be removed)`);
			}
		} catch (error) {
			console.log(`Error removing product at index ${index} from cart:`, error);
		}
	}

	// New method to validate product details match exactly
	async validateProductDetailsMatch(inventoryIndex: number, cartIndex: number = 0) {
		const inventoryDetails = await this.getProductDetailsFromInventory(inventoryIndex);
		const cartDetails = await this.getProductDetailsFromCart(cartIndex);
		
		expect(cartDetails.title).toBe(inventoryDetails.title);
		expect(cartDetails.description).toBe(inventoryDetails.description);
	}

	// New method to get all products from cart
	async getAllCartProducts(): Promise<ProductDetails[]> {
		try {
			const count = await this.titleCart().count();
			const products: ProductDetails[] = [];
			
			for (let i = 0; i < count; i++) {
				products.push(await this.getProductDetailsFromCart(i));
			}
			
			return products;
		} catch (error) {
			console.log('Error getting cart products, returning empty array:', error);
			return [];
		}
	}

	// Helper method to get product details from cart (used internally)
	async getProductDetailsFromCart(index: number): Promise<ProductDetails> {
		try {
			const title = await this.titleCart().nth(index).textContent();
			const description = await this.descriptionCart().nth(index).textContent();
    	
			return { 
				title: title?.trim() || null,
				description: description?.trim() || null
			};
		} catch (error) {
			console.log(`Error getting product details from cart at index ${index}:`, error);
			return { title: null, description: null };
		}
	}
}