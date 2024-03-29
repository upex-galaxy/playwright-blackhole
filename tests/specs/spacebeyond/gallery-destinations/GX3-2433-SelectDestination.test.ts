import { story , test, precondition } from '@TestBase';

story('GX3-2433 | Select Destination | ', () => {
	precondition('test selectors', async ({ page, loginSpaceJhoa }) => {
		await page.goto('https://demo.testim.io/');
		await loginSpaceJhoa.loginSuccess();
	});
	test('GX3-2433 | TC1: Select Destination' , async ({ destinationSpace, filterPage }) => {
		await destinationSpace.selectDropdownOptionByName('Launch', 'Babahoyo');
		await filterPage.moveSliderTo(-80);
	});
	test('GX3-2433 | TC2: Select Radom Destination' , async ({ destinationSpace }) => {
		// await destinationSpace.getRadomLaunch();
		const chosenOpt = await destinationSpace.selectAnyDropdownOption('Launch');
		console.log('Chosen option 1: ', chosenOpt);
	});

});

test('Ely Challenge Request: Use Dropdown Strategy for random select', async ({ page }) => {
	await page.goto('https://demoqa.com/select-menu');
	await page.pause(); // todo: trabajar
});