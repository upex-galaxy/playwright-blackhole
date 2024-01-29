import { story, precondition, test } from '@TestBase'
import { Expect } from '@playwright/test'
import { FranciscoForm } from '@type/FranciscoTypes'

story('GX3-1067 | TestCase | Form', () => {
    precondition(async ({ page }) => {
        await page.goto('/text-box')
    })
    test('GX3-1067|TC1|FillForm', async({ page })=> {
        const IdFullname = page.locator('#userName');

        async function FranciscoForm(datos: FranciscoForm) {
            
            
        }
    
    
    })
})