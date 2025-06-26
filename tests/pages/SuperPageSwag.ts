import type { Page } from '@playwright/test';

export class SuperPageSwag {
	page: Page;

	constructor(driver: Page) {
		this.page = driver;
	}

	
}
