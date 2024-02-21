import { type Page, type Locator, expect } from '@playwright/test';
import * as env from 'dotenv';
env.config(); 

const myUserName = process.env.ORANGE_USERNAME;
const myPassWord = process.env.ORANGE_PASSWORD;

export class OrangeLogin {
	page: Page;
	usernameinput: Locator;
	passwordinput: Locator;
	loginbutton: Locator;

	constructor(driver: Page) {
		this.page = driver; 
		this.usernameinput = this.page.locator('[name="username"]');
		this.passwordinput = this.page.locator('[name="password"]');
		this.loginbutton = this.page.locator('[type="submit"]');
	}
}
