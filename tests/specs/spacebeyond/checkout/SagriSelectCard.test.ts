import type { Locator } from "@playwright/test";
import { expect, story, test } from "@TestBase";
import type { CardMapType } from "tests/interfaces/spaceBeyongTypes";

story('Seleccionar una tarjeta con detalles', () => {

	test('Seleccionar una tarjeta con el título dado ', async ({ page }) => {

		await page.goto('https://demo.testim.io/')
		//Opcion 1
		const createdCard = page.locator('[data-react-toolbox=card]', {has: page.locator('h5', { hasText: 'Madan'})})
		//createdCard.locator('button', { hasText: 'Book'}).click()

		async function getCardMapping(givenCard: Locator) {
			const cardMap = {} as CardMapType
			cardMap.title = await givenCard.locator('h5').innerText()
			cardMap.desc = await givenCard.locator('p').innerText()
			cardMap.price = await givenCard.locator('[class*=price-tag]').innerText()
			cardMap.bookButton = givenCard.locator('button', { hasText: 'Book'})	
			return cardMap
		}

		async function getRandomCard() {
			const availableCards = await page.locator('[data-react-toolbox=card]').count()
			const chosenCardIndex = Math.floor(Math.random() * availableCards)
			const givenCard = page.locator('[data-react-toolbox=card]').nth(chosenCardIndex)
			const cardMap = await getCardMapping(givenCard)
			return cardMap
		}

		function getNumberFromPriceString(priceString: string) {
			return parseInt(priceString.replace('$', '').replace(',', ''))
		}

		await test.step('Seleccionar una tarjeta con el título dado', async () => {
			const cardMap = await getCardMapping(createdCard)
			console.log('Card Mapping by title <Madan>:', cardMap)
		})

		await test.step('Seleccionar una tarjeta aleatoria', async () => {
			const { title, price: expectedPrice, bookButton} = await getRandomCard()
			console.log('Card Mapping by random:', title)
			console.log('Selected Destiny Price:', expectedPrice)

			console.log('Performing Click...')
			await bookButton.click()
			expect(page.url()).toContain('checkout')

			const checkoutSummaryPrice = await page.locator('[class^=OrderSummary]strong').innerText()
			const checkoutPriceNum = getNumberFromPriceString(checkoutSummaryPrice)
			const expectedPriceNum = getNumberFromPriceString(expectedPrice)

			expect(checkoutPriceNum).toBe(expectedPriceNum)

		})

	});
});


	
