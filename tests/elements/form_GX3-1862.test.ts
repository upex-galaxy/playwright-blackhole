import { story, precondition, test, expect } from "@TestBase";
import data from "@data/GX3-1862-Fill-Form.json" assert {type: "json"};
story("ToolsQA | Elements | Text Box: Fill form and Submit", () => {
    precondition(async ({ page }) => {
    await page.goto('text-box', { waitUntil: 'domcontentloaded' })
    })
    
    test("TC1: Debería llenar el formulario y enviarlo", async ({ page }) => {
        const usernameInput = page.locator("#userName-wrapper input")
        const emailInput = page.locator("#userEmail-wrapper input")
        const currentInput = page.locator("#currentAddress-wrapper textarea")
        const permanentInput = page.locator("#permanentAddress-wrapper textarea")
        
        await test.step("Llenar el username", async () => {
            await usernameInput.fill(data[0].FullName)
        })
        await test.step("Llenar el Email", async () => {
            await emailInput.fill(data[0].Email)
        })
        await test.step("Llenar Current", async () => {
            await currentInput.fill(data[0].CurrentAddress)
        })
        await test.step("llenar permanent", async () => {
            await permanentInput.fill(data[0].PermanentAddress)
        })
        await page.locator('Submit' , {hasText: 'Submit'}).click()
    })
})