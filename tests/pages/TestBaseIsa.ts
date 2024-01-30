import { test as driver } from '@playwright/test';
import { BuzzPage } from './orangeHRM/buzz/BuzzPage';
import { OrangeLoginPage } from './orangeHRM/buzz/LoginPage';


const test = driver.extend<{
	orangeLoginPage: OrangeLoginPage;
	buzzPage: BuzzPage;

}>({	
	orangeLoginPage: async ({ page }, use) => {
		await use(new OrangeLoginPage(page));
	},
	buzzPage: async ({ page }, use) => {
		await use(new BuzzPage(page));
	},
});

export { test };
// Main utilities:
export const story = test.describe;
export const expect = test.expect;
// Hooks:
export const beforeAll = test.beforeAll;
export const precondition = test.beforeEach;
export const postcondition = test.afterEach;
export const afterAll = test.afterAll;