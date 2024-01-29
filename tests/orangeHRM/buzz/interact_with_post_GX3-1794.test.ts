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

    test('GX3-1799 | TC01: Should turn red the like button when clicking on it', async ({ page }) => { 
        const buzzPage = new BuzzPage(page);
        await buzzPage.clickLikeButton();
        expect(buzzPage.isRedHeartVisible()).toBeTruthy();

    });
    test('GX3-1799 | TC02: Should can comment successfully in a post when the Enter key is pressed in the textbox', async ({ page }) => { 
        const buzzPage = new BuzzPage(page);
        await buzzPage.clickCommentButton();
        // await buzzPage.writeYourComment('Hello !!!');
    });

    test('GX3-1799 | TC03: Should display a post when the "Share" button in the pop-up is clicked', async ({ page }) => { 
        const buzzPage = new BuzzPage(page);
        await buzzPage.clickShareButton();
        expect(buzzPage.sharePopUp()).toBeVisible();        
        await buzzPage.clickshareButtonPopUp();

        const response = await buzzPage.interceptResponseAPISharePost('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/buzz/shares');
        const statusCode = response.status();
        console.log(`The status code is: ${statusCode}`);
        expect(statusCode).toBe(200);      
        
        
    });
})