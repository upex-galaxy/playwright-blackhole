import { type Page, type Locator, expect } from "@playwright/test";

export class BuzzPage {
    page: Page;
    likeButtons: () => Locator;
    commentButtons: () => Locator;
    shareButtons: () => Locator;
    firstLikeButton: () => Locator;
    likesCounter: () => Locator;
    likeButtonsRedHeart: () => Locator;

    constructor(driver: Page) {
        this.page = driver;
        this.likeButtons = () => this.page.locator('.orangehrm-buzz-post-actions div');    //!hacerlo dinámico
        this.commentButtons = () => this.page.locator('.orangehrm-buzz-post-actions button [class$="bi-chat-text-fill"]');
        this.shareButtons = () => this.page.locator('.orangehrm-buzz-post-actions button [class$="bi-share-fill"]');
    }

    async goToBuzzPage() { 
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/buzz/viewBuzz', { waitUntil: 'domcontentloaded' });
        expect(this.page.url()).toContain('viewBuzz');
    }

    async clickCommentButton() {
        const listCommentButtons = this.commentButtons();
        await listCommentButtons.first().click();
    }

    async isRedHeartVisible() { 
        return await this.page.isVisible('.orangehrm-like-animation');
    }

    async clickLikeButton() {
        const listLikes = this.likeButtons();
        await listLikes.first().click();
    }

    async clickShareButton() {
        const listShareButtons = this.shareButtons();
        await listShareButtons.first().click();
    }
}