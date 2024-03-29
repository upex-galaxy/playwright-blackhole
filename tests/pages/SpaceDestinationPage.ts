import { expect, type Locator, type Page, } from '@playwright/test';
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
	dropdown: (name: 'Launch' | 'Planet color') => Locator;
	dropdownInput: (name: 'Launch' | 'Planet color') => Locator;
	launchPickerInput: () => Locator;
	launchPickerUL: () => Locator;
	planetPickerInput: () => Locator;
	planetPickerUL: () => Locator;
	dropdownOptions: (name: 'Launch' | 'Planet color') => Locator;

	constructor( driver:Page ) {
		super(driver);
		this.page = driver;
		this.selectDestinationbtn = () => this.getByReactTool('button' , { hasText: 'Select Destination' });
		this.dropdownLaunch = () => this.getByReactTool('dropdown', { hasText: 'Launch' });
		this.selectLauchbtn = () => this.page.locator('[class*="31xyK Gallery__dropdo"]');
		this.dropdownplanet = () => this.getByReactTool('dropdown' , { hasText: 'Planet color' } );
		this.selectplanetbtn = () => this.dropdownplanet().getByText('Blue');

		this.dropdown = (name: 'Launch' | 'Planet color') => this.getByReactTool('dropdown', { hasText: name });
		this.dropdownInput = (name: 'Launch' | 'Planet color') => this.dropdown(name).locator('input');
		this.dropdownOptions = (name: 'Launch' | 'Planet color') => this.dropdown(name).locator('ul li'); //? Es la estructura de los dropdowns

		this.launchPickerInput = () => this.dropdown('Launch').locator('input');
		this.launchPickerUL = () => this.dropdown('Launch').locator('ul');
		this.planetPickerInput = () => this .dropdown('Planet color').locator('input');
		this.planetPickerUL = () => this.dropdown('Planet color').locator('ul');
	}

	async openAndGetDropdownOptions(dropdown: 'Launch' | 'Planet color') {
		await this.dropdownInput(dropdown).click(); // abrir el dropdown.
		await this.page.waitForTimeout(500); // esperar que la animación termine.
		const options = this.dropdownOptions(dropdown);
		return options;
	}

	async selectDropdownOptionByName(dropdown: 'Launch' | 'Planet color', optionName: string) {
		const locators = await this.openAndGetDropdownOptions(dropdown);
		const givenOption = locators.getByText(optionName);
		const optionValue = await givenOption.textContent(); 
		if(!optionValue) throw new Error('Option not found');
		expect.soft(optionValue).toBe(optionName);
		await givenOption.click(); // seleccionando la opción elegida
		await this.page.waitForTimeout(500); // esperar que la animación termine.
		return optionValue;
	}

	async selectAnyDropdownOption(dropdown: 'Launch' | 'Planet color') {
		const locators = await this.openAndGetDropdownOptions(dropdown);
		const options = await locators.all();
		const randomIndex = Math.floor(Math.random() * options.length);
		const givenOption = options[randomIndex];
		const optionValue = await givenOption.textContent();
		await givenOption.click(); // seleccionando la opción elegida al azar.
		await this.page.waitForTimeout(500); // esperar que la animación termine.
		return optionValue;
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