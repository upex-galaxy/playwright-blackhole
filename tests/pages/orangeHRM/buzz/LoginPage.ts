import { Page, Locator } from '@playwright/test';

export class LoginPage {
    page: Page; 

    constructor(driver: Page) { 
        this.page = driver;
    }
}