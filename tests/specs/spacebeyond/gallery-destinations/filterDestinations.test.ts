import { story, test } from '@TestBase';

story('Gallery Destinations', () => {

	test('filter by slider', async ({ page, filterPage }) => {

		await page.goto('https://demo.testim.io/');
		await filterPage.moveSliderTo(-30);
	});
});