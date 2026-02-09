import { Page, Locator, expect } from '@playwright/test';
import { LogoutPage } from './LogoutPage'; // Import LogoutPage if needed

export class MyAccountPage {

    private readonly page: Page;
    
    private readonly MyAccountHeading: Locator;
    private readonly LogoutLink: Locator;

    constructor(page: Page) {

        this.page = page;

        this.MyAccountHeading = page.locator('h2:has-text("My Account")');
        this.LogoutLink = page.locator("text='Logout'").nth(1);
    }

  
    
    async IsMyAccountPageExists(): Promise<boolean> {

        try {
            const IsVisible = await this.MyAccountHeading.isVisible();
            return IsVisible;
        } catch (error) {
            console.log(`Error checking My Account page Heading visibility: ${error}`);
            return false;
        }
    }


    async ClickLogout(): Promise<LogoutPage> {

        try {
            await this.LogoutLink.click();
            return new LogoutPage(this.page);   // VVIP - Returning LogOut Page
        } catch (error) {
            console.log(`Unable to click Logout link: ${error}`);
            throw error; // Re-throw the error to fail the test
        }
    }

   
    async GetPageTitle(): Promise<string> {
        return (this.page.title());
    }
}