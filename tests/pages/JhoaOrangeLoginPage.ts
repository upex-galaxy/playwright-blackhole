import { type Page, type Locator, expect } from '@playwright/test';
import * as env from 'dotenv';
env.config(); 

export class OrangeSearchUser {
	page: Page;
	adminbtn: Locator;
	typeUser: Locator;
	userRoleBtn: Locator;
	selectUserRole: Locator;
	typeName: Locator;
	seletName: Locator;
	statusBtn: Locator;
	selectStatus: Locator;
	submitBtn: Locator;
	msgError: Locator;
	borderError: Locator;
	tableContain: Locator;
	errorText: Locator;

	constructor(driver: Page) {
		this.page = driver; 
		this.adminbtn = this.page.locator('a', { hasText: 'Admin' });
		this.typeUser = this.page.locator('[class*="input--active"]').nth(1);
		this.userRoleBtn = this.page.locator('[class*="text--active"]').nth(0);
		this.selectUserRole = this.page.locator('.oxd-select-option').nth(1);
		this.typeName = this.page.locator('input').nth(2);
		this.seletName = this.page.locator('.oxd-autocomplete-option');
		this.statusBtn = this.page.locator('[class*="text--active"]').nth(1);
		this.selectStatus = this.page.locator('span', { hasText: 'Enabled' });
		this.submitBtn = this.page.locator('button[type=submit]');
		this.msgError = this.page.locator('div', { hasText: 'No Records Found' });
		this.borderError = this.page.locator('[class*=\'input--error\']');
		this.tableContain = this.page.locator('.oxd-table-card');
		this.errorText = this.page.locator('[class*=group__message]');
	}

	async searchUser() {
		await this.adminbtn.click();
		await this.typeUser.fill('Admin');
		await this.userRoleBtn.click();
		await this.selectUserRole.click();
		await this.typeName.fill('Tester');
		await this.page.waitForTimeout(2000);
		await this.seletName.click();
		await this.statusBtn.click();
		await this.selectStatus.click();
		await this.submitBtn.click();
	}

	async searchUserFail() {
		await this.adminbtn.click();
		await this.typeUser.fill('Admin');
		await this.userRoleBtn.click();
		await this.selectUserRole.click();
		await this.typeName.fill('dfhd');
		await this.page.waitForTimeout(2000);
		await this.seletName.click();
	}
}
