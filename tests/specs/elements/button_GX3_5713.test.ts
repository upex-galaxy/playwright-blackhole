import {test,precondition,story, expect} from '@pages/TestBase'


story('GX3-5713:ToolsQA Elements Buttons',()=>{

precondition(async({page})=>{
	await page.goto('/buttons')
})

test('TC 1:Validate Double click button ',async({page})=>{
	
   	 const expectedMessage = await test.step('Perform Double Click on Button', async () => {
		await page.locator('#doubleClickBtn').dblclick()
		const expectedMessage="You have done a double click"
			return expectedMessage;
	 })
	await test.step('Validate Message',async()=>{
	const messageDoubleClick = page.locator('#doubleClickMessage')
	expect(messageDoubleClick).toHaveText(expectedMessage)
	})
})
test('TC 2:Validate Right click button ',async({page})=>{
	const expectedMessage = await test.step('Perform Right Click on Button', async () => {
	await page.locator('#rightClickBtn').click({button:'right'})
	const expectedMessage="You have done a right click"
	return expectedMessage
	})
await test.step('Validate Message',async()=>{
	const messageRightClick = page.locator('#rightClickMessage')
	 expect(messageRightClick).toHaveText(expectedMessage)
	})
	 
})
test('TC 3:Validate Simple click button ',async({page})=> {
	const expectedMessage = await test.step('Perform Right Click on Button', async () => {
	await page.getByText('Click Me', { exact: true }).click({ button: 'left' });	
	const expectedMessage="You have done a dynamic click"
	return expectedMessage
	})
await test.step('Validate Message',async()=>{
	const messageDynamicClick = page.locator('#dynamicClickMessage')
	 expect(messageDynamicClick).toHaveText(expectedMessage)
	})
	 
})
	
})

