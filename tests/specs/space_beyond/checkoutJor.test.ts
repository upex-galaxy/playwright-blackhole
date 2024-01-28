import {feature, precondition, test, expect} from '@pages/TestBaseJor'
import data from '@data/jorPaymentDetails.json' assert {type:'json'}


feature('GX3-1943:  SpaceBeyond | Booking | Book a Destination in Checkout', ()=>{
    precondition(async ({ page, productPage}) => {
        await page.goto('https://demo.testim.io/')
        await productPage.bookRandomCard()
            
    });
    test('TC1: Validate complete the checkout successfully', async ({checkoutPage})=>{
       await checkoutPage.fillFormSuccessful()
       await checkoutPage.clickPayNowBtn()
    })
    test.skip('TC1: Validate unsuccessful completion of payment', async ({ checkoutPage})=>{
        await checkoutPage.fillFormUnsuccessful() 

        const name = await checkoutPage.nameErrorText()
        const email = await checkoutPage.emailErrorText()
        const socNum = await checkoutPage.secNumberErrorText()
        const phoneNum = await checkoutPage.phoneNumErrorText()
             
        expect(name).toContain(data.errorMsg.name)
        expect(email).toContain(data.errorMsg.email)
        expect(socNum).toContain(data.errorMsg.socialNumber)
        expect(phoneNum).toContain(data.errorMsg.phoneNumber)
       
        })
})