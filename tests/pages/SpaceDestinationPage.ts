import { type Locator, type Page, } from '@playwright/test';
import { ReactPage } from './ReactPage';
import * as env from 'dotenv';
env.config(); 

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
	planetPickerInput: () => Locator;
	planetPickerUL: () => Locator;

	constructor( driver:Page ) {
		super(driver);
		this.page = driver;
		this.selectDestinationbtn = () => this.getByReactTool('button' , { hasText: 'Select Destination' });
		this.dropdownLaunch = () => this.getByReactTool('dropdown', { hasText: 'Launch' });
		this.selectLauchbtn = () => this.page.locator('[class*="31xyK Gallery__dropdo"]');
		this.dropdownplanet = () => this.getByReactTool('dropdown' , { hasText: 'Planet color' } );
		this.selectplanetbtn = () => this.dropdownplanet().getByText('Blue');
		this.dropdownOptions = (option?: 'Launch' | 'Planet color' | undefined) => this.page.locator('[data-react-toolbox=dropdown]', { hasText: option });
		this.launchPickerInput = () => this.dropdownOptions('Launch').locator('input');
		this.launchPickerUL = () => this.dropdownOptions('Launch').locator('ul');
		this.planetPickerInput = () => this .dropdownOptions('Planet color').locator('input');
		this.planetPickerUL = () => this.dropdownOptions('Planet color').locator('ul');
	}

	async selectDestination() {
		await this.selectDestinationbtn().click();
		await this.dropdownLaunch().click();
		await this.selectLauchbtn().click();
		await this.dropdownplanet().click();
		await this.selectplanetbtn().click();
	}
	
	async getLaunchByIndex() {
		const launch = await this.launchPickerUL().locator('li');
		const launchOptions = await launch.all();
		const alloptions = await Promise.all(launchOptions.map(async (item) => item.textContent()));
		return alloptions;
	}
	async getRadomLaunch() {
		const launchOptions = await this.getLaunchByIndex();
		await this.dropdownLaunch().click();
		const index = Math.floor(Math.random() * launchOptions.length);
		const getOptions = launchOptions[index];
		await getOptions.click();
	}
	
}