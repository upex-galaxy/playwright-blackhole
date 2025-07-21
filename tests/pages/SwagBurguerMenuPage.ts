import { type Locator, type Page, expect } from '@playwright/test';
import { SuperPageSwag } from './SuperPageSwag';
import type { promises } from 'dns';
import { fill, last } from 'lodash';

export class SwagBurguerMenuPage extends SuperPageSwag{
	cartIcon: () => Locator;
	menuButton: () => Locator;
	allItems: () => Locator;
	about: () => Locator;
	logoutbutton: () => Locator;
	resetbutton: () => Locator;
	closeIcon:() => Locator;
	menuBox: () => Locator;
	resetOption: () => Locator;
	cartIconLocator: () => Locator;
	AddCartButton: () => Locator;


	constructor(driver: Page) {
		super(driver);
		this.cartIcon = () => this.page.locator('[data-test="shopping-cart-link"]');
		this.menuButton = () => this.page.getByRole('button', { name: 'Open Menu' });
		this.allItems = () => this.page.locator('[data-test="inventory-sidebar-link"]');
		this.about = () => this.page.locator('#about_sidebar_link');
		this.logoutbutton = () => this.page.locator('#logout_sidebar_link');
		this.resetbutton = () => this.page.locator('#reset_sidebar_link');
		this.closeIcon = () => this.page.getByRole('button', { name: 'Close Menu' });
		this.menuBox = () => this.page.locator('.bm-menu-wrap');
		this.resetOption = () => this.page.locator('#reset_sidebar_link');
		this.cartIconLocator = () => this.page.locator('.shopping_cart_badge');
		this.AddCartButton = () => this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
		
	}

	async gotoMenu() : Promise<void> {
		await this.menuButton().click();
	}

	async clickAllItems(): Promise<void> {
		await this.allItems().click();
		await expect(this.page).toHaveURL(`https://www.saucedemo.com/inventory.html`);
	}

	async getTitlePageClass(): Promise<string> {
		const title = await this.page.locator('.title').textContent();
		return title ?? '';
	}

	async getTitlePage(): Promise<string> {
		return await this.page.title();
	}	

	async clickAbout(): Promise<void> {
		await this.about().click();
		await expect(this.page).toHaveURL(`https://saucelabs.com/`);
	}

	async clickLogout(): Promise<void> {
		await this.logoutbutton().click();
		await expect(this.page).toHaveURL(`https://www.saucedemo.com/`);
	}

	async clickCloseBurguerMenu(): Promise<void> {
		await this.closeIcon().click();
	}

	async clickResetApp(): Promise<void> {
		await this.resetbutton().click();
		await expect(this.page).toHaveURL(`https://www.saucedemo.com/inventory.html`);
	}

	async getCartIconCount(): Promise<string> {
		const count = await this.cartIconLocator().textContent();
		return count ?? '0';
	}

	async clickAddToCart(): Promise<void> {
		return this.AddCartButton().click();
	}



	


}