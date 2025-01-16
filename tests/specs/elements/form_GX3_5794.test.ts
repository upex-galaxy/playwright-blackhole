
import {test,story,precondition,expect} from '@TestBase';
import data from '@data/vickyUserDetails.json' assert {type:'json'};
import { type SimpleForm } from '@type/inputTypes';


story('GX3-5794: ToolsQA | Elements | Text Box: Fill form and Submit',()=>{


	precondition(async({page})=>{
		page.goto('/text-box',{waitUntil:'domcontentloaded'});
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

		
		async function fillForm (datos:SimpleForm)
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

})

