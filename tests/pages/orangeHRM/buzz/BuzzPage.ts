import { Page, Locator } from "@playwright/test";

export class BuzzPage { 

    page: Page;
    likeButtons: () => Locator;
    commentButtons: () => Locator;
    shareButtons: () => Locator;

    constructor(driver: Page) { 
        this.page = driver
        this.likeButtons = () => this.page.locator('[class="orangehrm-buzz-post-actions"] div');
        this.commentButtons = () => this.page.locator('[class="orangehrm-buzz-post-actions"] button [class$="bi-chat-text-fill"]');
        this.shareButtons = () => this.page.locator('[class="orangehrm-buzz-post-actions"] button [class$="bi-share-fill"]')

    }
}