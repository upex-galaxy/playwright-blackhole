import { test as driver } from '@playwright/test';
import { SpaceLoginPage } from '@pages/SpaceLoginPageRo';
import { userInfo } from 'os';

const test = driver.extend<{
    loginPage: SpaceLoginPage;
    logoutPage: SpaceLoginPage;
}>({
    loginPage: async ({ page }, use) => {
        await use(new SpaceLoginPage(page));
    },
    logoutPage:async ({page}, use) => {
        await use(new SpaceLoginPage(page))
    }
    
});

export { test };
// Main utilities:
export const feature = test.describe;
export const expect = test.expect;
// Hooks:
export const beforeAll = test.beforeAll;
export const precondition = test.beforeEach;
export const postcondition = test.afterEach;
export const afterAll = test.afterAll;
