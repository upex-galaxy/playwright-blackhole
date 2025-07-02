import { type Locator, type Page, expect } from '@playwright/test';
import { SuperPageSwag } from './SuperPageSwag';
import type { promises } from 'dns';
import { fill, last } from 'lodash';

export class SwagCheckoutPage extends SuperPageSwag{
	cartIcon: () => Locator;
	checkoutButton: () => Locator;
	firstname: () => Locator;
	lastname: () => Locator;
	zip: () => Locator; 
	continueButton: () => Locator;
	errorMessage: () => Locator;
	cancelButton: () => Locator;

	constructor(driver: Page) {
		super(driver);
		this.cartIcon = () => this.page.locator('[data-test="shopping-cart-link"]');
		this.checkoutButton = () => this.page.locator('[data-test="checkout"]');
		this.firstname = () => this.page.locator('[data-test="firstName"]');
		this.lastname = () => this.page.locator('[data-test="lastName"]');
		this.zip = () => this.page.locator('[data-test="postalCode"]');
		this.continueButton = () => this.page.locator('[data-test="continue"]');
		this.errorMessage = () => this.page.locator('[data-test="error"]');
		this.cancelButton = () => this.page.locator('[data-test="cancel"]');


	}

	async gotoStepOne() : Promise<void> {
		await this.cartIcon().click();
		expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html')
		await this.checkoutButton().click();
		expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
	}

	async filloutInfo(
		firstname?: string | null,
		lastname?: string | null,
		zip?: string | null
	): Promise<void> {
		await this.firstname().fill(firstname ?? '');
		await expect(this.page.locator('#first-name')).toHaveValue(firstname ?? '');
		await this.lastname().fill(lastname ?? '');
		await expect(this.page.locator('#last-name')).toHaveValue(lastname ?? '');
		await this.zip().fill(zip ?? '');
		await expect(this.page.locator('#postal-code')).toHaveValue(zip ?? '');
	}

	async continue(): Promise<void> {
		await this.continueButton().click();	
	}

	async getErrorMessage(){
		const errorMessageLocator = this.errorMessage();
		await expect(errorMessageLocator).toBeVisible();
		return this.errorMessage().textContent();
	}

	async cancel(): Promise<void> {
		await this.cancelButton().click();
	}




	


}