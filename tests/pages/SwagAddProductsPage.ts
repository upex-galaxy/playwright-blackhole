import { type Locator, type Page, expect } from '@playwright/test';
import { SuperPageSwag } from './SuperPageSwag';

export class SwagAddProductsPage extends SuperPageSwag{

	backPackLocator: () => Locator;
	shirtLocator: () => Locator;
	cartWithProducts: () => Locator;

	constructor(driver: Page) {
		super(driver);
		this.backPackLocator = () => this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
		this.shirtLocator = () => this.page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
		this.cartWithProducts = () => this.page.locator('.shopping_cart_badge');

	}

	async addProducts(): Promise<void> {
		await this.backPackLocator().click();
		await this.shirtLocator().click();
		const getCartText = await this.cartWithProducts().textContent();
		expect (getCartText).toBe('2');
	}

	


}