import { type Locator, type Page, expect } from '@playwright/test';
import { SuperPageSwag } from './SuperPageSwag';


export class SwagProductDetailsPage extends SuperPageSwag {
	productTitle: () => Locator;
	productDescription: () => Locator;
	productPrice: () => Locator;
	addCartButton: () => Locator;
	backProductButton: () => Locator;
	productImage: () => Locator;
	inventoryItem: () => Locator;

	constructor(driver: Page) {
		super(driver);
		this.inventoryItem = () => this.page.locator('[data-test="inventory-item"]');
		this.productTitle = () => this.page.locator('[data-test="inventory-item-name"]');
		this.productDescription = () => this.page.locator('[data-test="inventory-item-desc"]');
		this.productPrice = () => this.page.locator('[data-test="inventory-item-price"]');
		this.addCartButton = () => this.page.locator('[data-test="add-to-cart"]');
		this.backProductButton = () => this.page.locator('[data-test="back-to-products"]');
		this.productImage = () => this.page.locator('.inventory_details_img');
	}


	async getAllProducts() {
		const products = this.inventoryItem();
		const count = await products.count();
		const productList = [];

		for (let i = 0; i < count; i++) {
			const product = products.nth(i);
			const title = await product.locator('[data-test="inventory-item-name"]').textContent();
			const description = await product.locator('[data-test="inventory-item-desc"]').textContent();
			const image = await product.locator('img').getAttribute('src');
			const price = await product.locator('[data-test="inventory-item-price"]').textContent();
			productList.push({ title, description, image, price });
		}

		return productList;

	}


    async getRandomProductFromList() {
        const productList = await this.getAllProducts();
        if (productList.length === 0) throw new Error('No products found');
        const randomIndex = Math.floor(Math.random() * productList.length);
        return productList[randomIndex];
    }

    async clickProductByName(productName: string) {
        const productLocator = this.page.locator('[data-test="inventory-item-name"]', { hasText: productName });
        await productLocator.first().click();
    }

	async clickProductByImage(productTitle: string) {
        const product = this.page.locator('[data-test="inventory-item"]').filter({
            has: this.page.locator('[data-test="inventory-item-name"]', { hasText: productTitle })
        }).first();

        await product.locator('img').click();
    }

}