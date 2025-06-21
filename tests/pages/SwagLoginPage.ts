import { type Locator, type Page, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { SuperPageSwag } from './SuperPageSwag';
dotenv.config();

const actualUsername = process.env.CI ? 'User in CI' : process.env.SPACE_LOGIN_USERNAME;
const actualPassword = process.env.CI ? 'Password in CI' : process.env.SPACE_LOGIN_PASSWORD;

export class SwagLoginPage extends SuperPageSwag {
	usernameInput: () => Locator;
	passwordInput: () => Locator;
	loginButton: () => Locator;
	titlePage: () => Locator;

	constructor(driver: Page) {
		super(driver);
		this.usernameInput = () => this.page.locator('[data-test="username"]');
		this.passwordInput = () => this.page.locator('[data-test="password"]');
		this.loginButton = () => this.page.locator('[data-test="login-button"]');
		this.titlePage = () => this.page.locator('.login_logo');
	}

	async enterUsername(usernameValue: string) {
		await this.usernameInput().fill("standard_user");
	}
	async enterPassword(passwordValue: string) {
		await this.passwordInput().fill("secret_sauce");
	}
	async submitLogin() {
		await this.loginButton().click();
	}

	//* Esto se conoce como un Shortcut o SharedSteps, como quieras decirle:
	//* Esto NO se usaría en el Caso de Prueba de un Login,
	//* sino como PRECONDICION para otras Pruebas que no son de Login, ej: Checkout

	async login(usernameValue: string, passwordValue: string) {
		await this.enterUsername(usernameValue);
		await this.enterPassword(passwordValue);
		await this.submitLogin();
	}

	async gotoPage(){
		await this.page.goto('https://www.saucedemo.com/');
		const title = await this.titlePage().textContent();
		expect(title).toBe('Swag Labs') 
		
	}

	async loginSuccess() {
		const username = actualUsername;
		const password = actualPassword;
		await this.login(username, password);
		expect(this.page.url()).toBe('https://www.saucedemo.com/inventory.html');
	}
}