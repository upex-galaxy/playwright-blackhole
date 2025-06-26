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
	errorMessage: () => Locator;

	constructor(driver: Page) {
		super(driver);
		this.usernameInput = () => this.page.locator('[data-test="username"]');
		this.passwordInput = () => this.page.locator('[data-test="password"]');
		this.loginButton = () => this.page.locator('[data-test="login-button"]');
		this.titlePage = () => this.page.locator('.login_logo');
		this.errorMessage = () => this.page.locator('[data-test="error"]');
	}

	async enterUsername(usernameValue: string) {
		await this.usernameInput().fill(usernameValue);
	}
	async enterPassword(passwordValue: string) {
		await this.passwordInput().fill(passwordValue);
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

	async getErrorMessage(){
		const errorMessageLocator = this.errorMessage();
		await expect(errorMessageLocator).toBeVisible();
		return this.errorMessage().textContent()
	}

	async accesstoPages( url: string){
		await this.page.goto(url);
		await expect(this.page).toHaveURL(`https://www.saucedemo.com`)
	}

	async getExpectedAccessError(url: string) {
  		const path = new URL(url).pathname;
 		return `Epic sadface: You can only access '${path}' when you are logged in.`;
	}


}