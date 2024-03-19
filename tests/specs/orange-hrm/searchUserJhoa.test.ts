import { story, test, expect, precondition, } from '@TestBase';

story('GX3-2362 | OrangeHRM | Admin | Search User' , async () => {
	precondition('Login User' , async ({ orangeLPJhoa, orangeSearchPanel }) => {
		await orangeLPJhoa.loginSuccess();
		await orangeSearchPanel.gotoAdminPage();
	});
	test('TC1: Search employee by Username' , async ({ orangeSearchUserPage }) => {
		const givenUser = await orangeSearchUserPage.getRandomUserFromTable();
		await orangeSearchUserPage.searchSystemUser({ username: givenUser });
		const foundUsers = await orangeSearchUserPage.getAllUsernamesInTable();
		await expect(orangeSearchUserPage.tableRows.nth(0)).toBeVisible();
		expect(foundUsers).toContain(givenUser);
		expect(foundUsers[0]).toEqual(givenUser);
	});

	test('TC2: Search employee by User Role' , async ({ orangeSearchUserPage }) => {
		await orangeSearchUserPage.searchSystemUser({ role:'Admin' });
		const foundUsers = await orangeSearchUserPage.getAllUsernamesInTable();
		expect(foundUsers).toContain('Admin');
	});
	
	test('TC3: Search employee by Employee Name' , async ({ orangeSearchUserPage }) => {
		const givenEmployeeName = await orangeSearchUserPage.getRandomEmployeeNameFromTable();
		await orangeSearchUserPage.searchSystemUser({ employeeName: givenEmployeeName });
		const foundEmployeed = await orangeSearchUserPage.getAllEmplyeednameInTable();
		await expect(orangeSearchUserPage.tableRows.nth(0)).toBeVisible();
		expect(foundEmployeed).toContain(givenEmployeeName);
		expect(foundEmployeed[0]).toEqual(givenEmployeeName);
	});
	
	test('TC4: Search employee by Status' , async ({ orangeSearchUserPage }) => {
		await orangeSearchUserPage.searchSystemUser({ status: 'Enabled' });
		const foundStatus = await orangeSearchUserPage.getAllStatusInTable();
		expect(foundStatus).toContain('Enabled');	
	
	});
	test('TC5: Search User Fail' , async ({ orangeSearchUserPage }) => {
		await orangeSearchUserPage.searchUserFail();
		await expect(orangeSearchUserPage.borderError).toBeVisible();
		await expect(orangeSearchUserPage.errorText).toHaveText('Invalid');
	});
});