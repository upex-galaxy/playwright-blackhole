import { type Page, type Locator, expect } from "@playwright/test";

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

    constructor(driver: Page) {
        this.page = driver;
        this.likeButtons = () => this.page.locator('.orangehrm-buzz-post-actions div');    //!hacerlo dinámico
        this.commentButtons = () => this.page.locator('.orangehrm-buzz-post-actions button [class$="bi-chat-text-fill"]');
        this.shareButtons = () => this.page.locator('.orangehrm-buzz-post-actions button [class$="bi-share-fill"]');
        this.shareButtonPopUp = () => this.page.locator('[class$="orangehrm-buzz-post-modal-actions"] button');
        this.sharePopUp = () => this.page.locator('[class$="oxd-sheet--rounded oxd-sheet--white oxd-dialog-sheet oxd-dialog-sheet--shadow oxd-dialog-sheet--gutters orangehrm-dialog-modal"]');
        this.shareSuccessfulMessage = () => this.page.locator('[class="oxd-toast oxd-toast-container--toast oxd-toast-list-leave-active oxd-toast-list-leave-to"]');
    }

    async goToBuzzPage() { 
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/buzz/viewBuzz', { waitUntil: 'domcontentloaded' });
        expect(this.page.url()).toContain('viewBuzz');
    }

    async clickLikeButton() {
        const listLikes = this.likeButtons();
        await listLikes.first().click();
    }

    async isRedHeartVisible() { 
        return await this.page.isVisible('.orangehrm-like-animation');
    }
    
    async clickCommentButton() {
        const listCommentButtons = this.commentButtons();
        await listCommentButtons.first().click();
    }



    async clickShareButton() {
        const listShareButtons = this.shareButtons();
        await listShareButtons.first().click();
    }

    async clickshareButtonPopUp() { 
        const shareButtonPopUP = this.shareButtonPopUp();
        await shareButtonPopUP.click();
    }
    

}