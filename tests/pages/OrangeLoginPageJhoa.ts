import { type Page, type Locator, expect } from '@playwright/test';
import * as env from 'dotenv';
env.config();

export class OrangeLPJhoa {
	page: Page;
	usernameInput: () => Locator;
	passwordInput: () => Locator;
	loginSubmitButton: () => Locator;

	constructor(driver: Page) {
		this.page = driver;
		this.usernameInput = () => this.page.locator('[name=username]');
		this.passwordInput = () => this.page.locator('[name=password]');
		this.loginSubmitButton = () => this.page.locator('button[type=submit]');
	}

	async loginSuccess() {
		await this.page.goto('https://opensource-demo.orangehrmlive.com/');
		expect.soft(this.page.url()).toContain('auth/login');
		await this.usernameInput().fill('Admin');
		await this.passwordInput().fill('admin123');
		await this.loginSubmitButton().click();
		expect.soft(this.page.url()).toContain('dashboard/index');
	}
}