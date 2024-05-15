import type { Locator, Page} from '@playwright/test';

export class DemoSliderBar {
	page: Page;
	sliderbarr: () => Locator;


	constructor(driver: Page) {
		this.page = driver; 
		this.sliderbarr = () => this.page.locator('#sliderContainer')
		this.sliderbutton = () => this.page.locator('#thumb')

	}
}