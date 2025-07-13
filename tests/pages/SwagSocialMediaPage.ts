import { type Locator, type Page, expect } from '@playwright/test';
import { SuperPageSwag } from './SuperPageSwag';


export class SwagSocialMediaPage extends SuperPageSwag {
	twitterIcon: () => Locator;
	facebookIcon: () => Locator;
	linkedInIcon: () => Locator;


	constructor(driver: Page) {
		super(driver);
		this.twitterIcon = () => this.page.locator('.social_twitter');
		this.facebookIcon = () => this.page.locator('.social_facebook');
		this.linkedInIcon = () => this.page.locator('.social_linkedin');
	}


	async clickonIcons(sortType: "twitter" | "facebook" | "linkedIn" | undefined): Promise<void> {
		const actions: Record<string, () => Promise<void>> = {
			twitter: () => this.twitterIcon().click(),
			facebook: () => this.facebookIcon().click(),
			linkedIn: () => this.linkedInIcon().click(),
		};

		if (!sortType || !actions[sortType]) {
			throw new Error(`Unknown social media type: ${sortType}`);
		}

		await actions[sortType]();
	}

}