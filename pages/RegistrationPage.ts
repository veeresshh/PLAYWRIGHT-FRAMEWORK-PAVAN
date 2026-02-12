import { Page, Locator, expect } from '@playwright/test';

export class RegistrationPage {
    
    private readonly page: Page;
    
    private readonly Firstname: Locator;
    private readonly Lastname: Locator;
    private readonly Email: Locator;
    private readonly Telephone: Locator;
    private readonly Password: Locator;
    private readonly ConfirmPassword: Locator;
    private readonly Policy: Locator;
    private readonly ContinueButton: Locator;
    private readonly ConfirmationMessage: Locator;

    constructor(page: Page) {

        this.page = page;
        
        this.Firstname = page.locator('#input-firstname');
        this.Lastname = page.locator('#input-lastname');
        this.Email = page.locator('#input-email');
        this.Telephone = page.locator('#input-telephone');
        this.Password = page.locator('#input-password');
        this.ConfirmPassword = page.locator('#input-confirm');
        this.Policy = page.locator('input[name="agree"]');
        this.ContinueButton = page.locator('input[value="Continue"]');
        this.ConfirmationMessage = page.locator('h1:has-text("Your Account Has Been Created!")');
    }


    async EnterFirstName(FirstName: string): Promise<void> {
        await this.Firstname.fill(FirstName);
    }

    async EnterLastName(LastName: string): Promise<void> {
        await this.Lastname.fill(LastName);
    }

    async EnterEmail(Email: string): Promise<void> {
        await this.Email.fill(Email);
    }

    async EnterTelephone(Telephone: string): Promise<void> {
        await this.Telephone.fill(Telephone);
    }

    async EnterPassword(Password: string): Promise<void> {
        await this.Password.fill(Password);
    }


    async EnterConfirmPassword(Password: string): Promise<void> {
        await this.ConfirmPassword.fill(Password);
    }

  
    async EnterPrivacyPolicy(): Promise<void> {
        await this.Policy.check();
    }

 
    async ClickContinue(): Promise<void> {
        await this.ContinueButton.click();
    }


    async GetConfirmationMsg(): Promise<string> {
        return await this.ConfirmationMessage.textContent() ?? '';
    }


    async CompleteRegistration(userData: {

        FirstName: string;
        LastName: string;
        Email: string;
        Telephone: string;
        Password: string;

    }): Promise<void> {

        await this.EnterFirstName(userData.FirstName);
        await this.EnterLastName(userData.LastName);
        await this.EnterEmail(userData.Email);
        await this.EnterTelephone(userData.Telephone);
        await this.EnterPassword(userData.Password);
        await this.EnterConfirmPassword(userData.Password);
        await this.EnterPrivacyPolicy();
        await this.ClickContinue();
        await expect(this.ConfirmationMessage).toBeVisible();
    }
}
