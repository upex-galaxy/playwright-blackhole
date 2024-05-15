import { expect , story, precondition, test } from '@TestBase';

story('GX3-3348 | DemoQA | Slider bar' ,() => {
	
	precondition(async ({ page }) => {
		await page.goto('/slider');
	});
	test('move the slider barr', async ({ page }) => {
		const sliderSelector = page.locator('#sliderContainer');
		const slider = page.locator('#thumb');
		
		const slidermove = await slider.boundingBox();

		if (slidermove) {
			const moveX = slidermove.x + slidermove.width / 2;
			const moveY = slidermove.y + slidermove.height / 2; 

			await page.mouse.move(moveX, moveY);
			await page.mouse.down();
			await page.mouse.move(moveX + 30, moveY);
			await page.mouse.up();
		}
	});
});