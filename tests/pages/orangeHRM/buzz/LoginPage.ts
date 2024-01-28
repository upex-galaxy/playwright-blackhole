import { expect } from '@pages/TestBase';
import { Page, Locator } from '@playwright/test';

export class OrangeLoginPage {
    page: Page; 
    userNameInput: () => Locator;
    passwordInput: () => Locator;
    loginButton: () => Locator;

    constructor(driver: Page) { 
        this.page = driver;
        this.userNameInput = () => this.page.locator('[name="username"]');
        this.passwordInput = () => this.page.locator('[name="password"]');
        this.loginButton = () => this.page.locator('[type="submit"]');
    }

    async enterUserName(userNameValue: string) { 
        await this.userNameInput().fill(userNameValue);
    }

    async enterPassword(passwordValue: string) { 
        await this.passwordInput().fill(passwordValue);
    }

    async submitLogin() { 
        await this.loginButton().click();
    }

    async loginAndSubmit(userNameValue: string, passwordValue: string) { 
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'domcontentloaded' });
        await this.enterUserName(userNameValue);
        await this.enterPassword(passwordValue);
        await this.submitLogin();
        expect(this.page.url()).toContain('index');
    }    
}