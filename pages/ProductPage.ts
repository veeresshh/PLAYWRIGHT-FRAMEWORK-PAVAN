import { Page, Locator, expect } from '@playwright/test';
import { ShoppingCartPage } from './ShoppingCartPage'; // Import ShoppingCartPage if needed

export class ProductPage {

    private readonly page: Page;
    
    private readonly Quantity: Locator;
    private readonly AddToCartButton: Locator;
    private readonly ConfirmationMessage: Locator;
    private readonly ItemsButton: Locator;
    private readonly ViewCartLink: Locator;

    constructor(page: Page) {

        this.page = page;
 
        this.Quantity = page.locator('input[name="quantity"]');
        this.AddToCartButton = page.locator('#button-cart');
        this.ConfirmationMessage = page.locator('.alert.alert-success.alert-dismissible');
        this.ItemsButton = page.locator('#cart');
        this.ViewCartLink = page.locator('strong:has-text("View Cart")');
    }

   
    async EnterQuantity(Quantity: string): Promise<void> {
        await this.Quantity.fill('');
        await this.Quantity.fill(Quantity);
    }


    async AddToCart(): Promise<void> {
        await this.AddToCartButton.click();
    }


    async IsConfirmationMessageVisible(): Promise<boolean> {

        try {

            if(this.ConfirmationMessage!=null){
                 return true;
            }
            else{
                return false;
            }
           
        } catch (error) {

            console.log(`Confirmation message not found: ${error}`);
            return false;
        }
    }


    async ClickItemsToNavigateToCart(): Promise<void> {
        await this.ItemsButton.click();
    }


    async ClickViewCart(): Promise<ShoppingCartPage> {
        await this.ViewCartLink.click();
        return new ShoppingCartPage(this.page);
    }

 
    async AddProductToCart(Quantity: string): Promise<void> {

        await this.EnterQuantity(Quantity);
        await this.AddToCart();
        await this.IsConfirmationMessageVisible();
    }
}