import { expect, type Locator, type Page, } from '@playwright/test';
import { ReactPage } from './ReactPage';
import * as env from 'dotenv';
env.config(); 

export class SpaceDestinationPage extends ReactPage {
	page: Page;
	selectDestinationbtn: () => Locator;
	dropdown: (name: 'Launch' | 'Planet color') => Locator;
	dropdownInput: (name: 'Launch' | 'Planet color') => Locator;
	dropdownOptions: (name: 'Launch' | 'Planet color') => Locator;
	demoDropdown: (name: 'Select Option' | 'Select Title'| 'Select...') => Locator;
	demoDropdownOptions: (name: 'Select Option' | 'Select Title'| 'Select...') => Locator;
	demoDropDownOldMenu: () => Locator;
	demoOldMenuOptions: () => Locator;

	constructor( driver:Page ) {
		super(driver);
		this.page = driver;
		this.selectDestinationbtn = () => this.getByReactTool('button' , { hasText: 'Select Destination' });
		this.dropdown = (name: 'Launch' | 'Planet color') => this.getByReactTool('dropdown', { hasText: name });
		this.dropdownInput = (name: 'Launch' | 'Planet color') => this.dropdown(name).locator('input');
		this.dropdownOptions = (name: 'Launch' | 'Planet color') => this.dropdown(name).locator('ul li'); //? Es la estructura de los dropdowns
		this.demoDropdown= (name: 'Select Option' | 'Select Title' | 'Select...') => this.page.locator('.css-2b097c-container' , { hasText:name });
		this.demoDropdownOptions= (name: 'Select Option' | 'Select Title'| 'Select...') => this.demoDropdown(name).locator('.css-26l3qy-menu');
		this.demoDropDownOldMenu = () => this.page.locator('#oldSelectMenu');
		this.demoOldMenuOptions = () => this.demoDropDownOldMenu().locator('select option')
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

	async demoQAOpenDropdown(dropdown: 'Select Option' | 'Select Title'| 'Select...') {
		await this.demoDropdown(dropdown).click();
		await this.page.waitForTimeout(500);
		const options = this.demoDropdownOptions(dropdown);
		return options;
	}

	async demoQASelectDropdown(dropdown: 'Select Option' | 'Select Title' | 'Select...', optionName: string) {
		const demoLocator = await this.demoQAOpenDropdown(dropdown);
		const givenOption = await demoLocator.getByText(optionName);
		const optionNameValue = await givenOption.innerText();
		await givenOption.click();
		await this.page.waitForTimeout(500);
		return optionNameValue;
		
	}

	async demoQASelectRadomOption1(dropdown: 'Select Option' | 'Select Title' | 'Select...',) {
		const locatorDemo1 = await this.demoQAOpenDropdown(dropdown);
		const optionDemo1 = await locatorDemo1.all();
		const randomDemo1 = await Math.floor(Math.random() * optionDemo1.length);
		const givenOptionDemo1 = await optionDemo1[randomDemo1];
		const givenValueDemo1 = await givenOptionDemo1.allInnerTexts();
		await givenOptionDemo1.click();
		await this.page.waitForTimeout(500);
		return givenValueDemo1;
	}
	async demoQAOpenOldMenu() {
		await this.demoDropDownOldMenu().click();
		await this.page.waitForTimeout(500);
		const oldMenu = await this.demoOldMenuOptions();
		return oldMenu;
	}
	async demoQASelectRadomOption2() {
		const locatorDemo2 = await this.demoQAOpenOldMenu();
		const optionDemo2 = await locatorDemo2.all();
		const radomDemo2 = await Math.floor(Math.random() * optionDemo2.length);
		const givenOptionDemo2 = optionDemo2[radomDemo2];
		const givenValueDemo2 = givenOptionDemo2.allInnerTexts();
		await givenOptionDemo2.click();
		await this.page.waitForTimeout(500);
		return givenValueDemo2;

	}
}