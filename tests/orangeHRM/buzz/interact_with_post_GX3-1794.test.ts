import { story, test, precondition, expect } from "@pages/TestBase";
import { LoginPage } from "@pages/orangeHRM/buzz/LoginPage";

story('GX3-1794: OrangeHRM | Buzz | Interact with post by Shares, Likes or Comments', () => { 
    precondition(async ({ page }) => {
        const loginPage = new LoginPage(page);
        // await loginPage.login('Admin', 'admin123');   //quitar static data
    });

    test('GX3-1799 | TC01: async', ({ page }) => { 
        expect(1).toBe(1);
    });
})