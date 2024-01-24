import { story, precondition, test } from '@TestBase';
story('GX3-1672: Element | Upload and Download', () => {
	precondition(async ({ page }) => {
		await page.goto('/upload-download', { waitUntil: 'domcontentloaded' }); //waitUntil: este método hace que la página cargue con éxito y domcontentloaded, hace que termine la carga de página
	});

	test('1673 | TC1: Validar subir un archivo desde el ordenador', async ({ page }) => {});

	test('1673 | TC2: Validar descargar un archivo y se guarde en la carpeta descargas del ordenador', async ({ page }) => {});
});
