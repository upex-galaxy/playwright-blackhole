import { type Page, type Locator } from '@playwright/test';

export class BuzzPage {
	page: Page;
	likeButtons: () => Locator;
	commentButtons: () => Locator;
	shareButtons: () => Locator;
	shareButtonPopUp: () => Locator;
	sharePopUp: () => Locator;
	shareSuccessfulMessage: () => Locator;
	writeCommentInput: () => Locator;
	postItem: () => Locator;
	selectMenuButtton: (menuName: string) => Locator;

	constructor(driver: Page) {
		this.page = driver;
		this.selectMenuButtton = menuName => this.page.locator(`[class="oxd-main-menu-item-wrapper"] [href*="${menuName}"]`);
		this.postItem = () => this.page.locator('[class*="oxd-sheet--white orangehrm-buzz"]:not([class*="gutters"])');
		this.likeButtons = () => this.page.locator('.orangehrm-buzz-post-actions div svg');
		this.commentButtons = () => this.page.locator('.orangehrm-buzz-post-actions button [class$="bi-chat-text-fill"]');
		this.shareButtons = () => this.page.locator('.orangehrm-buzz-post-actions button [class$="bi-share-fill"]');
		this.shareButtonPopUp = () => this.page.locator('[class$="orangehrm-buzz-post-modal-actions"] button');
		this.sharePopUp = () => this.page.locator('[class$="oxd-sheet--rounded oxd-sheet--white oxd-dialog-sheet oxd-dialog-sheet--shadow oxd-dialog-sheet--gutters orangehrm-dialog-modal"]');
		this.shareSuccessfulMessage = () => this.page.locator('[class*="oxd-text--toast-message"]');
		this.writeCommentInput = () => this.page.locator('[class="orangehrm-buzz-comment-add"] form input');
	}

	async goToBuzzPage(nameMenu: string) { 
		await this.selectMenuButtton(nameMenu).click();
	}

	async getAnyPost() {
		const posts = this.postItem();
		await this.page.waitForTimeout(2000);
		console.log('- El localizador al que se va a contar sus items es: ' + posts);
		
		const visiblePost = await posts.count();
		console.log('- La cantidad de post visibles es: ' + visiblePost);

		const selectedIndex = Math.floor(Math.random() * visiblePost -1);
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
	
	async clickCommentButton(post: Locator) {	
		const listCommentButtons = post.locator(this.commentButtons());
		await listCommentButtons.click();
	}

	async writeYourComment(comment: string) { 
		await this.writeCommentInput().fill(comment);
		await this.page.keyboard.press('Enter');
	}

	async clickShareButton(share: Locator) {
		const listShareButtons = share.locator(this.shareButtons());
		await listShareButtons.click();
	}

	async clickshareButtonPopUp() { 
		const shareButtonPopUP = this.shareButtonPopUp();
		await shareButtonPopUP.click();
	}
}