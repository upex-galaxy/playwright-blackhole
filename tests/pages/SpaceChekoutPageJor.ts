import {Locator, Page} from '@playwright/test'
import data from '@data/jorPaymentDetails.json' assert {type:'json'}

export class CheckoutPage{

    page: Page
    nameInput: Locator
    emailInput: Locator
    socialNumberInput: Locator
    phoneNumberInput: Locator
    agreeTermsCheck: Locator
    payNowBtn: Locator
    nameError: Locator
    emailError: Locator
    socialNumberError: Locator
    phoneNumError: Locator
   
 

    constructor(driver:Page){
        this.page = driver
        this.nameInput = this.page.locator('form input').nth(0)
        this.emailInput = this.page.locator('form input').nth(1)
        this.socialNumberInput= this.page.locator('form input').nth(2)
        this.phoneNumberInput = this.page.locator('form input').nth(3)
        this.agreeTermsCheck = this.page.locator('[data-react-toolbox="check"]')
        this.payNowBtn= this.page.locator('button', {hasText: 'Pay now'})
        this.nameError=this.page.locator('form span[class="theme__error___3ilni"]').nth(0)
        this.emailError=this.page.locator('span[class="theme__error___3ilni"]').nth(1)
        this.socialNumberError=this.page.locator('span[class="theme__error___3ilni"]').nth(2)
        this.phoneNumError=this.page.locator('span[class="theme__error___3ilni"]').nth(3)
    }

    async fillName(text:string){
        await this.nameInput.fill(text)
    }
    async fillEmail (text:string){
        await this.emailInput.fill(text)
    }
    async fillSocialNumber (text:string){
        await this.socialNumberInput.fill(text)
    }
    async fillPhoneNumber (text:string){
        await this.phoneNumberInput.fill(text)
    }
    async checkAgreeTerms(){
        await this.agreeTermsCheck.check()
    }
    async clickPayNowBtn(){
        await this.payNowBtn.click() 
    }
    async nameNullInput() {
        const input = await this.page.$("form input"); 
        await input.click(); 
        await this.page.keyboard.type('ab');      
        await this.page.keyboard.press('Backspace');
        await this.page.keyboard.press('Backspace');
        await this.page.keyboard.press('Tab');
      }
      
      

    async fillFormSuccessful (){
        await this.fillName(data.validData.name)
        await this.fillEmail(data.validData.email)
        await this.fillSocialNumber(data.validData.socialNumber)
        await this.fillPhoneNumber(data.validData.phoneNumber)
        await this.checkAgreeTerms()
    }
    async fillFormUnsuccessful (){
        await this.nameNullInput()
        await this.page.keyboard.press('Enter'); 
        await this.fillEmail(data.invalidData.email)
        await this.fillSocialNumber(data.invalidData.socialNumber)
        await this.fillPhoneNumber(data.invalidData.phoneNumber)
        await this.checkAgreeTerms()
    }

    async nameErrorText(){
        const name = await this.nameError.innerText()
        return name
     
    }
    async emailErrorText(){
        const email = await this.emailError.innerText()
        return email
     
    }
    async secNumberErrorText(){
        const socialNum = await this.socialNumberError.innerText()
        return socialNum
     
    }
    async phoneNumErrorText(){
        const phoneNum = await this.phoneNumError.innerText()
        return phoneNum
     
    }

}