import { Page, expect, Locator } from '@playwright/test';

export class CheckoutPage {

    private readonly page: Page;
    
    private readonly GuestRadioButton: Locator;
    private readonly ContinueButton: Locator;
    private readonly FirstName: Locator;
    private readonly LastName: Locator;
    private readonly Address1: Locator;
    private readonly Address2: Locator;
    private readonly City: Locator;
    private readonly Pin: Locator;
    private readonly CountryDropdown: Locator;
    private readonly StateDropdown: Locator;
    private readonly ContinueBillingAddressButton: Locator;
    private readonly ContinueDeliveryAddressButton: Locator;
    private readonly DeliveryMethod: Locator;
    private readonly ContinueShippingAddressButton: Locator;
    private readonly TermsCheckbox: Locator;
    private readonly ContinuePaymentMethodButton: Locator;
    private readonly TotalPriceLabel: Locator;
    private readonly ConfirmOrderButton: Locator;
    private readonly OrderConfirmMessage: Locator;

    constructor(page: Page) {

        this.page = page;
        
        this.GuestRadioButton = page.locator('input[value="guest"]');
        this.ContinueButton = page.locator('#button-account');
        this.FirstName = page.locator('#input-payment-firstname');
        this.LastName = page.locator('#input-payment-lastname');
        this.Address1 = page.locator('#input-payment-address-1');
        this.Address2 = page.locator('#input-payment-address-2');
        this.City = page.locator('#input-payment-city');
        this.Pin = page.locator('#input-payment-postcode');
        this.CountryDropdown = page.locator('#input-payment-country');
        this.StateDropdown = page.locator('#input-payment-zone');
        this.ContinueBillingAddressButton = page.locator('#button-payment-address');
        this.ContinueDeliveryAddressButton = page.locator('#button-shipping-address');
        this.DeliveryMethod = page.locator('textarea[name="comment"]');
        this.ContinueShippingAddressButton = page.locator('#button-shipping-method');
        this.TermsCheckbox = page.locator('input[name="agree"]');
        this.ContinuePaymentMethodButton = page.locator('#button-payment-method');
        this.TotalPriceLabel = page.locator('strong:has-text("Total:") + td');
        this.ConfirmOrderButton = page.locator('#button-confirm');
        this.OrderConfirmMessage = page.locator('#content h1');
    }

    // Check if checkout page exists

    async isCheckoutPageExists() {
        try {
            await expect(this.page).toHaveTitle("Checkout");
            return true;
        } catch (error) {
            return false;
        }
    }
    
    // Choose Checkout Option

    async ChooseCheckoutOption(CheckOutOption: string){
        if (CheckOutOption === "Guest Checkout") {
            await this.GuestRadioButton.click();
        }
    }

    // Click on Continue Cutton

    async ClickOnContinue(){
        await this.ContinueButton.click();
    }

    // Form Field Fethods

    async EnterFirstName(FirstName: string){
        await this.FirstName.fill(FirstName);
    }

    async EnterLastName(LastName: string){
        await this.LastName.fill(LastName);
    }

    async EnterAddress1(Address1: string) {
        await this.Address1.fill(Address1);
    }

    async EnterAddress2(Address2: string){
        await this.Address2.fill(Address2);
    }

    async EnterCity(City: string){
        await this.City.fill(City);
    }

    async EnterPin(Pin: string){
        await this.Pin.fill(Pin);
    }

    async SelectCountry(Country: string){
        await this.CountryDropdown.selectOption({ label: Country });
    }

    async SelectState(State: string){
        await this.StateDropdown.selectOption({ label: State });
    }

    // Continue Button Methods

    async ClickOnContinueAfterBillingAddress() {
        await this.ContinueBillingAddressButton.click();
    }

    async ClickOnContinueAfterDeliveryAddress() {
        await this.ContinueDeliveryAddressButton.click();
    }

    // Delivery method

    async EnterDeliveryMethodComment(DeliveryMessage: string) {
        await this.DeliveryMethod.fill(DeliveryMessage);
    }

    async ClickOnContinueAfterDeliveryMethod() {
        await this.ContinueShippingAddressButton.click();
    }

    // Terms and conditions

    async SelectTermsAndConditions() {
        await this.TermsCheckbox.check();
    }

    async ClickOnContinueAfterPaymentMethod() {
        await this.ContinuePaymentMethodButton.click();
    }

    // Order confirmation

    async GetTotalPriceBeforeConfirmingOrder() {
        return await this.TotalPriceLabel.textContent();
    }

    async ClickOnConfirmOrder() {
        await this.ConfirmOrderButton.click();
    }

    async IsOrderPlaced() {

        try {
            
            if (this.page.on('dialog', dialog => dialog.accept())) {
                await this.page.waitForEvent('dialog');
            }  
            await expect(this.OrderConfirmMessage).toHaveText("Your order has been placed!");
            return true;

        } catch (error) {
            console.log(`Error verifying order placement: ${error}`);
            return false;
        }
    }
}