import { type Locator, type Page, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { ReactPage } from './ReactPage';
dotenv.config();

const actualUsername = process.env.SPACE_LOGIN_USERNAME;
const actualPassword = process.env.SPACE_LOGIN_PASSWORD;

export class SpaceLoginPageJhoa extends ReactPage {
	usernameInput: () => Locator;
	passwordInput: () => Locator;
	loginButton: () => Locator;
	loginclick: () => Locator;

	constructor(driver: Page) {
		super(driver);
		this.usernameInput = () => this.getByReactTool('input', { hasText: 'Username' }).locator('[role=input]');
		this.passwordInput = () => this.getByReactTool('input', { hasText: 'Password' }).locator('[role=input]');
		this.loginButton = () => this.page.locator('[form="login"]');
		this.loginclick = () => this.page.locator('[class*=NavButton]');
	}

	async loginSuccess() {
		await this.loginclick().click();
		await this.usernameInput().fill(actualUsername);
		await this.passwordInput().fill(actualPassword);
		await this.	loginButton().click();
		expect(this.page.url()).toBe('https://demo.testim.io/');
	}

}