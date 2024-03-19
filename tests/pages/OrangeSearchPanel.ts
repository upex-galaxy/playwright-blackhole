import { type Page, type Locator, expect } from '@playwright/test';

export class OrangeSearchPanel {
	page: Page;
	adminTab: Locator;
	searchTab: Locator;
	pimTab: Locator;
	leaveTab: Locator;
	timeTab: Locator;
	recruitmentTab: Locator; 
	myinfoTab: Locator;
	performanceTab: Locator;
	dashboardTab: Locator;
	directoryTab: Locator;
	maintenanceTab: Locator;
	claimTab: Locator;
	buzzTab: Locator;

	constructor(page: Page) {
		this.page = page;
		this.adminTab = this.page.locator('a', { hasText: 'Admin' });
		this.searchTab = this.page.locator('input', { hasText: 'Search' });
		this.pimTab = this.page.locator('a', { hasText: 'PIM' });
		this.leaveTab = this.page.locator('a', { hasText: 'Leave' });
		this.timeTab = this.page.locator('a' , { hasText: 'time' });
		this.recruitmentTab = this.page.locator('a' , { hasText: 'Recruitment' });
		this.myinfoTab = this.page.locator('a' , { hasText: 'My Info' });
		this.performanceTab = this.page.locator('a' , { hasText: 'Performance' });
		this.dashboardTab = this.page.locator('a' , { hasText: 'Dashboard' });
		this.directoryTab = this.page.locator('a' , { hasText: 'Directory' });
		this.maintenanceTab = this.page.locator('a' , { hasText: 'Maintenance' });
		this.claimTab = this.page.locator('a' , { hasText: 'Claim' });
		this.buzzTab = this.page.locator ('a' , { hasText: 'Buzz' });
	}

	async gotoAdminPage() {
		await this.adminTab.click();
		expect(this.page.url()).toContain('admin/viewSystemUsers');
		await this.page.waitForLoadState('domcontentloaded');
	}
	async gotoPIMPage() {
		await this.pimTab.click();
		expect(this.page.url()).toContain('pim/viewEmployeeList');
		await this.page.waitForLoadState('domcontentloaded');
	}
	async gotoLeavePage() {
		await this.leaveTab.click();
		expect(this.page.url()).toContain('leave/viewLeaveList');
		await this.page.waitForLoadState('domcontentloaded');
	}
	async gotoTimePage() {
		await this.timeTab.click();
		expect(this.page.url()).toContain('time/viewEmployeeTimesheet');
		await this.page.waitForLoadState('domcontentloaded');
	}
	async gotoRecruitmentPage() {
		await this.recruitmentTab.click();
		expect(this.page.url()).toContain('recruitment/viewCandidates');
		await this.page.waitForLoadState('domcontentloaded');
	}
	async gotoMyInfoPage() {
		await this.myinfoTab.click();
		expect(this.page.url()).toContain('viewMyDetails');
		await this.page.waitForLoadState('domcontentloaded');
	}
	async gotoPerformancePage() {
		await this.performanceTab.click();
		expect(this.page.url()).toContain('viewEmployeePerformanceTracker');
		await this.page.waitForLoadState('domcontentloaded');
	}
	async gotoDashboardPage() {
		await this.dashboardTab.click();
		expect(this.page.url()).toContain('dashboard');
		await this.page.waitForLoadState('domcontentloaded');
	}
	async gotoDirectoryPage() {
		await this.directoryTab.click();
		expect(this.page.url()).toContain('viewDirectory');
		await this.page.waitForLoadState('domcontentloaded');
	}
	async gotoMaintenancePage() {
		await this.maintenanceTab.click();
		expect(this.page.url()).toContain('maintenance');
		await this.page.waitForLoadState('domcontentloaded');
	}
	async gotoClaimPage() {
		await this.claimTab.click();
		expect(this.page.url()).toContain('claim/viewClaim');
		await this.page.waitForLoadState('domcontentloaded');
	}
	async gotoBuzzPage() {
		await this.buzzTab.click();
		expect(this.page.url()).toContain('buzz/viewBuzz');
		await this.page.waitForLoadState('domcontentloaded');
	}
}