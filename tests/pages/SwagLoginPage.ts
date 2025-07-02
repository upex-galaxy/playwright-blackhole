import { type Locator, type Page, expect } from '@playwright/test';
import { SuperPageSwag } from './SuperPageSwag';


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

	async enterUsername() {
		await this.usernameInput().fill('standard_user');
	}
	async enterPassword() {
		await this.passwordInput().fill('secret_sauce');
	}
	async submitLogin() {
		await this.loginButton().click();
	}

	//* Esto se conoce como un Shortcut o SharedSteps, como quieras decirle:
	//* Esto NO se usaría en el Caso de Prueba de un Login,
	//* sino como PRECONDICION para otras Pruebas que no son de Login, ej: Checkout

	async login() {
		await this.enterUsername();
		await this.enterPassword();
		await this.submitLogin();
	}

	async gotoPage(){
		await this.page.goto('https://www.saucedemo.com/');
		await expect(this.page).toHaveURL(`https://www.saucedemo.com`)
		const title = await this.titlePage().textContent();
		expect(title).toBe('Swag Labs') 	
	}

}