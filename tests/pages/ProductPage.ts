import { Locator, Page } from "@playwright/test";


export class ProductPage{
    page: Page;
    cards: Locator;
    bookBtn: Locator;

    constructor(driver:Page){

        this.page= driver
        this.cards = this.page.locator('[data-react-toolbox="card"]')
        this.bookBtn = this.page.locator('button', { hasText: 'Book' })
    }

   
    async getRandomCard(){
        const totalCards = await this.cards.count()
        const random = Math.floor(Math.random() * totalCards)
        return random
    }
   
   
    async bookRandomCard(){
        
        const randomCard= await this.getRandomCard()
        const btnCard = await this.bookBtn.nth(randomCard).click()
        return randomCard
       
       
    }
    
  
}