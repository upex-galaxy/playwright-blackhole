import { type Locator, type Page, } from '@playwright/test';
import * as dotenv from 'dotenv';
import { ReactPage } from './ReactPage';

export class SpaceDestinationPage extends ReactPage {
	page: Page;
	selectDestinationbtn: () => Locator;
	dropdownLaunch: () => Locator;
	dropdownlaunchbtn: () => Locator;
	dropdownplanet: () => Locator;
	dropdownplanetbtn: () => Locator;
	selectLauchbtn: () => Locator;
	selectplanetbtn: () => Locator;

	constructor( driver:Page ) {
		super(driver);
		this.page = driver;
		this.selectDestinationbtn = () => this.getByReactTool('button' , { hasText: 'Select Destination' });
		this.dropdownLaunch = () => this.getByReactTool('dropdown', { hasText: 'Launch' });
		this.dropdownlaunchbtn = () => this.page.locator('[class*=theme__values]').nth(2);
		this.selectLauchbtn = () => this.dropdownlaunchbtn().getByText('Tongli');
		this.dropdownplanet = () => this.getByReactTool('dropdown' , { hasText: 'Planet color' } );
		this.dropdownplanetbtn = () => this.page.locator('[class*=theme__values]').nth(3);
		this.selectplanetbtn = () => this.dropdownplanetbtn().getByText('Blue');
	}

	async selectDestination() {
		await this.selectDestinationbtn().click();
		await this.dropdownLaunch().click();
		await this.selectLauchbtn().click();
		await this.dropdownplanet().click();
		await this.selectplanetbtn().click();
	}

	async selectradomdestination() {
		const countLauch = await this.dropdownOptionsLP().count();
		const mathLauch = Math.floor(Math.random() * countLauch);
		return this.dropdownOptionsLP().nth(mathLauch);
	}

}