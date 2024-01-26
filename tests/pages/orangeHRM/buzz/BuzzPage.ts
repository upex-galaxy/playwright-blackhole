import { type Page, type Locator } from "@playwright/test";

export class BuzzPage {

    page: Page;
    likeButtons: () => Locator;
    commentButtons: () => Locator;
    shareButtons: () => Locator;
    firstLikeButton: () => Locator;
    likesCounter: () => Locator;

    constructor(driver: Page) {
        this.page = driver;
        this.likeButtons = () => this.page.locator('.orangehrm-buzz-post-actions svg');    //!hacerlo dinámico
        this.commentButtons = () => this.page.locator('.orangehrm-buzz-post-actions button [class$="bi-chat-text-fill"]');
        this.shareButtons = () => this.page.locator('.orangehrm-buzz-post-actions button [class$="bi-share-fill"]');
        // this.likesCounter = () => this.page.locator('.orangehrm-buzz-stats-row p');
    }

    
    async clickCommentButton() {
        const listCommentButtons = this.commentButtons();
        await listCommentButtons.first().click();
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