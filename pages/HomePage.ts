import { Page, expect, Locator } from '@playwright/test';

export class HomePage {

    private readonly page: Page;

    private readonly MyAccountLink: Locator;
    private readonly RegisterLink: Locator;
    private readonly LoginLink: Locator;
    private readonly SearchBox: Locator;
    private readonly SearchButton: Locator;


    constructor(page: Page) {

        this.page = page;
        
        this.MyAccountLink = page.locator('span:has-text("My Account")').describe('My Account Link');
        this.RegisterLink = page.locator('a:has-text("Register")').describe('Register Link');
        this.LoginLink = page.locator('a:has-text("Login")').describe('Login Link');
        this.SearchBox = page.locator('input[placeholder="Search"]').describe('Search Box');
        this.SearchButton = page.locator('#search button[type="button"]').describe('Search Button');
    }

    // Check if HomePage exists

    async IsHomePageExists(){

        let Title : string = await this.page.title();

        if(Title)
        {
            return true;
        }
            return false;
    }

    // Click "My Account" link

    async ClickMyAccountLink(){

        try {
            await this.MyAccountLink.click();
        } catch (error) {
            console.log(`Exception Occurred While Clicking 'My Account': ${error}`);
          throw error;
        }
    }

    // Click "Register" link

    async ClickRegisterLink(){

        try {
            await this.RegisterLink.click();
        } catch (error) {
            console.log(`Exception Occurred While Clicking 'Register': ${error}`);
          throw error;
        }
    }

    // Click "Login" link

    async ClickOnLogin(){

        try {
            await this.LoginLink.click();
        } catch (error) {
            console.log(`Exception Occurred WhileCclicking 'Login': ${error}`);
          throw error;
        }
    }

    // Enter Product Name in the Search Box

    async EnterProductName(pName: string){

        try {
            await this.SearchBox.fill(pName);
        } catch (error) {
            console.log(`Exception Occurred While Entering Product Name: ${error}`);
          throw error;
        }
    }

    // Click the Search Button

    async ClickOnSearchButton(){

        try {
            await this.SearchButton.click();
        } catch (error) {
            console.log(`Exception Occurred While Clicking 'Search': ${error}`);
          throw error;
        }
    }
}