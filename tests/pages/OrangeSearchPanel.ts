import { type Page, type Locator, expect } from '@playwright/test';

export class OrangeSearchPanel {
	page: Page;
	adminTab: Locator;

	constructor(page: Page) {
		this.page = page;
		this.adminTab = this.page.locator('a', { hasText: 'Admin' });
	}

	async gotoAdminPage() {
		await this.adminTab.click();
		expect(this.page.url()).toContain('admin/viewSystemUsers');
		await this.page.waitForLoadState('domcontentloaded');
	}
}