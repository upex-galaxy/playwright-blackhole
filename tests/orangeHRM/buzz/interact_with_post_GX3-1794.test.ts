import { story, test, precondition, expect } from "@pages/TestBase";
import { LoginPage } from "@pages/orangeHRM/buzz/LoginPage";

story('GX3-1794: OrangeHRM | Buzz | Interact with post by Shares, Likes or Comments', () => { 
    
    precondition(async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.login('Admin', 'admin123');   //!quitar static data
        expect(page.url()).toContain('index');        
        page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/buzz/viewBuzz', { waitUntil: 'domcontentloaded' });
        expect(page.url()).toContain('viewBuzz');
    });

    test('GX3-1799 | TC01: Should share a post', async ({ page }) => { 
        expect(1).toEqual(1);
    });
    
    test('GX3-1799 | TC02: Should click on the like button', async ({ page }) => { 
        expect(1).toEqual(1);
    });
    
    test('GX3-1799 | TC03: Should make a comment in a post', async ({ page }) => { 
        expect(1).toEqual(1);
    });
})