import { type Locator, type Page, expect, } from '@playwright/test';
import * as dotenv from 'dotenv';

export class SelectDestination {
	page: Page;
	selectDestinationbtn: () => Locator;
	dropdownLaunch: () => Locator;
	dropdownlaunchbtn: () => Locator;
	dropdownplanet: () => Locator;
	dropdownplanetbtn: () => Locator;

	constructor( driver:Page ) {
		this.page = driver;
		this.selectDestinationbtn = () => this.page.locator('[data-react-toolbox="button"]' , { hasText: 'Select Destination' });
		this.dropdownLaunch = () => this.page.locator('[data-react-toolbox="dropdown"]', { hasText: 'Launch' });
		this.dropdownlaunchbtn = () => this.page.locator('.theme__values___1jS4g').nth(2);
		this.dropdownplanet = () => this.page.locator('[data-react-toolbox="dropdown"]', { hasText: 'Planet color' });
		this.dropdownplanetbtn = () => this.page.locator('.theme__values___1jS4g').nth(3);
	}
}