import { test as driver } from '@playwright/test';
import { ProductPage } from './ProductPage';
import { CheckoutPage} from './SpaceChekoutPageJor';
import { LoginPage } from './LoginPage';



const test = driver.extend<{
    productPage: ProductPage
    checkoutPage : CheckoutPage
    loginPage: LoginPage
   
}>({
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
   
  
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
