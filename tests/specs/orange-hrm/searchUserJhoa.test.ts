import { story, test, expect, precondition } from '@TestBase';

story('GX3-2362 | OrangeHRM | Admin | Search User' , async () => {
	precondition('Login User' , async ({ orangeLoginPage }) => {
		await orangeLoginPage.loginSuccess();
	});
	test('TC1: Search User Successfully' , async ({ orangeSearchUserPage }) => {
		await orangeSearchUserPage.searchUser();
		const expectValue = orangeSearchUserPage.tableContain.innerText();
		await expect(expectValue).toBeTruthy();

	});
	test('TC2: Search User Fail' , async ({ orangeSearchUserPage }) => {
		await orangeSearchUserPage.searchUserFail();
		await expect(orangeSearchUserPage.borderError).toBeVisible();
		await expect(orangeSearchUserPage.errorText).toHaveText('Invalid');
	});
});