import { feature, test, expect } from '@pages/TestBaseRo'

feature('GX-1958: Space Beyond - Login / Logout', () => {
    
    test('TC1: Login', async ({ loginPage }) => {
        await loginPage.loginSuccess()
        const displayexpected = await loginPage.usernameButton().innerText()
        expect(displayexpected.split(',')[0]).toBe('HELLO')
    });

    test('TC2: Forgot to enters an username or password', async ({ loginPage }) => {
        /*await loginPage.page.goto('https://demo.testim.io/login')
        await loginPage.enterUsername('')
        await loginPage.enterPassword('test')
        await loginPage.submitLogin()
        expect(loginPage.page.url()).toBe('https://demo.testim.io/')*/

    });

    test('TC3: Logout', async ({ loginPage, logoutPage }) => {
        await loginPage.loginSuccess()
        await loginPage.logoutPage()
        const logoutexpected = await loginPage.usernameButton().innerText()
        expect(logoutexpected).toBe('LOG IN')

    });

});