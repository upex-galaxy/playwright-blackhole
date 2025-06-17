import { test as driver } from '@playwright/test';
import { SwagLoginPage } from './SwagLoginPage';
import { SwagFilter } from './SwagFilter';


const test = driver.extend<{
	swagLoginPage: SwagLoginPage;
	swagFilter: SwagFilter;

}>({
	swagLoginPage: async ({ page }, use) => {
		await use(new SwagLoginPage(page));
	},
	swagFilter: async ({ page }, use) => {
		await use(new SwagFilter(page));
	},
});

export { test };
// Main utilities:
export const story = test.describe;
export const expect = test.expect;
// Hooks:
export const beforeAll = test.beforeAll;
export const precondition = test.beforeEach;
export const afterEach = test.afterEach;
export const afterAll = test.afterAll;