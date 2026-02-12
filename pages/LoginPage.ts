import { Page, Locator } from '@playwright/test';

export class LoginPage {

    private readonly page: Page;

    private readonly EmailAddress: Locator;
    private readonly Password: Locator;
    private readonly LoginButton: Locator;
    private readonly ErrorMessage: Locator;
    

    constructor(page: Page) {

        this.page = page;

        this.EmailAddress = page.locator('#input-email');
        this.Password = page.locator('#input-password');
        this.LoginButton = page.locator('input[value="Login"]');
        this.ErrorMessage=page.locator('.alert.alert-danger.alert-dismissible');
    }


    async EnterEmail(Email: string){

        this.EmailAddress.clear;
        await this.EmailAddress.fill(Email);
    }

    async EnterPassword(Password: string) {

        this.Password.clear
        await this.Password.fill(Password);
    }

    async ClickOnLogin(){
        await this.LoginButton.click();
    }


    async Login(Email: string, Password: string){

        await this.EnterEmail(Email);
        await this.EnterPassword(Password);
        await this.ClickOnLogin();
    }

    async GetLogInErrorMessage():Promise<null | string>{
       
        return(this.ErrorMessage.textContent());
    }
    
}