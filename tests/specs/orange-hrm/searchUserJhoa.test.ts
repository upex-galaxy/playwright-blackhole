import { story, test, expect, precondition } from '@TestBase';

story('GX3-2362 | OrangeHRM | Admin | Search User' , async () => {
	precondition('Login User' , async ({ orangeLPJhoa }) => {
		await orangeLPJhoa.loginSuccess();
		test.setTimeout(3 * 60 * 1000);
	});
	test('TC1: Search employee by Username' , async ({ orangeSearchUserPage }) => {
		await orangeSearchUserPage.searchUserbyUsername();
		const expectValue = orangeSearchUserPage.outputContainer.innerText();
		await expect(expectValue).toBeTruthy();
	});

	test('TC2: Search employee by User Role' , async ({ orangeSearchUserPage }) => {
		await orangeSearchUserPage.searchUserbyUserRole();
		const expectValue = orangeSearchUserPage.outputContainer.innerText();
		await expect(expectValue).toBeTruthy();
	});
	
	test('TC3: Search employee by Employee Name' , async ({ orangeSearchUserPage }) => {
		await orangeSearchUserPage.searchUserbyName();
		const expectValue = orangeSearchUserPage.outputContainer.innerText();
		await expect(expectValue).toBeTruthy();
	});
	
	test('TC4: Search employee by Status' , async ({ orangeSearchUserPage }) => {
		await orangeSearchUserPage.searchUserbyStatus();
		const expectValue = orangeSearchUserPage.outputContainer.innerText();
		await expect(expectValue).toBeTruthy();
	
	});
	test('TC5: Search User Fail' , async ({ orangeSearchUserPage }) => {
		await orangeSearchUserPage.searchUserFail();
		await expect(orangeSearchUserPage.borderError).toBeVisible();
		await expect(orangeSearchUserPage.errorText).toHaveText('Invalid');
	});
});