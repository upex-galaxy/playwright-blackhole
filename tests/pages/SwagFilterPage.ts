import { type Locator, type Page, expect } from '@playwright/test';
import { SuperPageSwag } from './SuperPageSwag';


export class SwagFilterPage extends SuperPageSwag {

	dropDownFilter: () => Locator;
	pageTitle: () => Locator;
	inventoryName: () => Locator;
    inventoryItem: () => Locator;

	constructor(driver: Page) {
		super(driver);
		this.dropDownFilter = () => this.page.locator('xpath=//select[@class="product_sort_container"]');
		this.pageTitle = () => this.page.locator('[data-test="title"]');
		this.inventoryName = () => this.page.locator('.inventory_item_name'); 
		this.inventoryItem = () => this.page.locator('.inventory_item');

	}

	async selectFilter(order: string): Promise<void> {	
		await expect(this.pageTitle()).toHaveText('Products')
		await this.dropDownFilter().selectOption({ value: order });
	}

	async getItemNames(): Promise<string[]> {
		const items = await this.inventoryName().allTextContents();
		return items;
	}

	async validateItems(expectedItems: string[]): Promise<boolean> {
		const actualItems = await this.getItemNames();
		expect(actualItems).toEqual(expectedItems);
		return true;
	}

	async getExpectedNames(sortType: string): Promise<string[]> {
		const allProducts = await this.inventoryName().allTextContents();
		
		switch (sortType) {
			case 'za':
				return allProducts.sort().reverse();
			case 'az': 
				return allProducts.sort();
			default:
				return [];
		}
	}

	async getExpectedPrice(sortType: string): Promise<string[]> {
		// Get all product containers
		const productElements = await this.inventoryItem();
		const count = await productElements.count();

		// Build an array of { name, price }
		const products = [];
		for (let i = 0; i < count; i++) {
			const name = await productElements.nth(i).locator('.inventory_item_name').textContent() ?? '';
			const priceText = await productElements.nth(i).locator('.inventory_item_price').textContent();
			// Remove $ and convert to number
			const price = parseFloat((priceText ?? '').replace('$', ''));
			products.push({ name, price });
		}
		
		switch (sortType) {
			case ('lohi'):
				// Low to High
				const sortedByPrice = [...products].sort((a, b) => a.price - b.price);
			 	return sortedByPrice.map(product => product.name);

			case ("hilo"):
				// High to low
				const sortedByPriceDesc = [...products].sort((a, b) => b.price - a.price);
				return sortedByPriceDesc.map(product => product.name);

			 default:
      			return [];	
		}



	}

}



