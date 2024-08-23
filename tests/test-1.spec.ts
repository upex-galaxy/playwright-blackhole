import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.getByLabel('Expand all').click();
});