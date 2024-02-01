import { type Page, type Locator, expect } from '@playwright/test';

export class BuzzPage {
	page: Page;
	likeButtons: () => Locator;
	commentButtons: () => Locator;
	shareButtons: () => Locator;
	firstLikeButton: () => Locator;
	likesCounter: () => Locator;
	likeButtonsRedHeart: () => Locator;
	shareButtonPopUp: () => Locator;
	sharePopUp: () => Locator;
	shareSuccessfulMessage: () => Locator;
	writeCommentInput: () => Locator;
	postItem: () => Locator;

	constructor(driver: Page) {
		this.page = driver;
		this.postItem = () => this.page.locator('[class*="oxd-sheet--white orangehrm-buzz"]');

		this.likeButtons = () => this.page.locator('.orangehrm-buzz-post-actions div svg');
		this.commentButtons = () => this.page.locator('.orangehrm-buzz-post-actions button [class$="bi-chat-text-fill"]');
		this.shareButtons = () => this.page.locator('.orangehrm-buzz-post-actions button [class$="bi-share-fill"]');
		this.shareButtonPopUp = () => this.page.locator('[class$="orangehrm-buzz-post-modal-actions"] button');
		this.sharePopUp = () => this.page.locator('[class$="oxd-sheet--rounded oxd-sheet--white oxd-dialog-sheet oxd-dialog-sheet--shadow oxd-dialog-sheet--gutters orangehrm-dialog-modal"]');
		this.shareSuccessfulMessage = () => this.page.locator('[class*="oxd-text--toast-message"]');
		this.writeCommentInput = () => this.page.locator('[class="orangehrm-buzz-comment-add"] form input');
	}

	async goToBuzzPage() { 
		await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/buzz/viewBuzz', { waitUntil: 'domcontentloaded' });
		expect(this.page.url()).toContain('viewBuzz');
	}

	async getAnyPost() {
		const posts = this.postItem();
		await this.page.waitForTimeout(2000);
		console.log('- El localizador al que se va a contar sus items es: ' + posts);
		
		const visiblePost = await posts.count();
		console.log('- La cantidad de post visibles es: ' + visiblePost);

		const selectedIndex = Math.floor(Math.random() * visiblePost);
		const givenPost = await this.getPostByIndex(selectedIndex);
		console.log('- El localizador del post para dar like es: ' + givenPost);

		return givenPost;
	}

	async getPostByIndex(index: number) {
		return this.postItem().nth(index);		
	}

	async clickLikeButton(post: Locator) {
		await post.locator(this.likeButtons()).click();
	}

	async isRedHeartVisible() { 
		return await this.page.isVisible('.orangehrm-like-animation');
	}
	
	async clickCommentButton() {
		const listCommentButtons = this.commentButtons();
		await listCommentButtons.first().click();
	}

	async writeYourComment(comment: string) { 
		await this.writeCommentInput().fill(comment);
		await this.page.keyboard.press('Enter');
	}

	async clickShareButton() {
		const listShareButtons = this.shareButtons();
		await listShareButtons.first().click();
	}

	async clickshareButtonPopUp() { 
		const shareButtonPopUP = this.shareButtonPopUp();
		await shareButtonPopUP.click();
	}
    
	async interceptResponseAPI(url: string) {
		try {
			return await this.page.waitForResponse(url);
		} catch (error) {
			console.error(`Error waiting for request response: ${error}`);
			return undefined;
		}
	}
}