import { Page, Locator } from '@playwright/test';
import { HomePage } from './HomePage';

export class LogoutPage {

    private readonly page: Page;
    
    private readonly ContinueButton: Locator;


    constructor(page: Page) {

        this.page = page;

        this.ContinueButton = page.locator('.btn.btn-primary');
    }

  
    async ClickContinue(): Promise<HomePage> {

        await this.ContinueButton.click();
        return new HomePage(this.page);
    }

   
    async IsContinueButtonVisible(): Promise<boolean> {

        return await this.ContinueButton.isVisible();
    }
}