import { type Locator, type Page, expect } from '@playwright/test';
import { SuperPageSwag } from './SuperPageSwag';


export class SwagFilter extends SuperPageSwag {

	dropDownFilter: () => Locator;


	constructor(driver: Page) {
		super(driver);
		this.dropDownFilter = () => this.page.locator('xpath=//select[@class="product_sort_container"]');

	}

	async selectFilter(order: string): Promise<void> {	
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



