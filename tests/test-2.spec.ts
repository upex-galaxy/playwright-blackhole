import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=demoqa&oq=demoqa&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDI5MTVqMGoyqAIAsAIA&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'DEMOQA DEMOQA https://demoqa.com' }).click();
  await page.locator('svg').first().click();
  await page.getByText('Text Box').click();
  await page.getByPlaceholder('Full Name').click();
  await page.getByPlaceholder('Full Name').fill('claud');
  await page.getByPlaceholder('name@example.com').click();
  await page.getByPlaceholder('name@example.com').fill('cluad');
  await page.getByPlaceholder('name@example.com').press('Alt+6');
  await page.getByPlaceholder('name@example.com').press('Alt+4');
  await page.getByPlaceholder('name@example.com').fill('cluad@gmail.com');
  await page.getByPlaceholder('Current Address').click();
  await page.getByPlaceholder('Current Address').fill('7de Mayo, Pilar');
  await page.locator('#permanentAddress').click();
  await page.locator('#permanentAddress').fill('Caba, Buenos Aires');
  await page.locator('#permanentAddress').click();
  await page.locator('#permanentAddress').fill('Caba, Buenos AiresNro 45 ');
  await page.locator('#permanentAddress').click();
  await page.locator('#permanentAddress').fill('Caba, Buenos AiresNro 45  ');
  await page.locator('#permanentAddress').click();
  await page.locator('#permanentAddress').fill('Caba, nro 45, Buenos Aires');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Name:claudEmail:cluad@gmail.comCurrent Address :7de Mayo, Pilar Permananet Addre').click();
});