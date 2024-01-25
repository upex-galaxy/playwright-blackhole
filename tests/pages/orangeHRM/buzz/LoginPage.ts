import { Page, Locator } from '@playwright/test';

export class LoginPage {
    page: Page; 
    userNameInput: () => Locator;
    passwordInput: () => Locator;
    loginButton: () => Locator;

    constructor(driver: Page) { 
        this.page = driver
        this.userNameInput = () => this.page.locator('[name="username"]')
        this.passwordInput = () => this.page.locator('[name="password"]')
        this.loginButton = () => this.page.locator('[type="submit"]', {hasText: ' Login '})
    }

    async login(userNameValue: string, passwordValue: string) { 
        await this.userNameInput().fill(userNameValue)
        await this.passwordInput().fill(passwordValue)
        await this.loginButton().click()
    }

    

    
}