import { Page, Locator } from '@playwright/test';
import { CheckoutPage } from './CheckoutPage'; // Import CheckoutPage if needed

export class ShoppingCartPage {

    private readonly page: Page;
    
    private readonly TotalPrice: Locator;
    private readonly CheckoutButton: Locator;

    constructor(page: Page) {

        this.page = page;
        
        this.TotalPrice = page.locator("//*[@id='content']/div[2]/div/table//strong[text()='Total:']//following::td");
        this.CheckoutButton = page.locator("a[class='btn btn-primary']");
    }


    async GetTotalPrice(): Promise<string | null> {
        try {
            return await this.TotalPrice.textContent();
        } catch (error) {
            console.log(`Unable to Retrieve Total Price: ${error}`);
            return null;
        }
    }

 
    async ClickOnCheckout(): Promise<CheckoutPage> {
        await this.CheckoutButton.click();
        return new CheckoutPage(this.page);
    }

    async IsPageLoaded(): Promise<boolean> {
        try {
            return await this.CheckoutButton.isVisible();
        } catch (error) {
            return false;
        }
    }
}