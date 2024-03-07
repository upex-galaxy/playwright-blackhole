import type { Page, Locator } from '@playwright/test';
import { ReactPage } from './ReactPage';

export class SpaceFilterPage extends ReactPage {
	slider: () => Locator;
	sliderPicker: () => Locator;

	constructor(page: Page) {
		super(page);
		this.slider = () => this.getByReactTool('slider');
		this.sliderPicker = () => this.slider().locator('[data-value]');
	}

	async moveSliderTo(toLeftRight: number) {
		await this.sliderPicker().hover();
		const sliderPicker = await this.sliderPicker().elementHandle();

		const domReact = await this.page.evaluate(mamamia => {
			const element = mamamia as HTMLElement;
			return element.getBoundingClientRect();
		}, sliderPicker);

		const actualEjeX = domReact.x;
		//? Si sumas ejemplo +10 a actualEjeX, el mouse se moverá a la derecha
		//? Si restas ejemplo -10 a actualEjeX, el mouse se moverá a la izquierda
		await this.page.mouse.down();
		await this.page.mouse.move(actualEjeX + toLeftRight, 0);
		await this.page.mouse.up();
	}
}
