import { type Page, type Locator, expect } from '@playwright/test';
import * as env from 'dotenv';
env.config(); 

const myUserName = process.env.ORANGE_USERNAME;
const myPassWord = process.env.ORANGE_PASSWORD;

export class OrangeLogin {
	page: Page;
	usernameInput: Locator;
	passwordInput: Locator;
	loginbutton: Locator;
	adminbtn: Locator;
	typeUser: Locator;
	userRoleBtn: Locator;
	selectUserRole: Locator;
	typeName: Locator;
	seletName: Locator;
	statusBtn: Locator;
	selectStatus: Locator;
	submitBtn: Locator;

	constructor(driver: Page) {
		this.page = driver; 
		this.usernameInput = this.page.locator('[name="username"]');
		this.passwordInput = this.page.locator('[name="password"]');
		this.loginbutton = this.page.locator('[type="submit"]');
		this.adminbtn = this.page.locator('a', { hasText: 'Admin' });
		this.typeUser = this.page.locator('[class*="input--active"]').nth(1);
		this.userRoleBtn = this.page.locator('[class*="text--active"]').nth(0);
		this.selectUserRole = this.page.locator('.oxd-select-option').nth(1);
		this.typeName = this.page.locator('input').nth(2);
		this.seletName = this.page.locator('.oxd-autocomplete-option');
		this.statusBtn = this.page.locator('[class*="text--active"]').nth(1);
		this.selectStatus = this.page.locator('span', { hasText: 'Enabled' });
		this.submitBtn = this.page.locator('button[type=submit]');
	}
	
	async loginSuccess() {
		await this.page.goto('https://opensource-demo.orangehrmlive.com/');
		await this.usernameInput.fill('myUserName');
		await this.passwordInput.fill('myPassWord');
		await this.loginbutton.click();
		await expect(this.page.url()).toContain('dashboard');
	}
	async searchUser() {
		await this.adminbtn.click();
		await this.typeUser.click();
	}
}
