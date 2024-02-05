import { getFiles } from '@helper/testUtils';
import type { Locator, Page } from '@playwright/test';

export class UploadPage {
	page: Page;
	downloadBtn: () => Locator;
	uploadBtn: () => Locator;
	uploadFilePath: () => Promise<string>;

	constructor(driver: Page) {
		this.page = driver;
		this.downloadBtn = () => this.page.locator('#downloadButton');
		this.uploadBtn = () => this.page.locator('.form-control-file');
		this.uploadFilePath = async () => await this.uploadBtn().inputValue();
	}

	async downloadFile() {
		const downloadPromise = this.page.waitForEvent('download');
		await this.downloadBtn().click();
		const download = await downloadPromise;

		const downloadedFile = download.suggestedFilename();
		await download.saveAs('tests/data' + downloadedFile);

		const downloadsFolder = getFiles('tests/data');
		return { downloadsFolder, downloadedFile };
	}

	async uploadFile(fileName: string) {
		await this.uploadBtn().setInputFiles(`tests/data/images/${fileName}`);
	}
}
