import { expect } from '@pages/TestBase';
import { Page, Locator } from '@playwright/test';
import * as env from 'dotenv';
env.config();

const usedUsername = process.env.CI ? process.env.CI_ORANGEHRM_USERNAME : process.env.QA_ORANGEHRM_USERNAME;
const usedPassword = process.env.CI ? process.env.CI_ORANGEHRM_PASSWORD : process.env.QA_ORANGEHRM_PASSWORD;

export class OrangeLoginPage {
	page: Page; 
	userNameInput: () => Locator;
	passwordInput: () => Locator;
	loginButton: () => Locator;

	constructor(driver: Page) { 
		this.page = driver;
		this.userNameInput = () => this.page.locator('[name="username"]');
		this.passwordInput = () => this.page.locator('[name="password"]');
		this.loginButton = () => this.page.locator('[type="submit"]');
	}

	async enterUserName(username: string) { 
		await this.userNameInput().fill(username);
	}

	async enterPassword(password: string) { 
		await this.passwordInput().fill(password);
	}

	async submitLogin() { 
		await this.loginButton().click();
	}

	async loginAndSubmit(username: string, password: string) { 
		await this.enterUserName(username);
		await this.enterPassword(password);
		await this.submitLogin();
		expect(this.page.url()).toContain('index');
	}    

	async loginSuccess(){
		await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'domcontentloaded' });
		await this.loginAndSubmit(usedUsername, usedPassword);
	}
}