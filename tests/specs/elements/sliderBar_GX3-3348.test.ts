import { expect , story, precondition, test } from '@TestBase';
story('GX3-3348 | DemoQA | Slider bar' ,() => {
	
	precondition(async ({ page }) => {
		await page.goto('/slider');
	});

	test('move slider bar to the right side', async ({ sliderDemo }) => {
		const firstvalue = await sliderDemo.getSliderValue();
		await sliderDemo.moveSliderTo(50);
		const lastValue = await sliderDemo.getSliderValue(); 
		expect(firstvalue).not.toBe(lastValue);
	});
});