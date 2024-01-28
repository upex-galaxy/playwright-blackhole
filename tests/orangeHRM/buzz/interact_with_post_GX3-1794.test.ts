import { story, test, precondition, expect } from "@pages/TestBase";
import { BuzzPage } from "@pages/orangeHRM/buzz/BuzzPage";
import { OrangeLoginPage } from "@pages/orangeHRM/buzz/LoginPage";


story('GX3-1794: OrangeHRM | Buzz | Interact with post by Shares, Likes or Comments', () => { 

        
    precondition(async ({ page }) => {
        const loginPage = new OrangeLoginPage(page);
        const buzzPage = new BuzzPage(page);

        await loginPage.loginAndSubmit('Admin', 'admin123');   //!quitar static data
        await buzzPage.goToBuzzPage();
    });

    test('GX3-1799 | TC01:  Should click on the like button', async ({ page }) => { 
        const buzzPage = new BuzzPage(page);
        await buzzPage.clickLikeButton();
        expect(buzzPage.isRedHeartVisible()).toBeTruthy();

    });
    test('GX3-1799 | TC02: Should make a comment in a post', async ({ page }) => { 
        const buzzPage = new BuzzPage(page);
        await buzzPage.clickCommentButton();
    });

    test('GX3-1799 | TC03: Should share a post', async ({ page }) => { 
        const buzzPage = new BuzzPage(page);
        await buzzPage.clickShareButton();
    });
})