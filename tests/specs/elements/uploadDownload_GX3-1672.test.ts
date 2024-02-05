import { story, precondition, test, expect } from '@TestBase';
import { UploadPage } from '@pages/LlamUploadPages';

story('GX3-1672: Element | Upload and Download', () => {
	let downloadPage: UploadPage;

	precondition('Must be situated on download-upload file web page', async ({ page }) => {
		downloadPage = new UploadPage(page);
		await page.goto('/upload-download', { waitUntil: 'domcontentloaded' });
	});
	test('GX3-1673 | TC1 : Validar descargar un archivo', async () => {
		const { downloadsFolder, downloadedFile } = await downloadPage.downloadFile();
		expect(downloadsFolder.includes(downloadedFile)).toBeTruthy;
	});
	test('GX3-1673 | TC2 : Validar subir un archivo desde el ordenador', async () => {
		await downloadPage.uploadFile('mariposaLlam.jpeg');
		const displayedPath = await downloadPage.uploadFilePath();
		expect(displayedPath).toContain('mariposaLlam.jpeg');
	});
});
