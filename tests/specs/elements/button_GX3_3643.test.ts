import {test} from '@pages/TestBase';

test.describe('GX3-3643:ToolsQA|Elements|Buttons',()=>{


test.beforeEach( async({page})=>{
	await page.goto('https://demoqa.com/buttons')
})


test('TC1: Validar hacer click en el botón doble click',({page})=>{

	const doubleClickBtn = page.locator('#doubleClickBtn')
	doubleClickBtn.click()


})

test('TC2:Realizar click en selector', async({ page })=>{

	const rightClickBtn = page.locator('#rightClickBtn')
    rightClickBtn.click() 

  })

})
