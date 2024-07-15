import { expect, precondition, story, test } from '@TestBase';
import { UploadPage } from '@pages/SagriUploadPage';

story('Example Story: Upload and Download', () => {
	let uploadPage: UploadPage;
	precondition(async ({ page }) => {
		uploadPage = new UploadPage(page);
		void page.goto('/upload-download', { waitUntil: 'domcontentloaded' });
	});

	test('TC1: Should download a file', async () => {
		const { downloadedFiles, downloadedFile } = await uploadPage.downLoadFile();
		console.log('downloadedFiles:', downloadedFiles);
		expect(downloadedFiles.includes(downloadedFile)).toBeTruthy();
	});

	test('TC2: Should upload a file', async () => {
		await uploadPage.uploadFile('guapucho.jpg');
		const value = await uploadPage.uploadFileValue();
		console.log('uploadedFile Value:', value);
		expect(value).toContain('guapucho.jpg');
	});
});