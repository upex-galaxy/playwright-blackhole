import {test,precondition,story, expect} from '@pages/TestBase'


story('GX3-5713:ToolsQA Elements Buttons',()=>{

precondition(async({page})=>{
	await page.goto('www.demoqa.com')
})

test('TC 1:Validate Double click button ',async({})=>{
		expect (1).toEqual(1)
})
test('TC 2:Validate Right click button ',async({})=>{
	
})
test('TC 3:Validate Simple click button ',async({ })=> {
	})

})
