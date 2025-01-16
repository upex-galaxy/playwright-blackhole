
import {test,expect} from '@playwright/test'
import data from '@data/vickyUserDetails.json' assert {type:'json'};
import type { simpleForm } from '@type/vickyTypeForm';
import { getRealValue } from '@helper/vickyTestUtils';



test.describe('GX3-5999: ToolsQA | Elements | Text Box: Fill form and Submit',()=>{


	test.beforeEach(async({page})=>{
		page.goto('https://demoqa.com/text-box',{waitUntil:'domcontentloaded'});
	})

	test('TC1:Should fill the form and submit',async({page})=>{
		const userNameInput = page.locator('#userName-wrapper input')
		const mailInput =page.locator ('#userEmail-wrapper input')
		const currentAddress = page.locator ('#currentAddress-wrapper textarea')
		const permanentAddress = page.locator('#permanentAddress-wrapper textarea')

	await test.step('Fill the userName',async()=>{
		await userNameInput.fill(data[0].fullName)
	})	
	await test.step('Fill the email',async()=>{
		await mailInput.fill(data[0].email)
	})
	await test.step('Fill the currentAddress', async()=>{
		await currentAddress.fill(data[0].currentAddress)
	})
	await test.step('Fill the permanentAddress', async()=>{
		await permanentAddress.fill(data[0].permanentAddress)
	})
	await page.locator('button',{hasText:'Submit'}).click()
	await page.locator('#output').isVisible()

	await test.step('Verify outputs',async()=>{
		const userNameOutput= await page.locator('#output #name').innerText()
		expect(userNameOutput).toBe("Name:" + data[0].fullName)
		
		const emailOutput= await page.locator('#output #email').innerText()
		expect(emailOutput).toBe("Email:" + data[0].email)

		const currentAddressOutput= await page.locator('#output #currentAddress').innerText()
		expect(currentAddressOutput).toBe("Current Address :" + data[0].currentAddress)

		const permanentAddressOutput= await page.locator('#output #permanentAddress').innerText()
		//expect(permanentAddressOutput).toBe("Permanent Address :" + data[0].permanentAddress)		
		
	})
	})

	test('TC2:Should fill the form and submit',async({page})=>{
		const userNameInput = page.locator('#userName-wrapper input')
		const mailInput =page.locator ('#userEmail-wrapper input')
		const currentAddress = page.locator ('#currentAddress-wrapper textarea')
		const permanentAddress = page.locator('#permanentAddress-wrapper textarea')

		
		async function fillForm (datos:simpleForm)
			{
				await userNameInput.fill(datos.fullName)
				await mailInput.fill(datos.email)
				await currentAddress.fill(datos.currentAddress)
				await permanentAddress.fill(datos.permanentAddress)

			}

		for( const credentials of data){
		await fillForm(credentials);
		await page.waitForTimeout(1000)
		await page.locator('button',{hasText:'submit'}).click()
		}
		
	})

    test('TC3:Should fill the form and submit with const',async({page})=>{
		const userNameInput = page.locator('#userName-wrapper input')
		const mailInput =page.locator ('#userEmail-wrapper input')
		const currentAddressInput = page.locator ('#currentAddress-wrapper textarea')
		const permanentAddressInput = page.locator('#permanentAddress-wrapper textarea')

	const expectedName = await test.step('Fill the userName',async()=>{
        const name = data[0].fullName
		await userNameInput.fill(name)
        return name
	})	
    console.log(expectedName)
	const expectedMail = await test.step('Fill the email',async()=>{
        const mail=data[0].email
		await mailInput.fill(mail)
        return mail
	})
	const expectedCurrentAddress = await test.step('Fill the currentAddress', async()=>{
		const currentAddress= data[0].currentAddress
        await currentAddressInput.fill(currentAddress)
        return currentAddress
	})
	const expectedPermanentAddress = await test.step('Fill the permanentAddress', async()=>{
		const permanentAddress = data[0].permanentAddress
        await permanentAddressInput.fill(permanentAddress)
        return permanentAddress
	})
	await page.locator('button',{hasText:'Submit'}).click()
	await page.locator('#output').isVisible()

	await test.step('Verify outputs',async()=>{
		const output =  page.locator('#output p')
        const displayedValues = await getRealValue(output)
        console.log(displayedValues)
        const expectedValues= [expectedName, expectedMail, expectedCurrentAddress,expectedPermanentAddress]
        expect (displayedValues).toEqual(expectedValues) 
		 	
	})
	})

    test('TC4:Should Not submit with wrong mail',async({page})=>{
		const userNameInput = page.locator('#userName-wrapper input')
		const mailInput =page.locator ('#userEmail-wrapper input')
		const currentAddressInput = page.locator ('#currentAddress-wrapper textarea')
		const permanentAddressInput = page.locator('#permanentAddress-wrapper textarea')
        const wrongMail= page.locator('#userEmail-wrapper .mr-sm-2.field-error.form-control')
	
        const expectedName = await test.step('Fill the userName',async()=>{
        const name = data[1].fullName
		await userNameInput.fill(name)
        return name
	})	
    console.log(expectedName)
	const expectedMail = await test.step('Fill the email',async()=>{
        const mail=data[1].email
		await mailInput.fill(mail)
        return mail
	})
	const expectedCurrentAddress = await test.step('Fill the currentAddress', async()=>{
		const currentAddress= data[1].currentAddress
        await currentAddressInput.fill(currentAddress)
        return currentAddress
	})
	const expectedPermanentAddress = await test.step('Fill the permanentAddress', async()=>{
		const permanentAddress = data[1].permanentAddress
        await permanentAddressInput.fill(permanentAddress)
        return permanentAddress
	})
	await page.locator('button',{hasText:'Submit'}).click()
	await page.locator('#output').isVisible()

	await test.step('Verify outputs',async()=>{
		
        expect(wrongMail).toBeVisible()
		
		// 	
	})
	})


})

