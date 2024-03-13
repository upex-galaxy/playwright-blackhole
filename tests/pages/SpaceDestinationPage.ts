import { type Locator, type Page, } from '@playwright/test';
import * as dotenv from 'dotenv';
import { ReactPage } from './ReactPage';

export class SpaceDestinationPage extends ReactPage {
	page: Page;
	selectDestinationbtn: () => Locator;
	dropdownLaunch: () => Locator;
	dropdownplanet: () => Locator;
	selectLauchbtn: () => Locator;
	selectplanetbtn: () => Locator;
	dropdownOptions: (option?: 'Launch' | 'Planet color' | undefined) => Locator;
	launchPickerInput: () => Locator;
	launchPickerUL: () => Locator;
	destinyLaunch: (destinyTitle: string) => Locator;

	constructor( driver:Page ) {
		super(driver);
		this.page = driver;
		this.selectDestinationbtn = () => this.getByReactTool('button' , { hasText: 'Select Destination' });
		this.dropdownLaunch = () => this.getByReactTool('dropdown', { hasText: 'Launch' });
		this.selectLauchbtn = () => this.page.locator('[class*="31xyK Gallery__dropdo"]');
		this.destinyLaunch = (destinyTitle: string) => this.page.locator('[class*="31xyK Gallery__dropdo"]', { hasText: destinyTitle });
		this.dropdownplanet = () => this.getByReactTool('dropdown' , { hasText: 'Planet color' } );
		this.selectplanetbtn = () => this.dropdownplanet().getByText('Blue');
		this.dropdownOptions = (option?: 'Launch' | 'Planet color' | undefined) => this.page.locator('[data-react-toolbox=dropdown]', { hasText: option });
		this.launchPickerInput = () => this.dropdownOptions('Launch').locator('input');
		this.launchPickerUL = () => this.dropdownOptions('Launch').locator('ul');
	}

	async selectDestination() {
		await this.selectDestinationbtn().click();
		await this.dropdownLaunch().click();
		await this.selectLauchbtn().click();
		await this.dropdownplanet().click();
		await this.selectplanetbtn().click();
	}
	
	async getLaunchByIndex(destinyIndex: number) {
		return this.selectLauchbtn().nth(destinyIndex);
	}

	async selectradomdestination() {
		const availableLauch = (await this.selectLauchbtn().innerText()).length;
		const mathLauch = Math.floor(Math.random() * availableLauch);
		return this.getLaunchByIndex(mathLauch);
	}
	
}