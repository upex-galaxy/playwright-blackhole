import { story , test, precondition } from '@TestBase';

story('GX3-2433 | Select Destination | ', () => {
	precondition('test selectors', async ({ page, loginSpaceJhoa }) => {
		await page.goto('https://demo.testim.io/');
		await loginSpaceJhoa.loginSuccess();
	});
	test('GX3-2433 | TC1: Select Destination' , async ({ destinationSpace, filterPage }) => {
		await destinationSpace.selectDropdownOptionByName('Launch', 'Babahoyo');
		await destinationSpace.selectDropdownOptionByName('Planet color' , 'Blue');
		await filterPage.moveSliderTo(-80);
	});
	test('GX3-2433 | TC2: Select Radom Destination' , async ({ destinationSpace }) => {
		const chosenOpt = await destinationSpace.selectAnyDropdownOption('Launch');
		const chosenPlanet = await destinationSpace.selectAnyDropdownOption('Planet color');
		console.log('Chosen option 1: ', chosenOpt);
		console.log('chosen Planet2: ', chosenPlanet );
	});

});

test('Ely Challenge Request: Use Dropdown Strategy for random select', async ({ page, destinationSpace }) => {
	await page.goto('https://demoqa.com/select-menu');
	await destinationSpace.demoQASelectRadomOption2();

});