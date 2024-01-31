import { story, test, precondition, expect } from '@pages/TestBaseIsa';

story('GX3-1794: OrangeHRM | Buzz | Interact with post by Shares, Likes or Comments', () => {   
	precondition(async ({ buzzPage, orangeLoginPage }) => {
		await orangeLoginPage.loginSuccess();
		await buzzPage.goToBuzzPage();
	});

	test('GX3-1799 | TC01: Should turn red the like button when clicking on it', async ({ buzzPage }) => { 
		await buzzPage.clickLikeButton();
		expect(buzzPage.isRedHeartVisible()).toBeTruthy();

	});
	test('GX3-1799 | TC02: Should can comment successfully in a post when the Enter key is pressed in the textbox', async ({ buzzPage }) => { 
		await buzzPage.clickCommentButton();
		await buzzPage.writeYourComment('Hi Dani 🩴');

		const enteredComment = await buzzPage.writeCommentInput().inputValue();
		expect(enteredComment).toBe('Hi Dani 🩴');
	});

	test('GX3-1799 | TC03: Should display a post when the "Share" button in the pop-up is clicked', async ({ buzzPage }) => { 
		await buzzPage.clickShareButton();
		expect(buzzPage.sharePopUp()).toBeVisible();        
		await buzzPage.clickshareButtonPopUp();
		expect(buzzPage.shareSuccessfulMessage()).toHaveText('Successfully Saved');

		const response = await buzzPage.interceptResponseAPI('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/buzz/shares');
		const statusCode = response.status();
		console.log(`The status code is: ${statusCode}`);
		expect(statusCode).toBe(200);      
	});
});