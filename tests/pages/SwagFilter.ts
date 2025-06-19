import { type Locator, type Page, expect } from '@playwright/test';
import { SuperPageSwag } from './SuperPageSwag';


export class SwagFilter extends SuperPageSwag {

	dropDownFilter: () => Locator;
	pageTitle: () => Locator;


	constructor(driver: Page) {
		super(driver);
		this.dropDownFilter = () => this.page.locator('xpath=//select[@class="product_sort_container"]');
		this.pageTitle = () => this.page.locator('[data-test="title"]');

	}

	async selectFilter(order: string): Promise<void> {	
		await expect(this.pageTitle()).toHaveText('Products')
		await this.dropDownFilter().selectOption({ value: order });
	}

	async getItemNames(): Promise<string[]> {
		const items = await this.page.locator('.inventory_item_name').allTextContents();
		return items;
	}

	async validateItems(expectedItems: string[]): Promise<boolean> {
		const actualItems = await this.getItemNames();
		expect(actualItems).toEqual(expectedItems);
		return true;
	}

}



