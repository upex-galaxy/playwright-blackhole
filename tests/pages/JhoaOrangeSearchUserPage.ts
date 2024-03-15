import { type Page, type Locator } from '@playwright/test';
import * as env from 'dotenv';
env.config(); 

export class OrangeSearchUser {
	page: Page;
	adminbtn: Locator;
	usernameInput: Locator;
	userRoleBtn: Locator;
	selectUserRole: Locator;
	employeeNameInput: Locator;
	seletName: Locator;
	statusBtn: Locator;
	submitBtn: Locator;
	msgError: Locator;
	borderError: Locator;
	tableContain: Locator;
	errorText: Locator;
	outputContainer: Locator;
	selectStatus: (status: 'Enabled' | 'Disabled') => Locator;
	tableRows: Locator;

	constructor(driver: Page) {
		this.page = driver; 
		this.adminbtn = this.page.locator('a', { hasText: 'Admin' });
		this.usernameInput = this.page.locator('[class*="input--active"]').nth(1);
		this.userRoleBtn = this.page.locator('[class*="text--active"]').nth(0);
		this.selectUserRole = this.page.locator('.oxd-select-option').nth(1);
		this.employeeNameInput = this.page.locator('input').nth(2);
		this.seletName = this.page.locator('.oxd-autocomplete-option');
		this.statusBtn = this.page.locator('[class*="text--active"]').nth(1);
		this.selectStatus = (status: 'Enabled' | 'Disabled') => this.page.locator('span', { hasText: status });
		this.submitBtn = this.page.locator('button[type=submit]');
		this.msgError = this.page.locator('div', { hasText: 'No Records Found' });
		this.borderError = this.page.locator('[class*=\'input--error\']');
		this.tableContain = this.page.locator('.oxd-table-card');
		this.errorText = this.page.locator('[class*=group__message]');
		this.outputContainer = this.page.locator('.orangehrm-container');
		this.tableRows = this.page.locator('.oxd-table-card [role=row]');
	}

	async searchUser() {
		await this.adminbtn.click();
		await this.usernameInput.fill('Admin');
		await this.userRoleBtn.click();
		await this.selectUserRole.click();
		await this.employeeNameInput.fill('Bob Tester');
		await this.page.waitForTimeout(2000);
		await this.seletName.click();
		await this.statusBtn.click();
		await this.selectStatus('Enabled').click();
		await this.submitBtn.click();
	}

	async searchUserFail() {
		await this.adminbtn.click();
		await this.employeeNameInput.fill('dfhd');
		await this.page.waitForTimeout(2000);
		await this.seletName.click();
	}
	async searchUserByUsername() {
		await this.adminbtn.click();
		await this.usernameInput.fill('Admin');
		await this.submitBtn.click();
	}
	async searchSystemUser(arg?: {
		username?: string,
		role?: string,
		employeeName?: string,
		status?: 'Enabled' | 'Disabled'
	}) {
		arg?.username && await this.usernameInput.fill(arg.username);
		if(arg?.role) { 
			await this.userRoleBtn.click();
			await this.selectUserRole.click(); 
		}
		arg?.employeeName && await this.employeeNameInput.fill(arg.employeeName);
		if (arg?.status) {
			await this.statusBtn.click();
			await this.selectStatus(arg.status).click();
		}
		await this.submitBtn.click();
	}

	async searchUserbyUserRole() {
		await this.adminbtn.click();
		await this.userRoleBtn.click();
		await this.selectUserRole.click();
		await this.submitBtn.click();
	}
	async searchUserbyName() {
		await this.adminbtn.click();
		await this.statusBtn.click();
		await this.employeeNameInput.fill('Bob Tester');
		await this.page.waitForTimeout(2000);
		await this.submitBtn.click();
	}
	async searchUserbyStatus() {
		await this.adminbtn.click();
		await this.statusBtn.click();
		await this.selectStatus('Enabled').click();
		await this.submitBtn.click();
	}

	async getAllUsernamesInTable() {
		const allRows = await this.tableRows.all();
		const allCells = allRows.map(row => row.getByRole('cell').nth(1));
		const allUsernames = await Promise.all(allCells.map(cell => cell.innerText()));
		return allUsernames;
	}

	async getRandomUserFromTable() {
		const allUsernames = await this.getAllUsernamesInTable();
		const givenIndex = Math.floor(Math.random() * allUsernames.length);
		const givenUsername = allUsernames[givenIndex];
		return givenUsername;
	}
}
