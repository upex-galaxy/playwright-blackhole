import { expect, precondition, story, test } from '@TestBase';
import { UploadPage } from '@pages/SagriUploadPage';

story('GX3-4199: ToolsQA | Elements | Upload and Downloa', () => {
	let uploadPage: UploadPage;
	precondition(async ({ page }) => {
		uploadPage = new UploadPage(page);
		void page.goto('/upload-download', { waitUntil: 'domcontentloaded' });
	});

	test('GX3-4200 | TC1: Should download a file', async () => {
		const { downloadedFiles, downloadedFile } = await uploadPage.downLoadFile();
		console.log('downloadedFiles:', downloadedFiles);
		expect(downloadedFiles.includes(downloadedFile)).toBeTruthy();
	});

	test('GX3-4200 | TC2: Should upload a file', async () => {
		await uploadPage.uploadFile('guapucho.jpg');
		const value = await uploadPage.uploadFileValue();
		console.log('uploadedFile Value:', value);
		expect(value).toContain('guapucho.jpg');
	});
});