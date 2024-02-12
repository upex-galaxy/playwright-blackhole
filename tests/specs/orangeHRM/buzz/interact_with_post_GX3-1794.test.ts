import { story, test, precondition, expect } from '@pages/TestBaseIsa';

story('GX3-1794: OrangeHRM | Buzz | Interact with post by Shares, Likes or Comments', () => {   
	precondition(async ({ buzzPage, orangeLoginPage, page }) => {
		await orangeLoginPage.loginSuccess();
		expect(page.url()).toContain('index');
		await buzzPage.goToBuzzPage();
		expect(page.url()).toContain('viewBuzz');
	});

	test('GX3-1799 | TC01: Should turn red the like button when clicking on it', async ({ buzzPage }) => { 
		const givenPost = await buzzPage.getAnyPost();
		await buzzPage.clickLikeButton(givenPost);
		expect(buzzPage.isRedHeartVisible()).toBeTruthy();

	});
	test('GX3-1799 | TC02: Should can comment successfully in a post when the Enter key is pressed in the textbox', async ({ buzzPage }) => { 
		const givenPost = await buzzPage.getAnyPost();
		await buzzPage.clickCommentButton(givenPost);
		await buzzPage.writeYourComment('Hi 🩴✌️.....');

		const enteredComment = await buzzPage.writeCommentInput().inputValue();
		expect(enteredComment).toBe('Hi 🩴✌️.....');
	});

	test('GX3-1799 | TC03: Should display a post when the "Share" button in the pop-up is clicked', async ({ buzzPage }) => { 
		const givenPost = await buzzPage.getAnyPost();
		await buzzPage.clickShareButton(givenPost);
		await expect(buzzPage.sharePopUp()).toBeVisible();        
		await buzzPage.clickshareButtonPopUp();
		await expect(buzzPage.shareSuccessfulMessage()).toHaveText('Successfully Saved');    
	});
});