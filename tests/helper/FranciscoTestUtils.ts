import { Locator } from '@playwright/test';
export { getValues };

async function getValues(elementos: Locator) {
	const options = await elementos.allInnerTexts();
	const fixedValues = options.map((item) => item.split(':')[1]);
	return fixedValues;
}