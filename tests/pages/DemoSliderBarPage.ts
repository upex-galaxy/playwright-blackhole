import type { Locator, Page } from '@playwright/test';

export class DemoSliderBar {
	page: Page;
	sliderbar: () => Locator;

	constructor(driver: Page) {
		this.page = driver; 
		this.sliderbar = () => this.page.locator('input[type="range"]');

	}
	async getSliderValue() {
		const sliderHandler = this.sliderbar();
		return await sliderHandler.evaluate((slider) => (slider as HTMLInputElement).value);
	}

	async moveSliderTo(toLeftRight: number) {
		const moveSlider = await this.sliderbar();
		const moveButton = await moveSlider.boundingBox();

		if(moveButton) {
			const sliderX = moveButton.x + moveButton.width / 2;
			const sliderY = moveButton.y + moveButton.height / 2; 

			await this.page.mouse.move(sliderX, sliderY);
			await this.page.mouse.down();
			await this.page.mouse.move(sliderX + toLeftRight, sliderY);
			await this.page.mouse.up();
		}
	}

}