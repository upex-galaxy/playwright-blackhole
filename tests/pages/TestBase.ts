import { test as driver } from '@playwright/test';
import { SpaceLoginPage } from './SpaceLoginPage';
import { SpaceProductPage } from './SpaceProductPage';
import { SpaceCheckoutPage } from './SpaceCheckoutPage';
import { TrelloBoards } from '@api/elyTrelloBoards';
import { OrangeLoginPage } from './OrangeLoginPage';
import { SpaceSearchPage } from './SpaceSearchPage';
import { SpaceFilterPage } from './SpaceFilterPage';
import { SwagLoginPage } from './SwagLoginPage';
import { SwagProductDetailsPage } from './SwagProductDetailsPage';

const test = driver.extend<{
	loginPage: SpaceLoginPage;
	productPage: SpaceProductPage;
	checkoutPage: SpaceCheckoutPage;
	apiBoards: TrelloBoards;
	orangeLoginPage: OrangeLoginPage;
	searchPage: SpaceSearchPage;
	filterPage: SpaceFilterPage;
	swagLoginPage: SwagLoginPage;
	swagProductDetailsPage:SwagProductDetailsPage;
}>({
	loginPage: async ({ page }, use) => await use(new SpaceLoginPage(page)),
	searchPage: async ({ page }, use) => await use(new SpaceSearchPage(page)),
	filterPage: async ({ page }, use) => await use(new SpaceFilterPage(page)),
	orangeLoginPage: async ({ page }, use) => await use(new OrangeLoginPage(page)),
	productPage: async ({ page }, use) => await use(new SpaceProductPage(page)),
	checkoutPage: async ({ page }, use) => await use(new SpaceCheckoutPage(page)),
	apiBoards: async ({ page }, use) => await use(new TrelloBoards(page)),
	swagLoginPage: async ({ page }, use) => await use(new SwagLoginPage(page)),
	swagProductDetailsPage: async ({ page }, use) => await use(new SwagProductDetailsPage(page)),
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
