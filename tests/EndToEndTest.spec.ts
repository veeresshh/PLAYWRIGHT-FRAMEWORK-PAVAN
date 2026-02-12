/**
 * Test Case: End-to-End Test on Demo E-commerce Application
 *
 * Purpose:
 * This test simulates a complete user flow on an e-commerce site.
 * 
 * Steps:
 * 1) Register a new account
 * 2) Logout after registration
 * 3) Login with the same account
 * 4) Search for a product and add it to the shopping cart
 * 5) Verify cart contents
 * 6) Attempt checkout (disabled since feature isn't available on demo site)
 */

import { test, expect, Page } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { HomePage } from '../pages/HomePage';
import { RandomDataUtility } from '../utils/RandomDataGenerator';
import { TestConfig } from '../test.config';
import { LogoutPage } from '../pages/LogoutPage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// This is the Main Test Block That Runs the Entire Flow

test('Execute End-to-End Test Flow @end-to-end', async ({ page }) => {

    const config = new TestConfig();

    // Navigate to the application's home page

    await page.goto(config.ApplicationUrl);

    // Step 1: Register a New Account and Capture the Generated Email

    let RegisteredEmail: string = await PerformRegistration(page);
    console.log("✅ Registration is completed!");


    // Step 2: Logout After Successful Registration

    await PerformLogout(page);
    console.log("✅ Logout is completed!");


    // Step 3: Login with the Registered Email

    await PerformLogin(page, RegisteredEmail);
    console.log("✅ Login is completed!");


    // Step 4: Search For a Product and Add it to the Cart

    await AddProductToCart(page);
    console.log("✅ Product added to cart!");


    // Step 5: Verify the Contents of the Shopping Cart

    await VerifyShoppingCart(page);
    console.log("✅ Shopping cart verification completed!");

    // Step 6: Perform Checkout (Skipped for Demo Site)

    // await performCheckout(page);
});


// Function to Register a New User Account

async function PerformRegistration(page: Page): Promise<string> {

    const homePage = new HomePage(page);

    await homePage.ClickMyAccountLink();      
    await homePage.ClickRegisterLink();        

    const registrationPage = new RegistrationPage(page);

    await registrationPage.EnterFirstName(RandomDataUtility.GetFirstName());
    await registrationPage.EnterLastName(RandomDataUtility.GetlastName());

    let Email: string = RandomDataUtility.GetEmail();
    await registrationPage.EnterEmail(Email);
    await registrationPage.EnterTelephone(RandomDataUtility.GetPhoneNumber());

    await registrationPage.EnterPassword("test123");
    await registrationPage.EnterConfirmPassword("test123");

    await registrationPage.EnterPrivacyPolicy();  // Accept the privacy policy
    await registrationPage.ClickContinue();     // Submit the registration form

    // Validate that the Registration Was Successful

    const confirmationMsg = await registrationPage.GetConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!');

    return Email; // Return the email for later use in login
}


// Function to log out the Current User

async function PerformLogout(page: Page) {
    
    const myAccountPage = new MyAccountPage(page);
    const logoutPage: LogoutPage = await myAccountPage.ClickLogout();

    // Ensure the "Continue" button is Visible
    expect(await logoutPage.IsContinueButtonVisible()).toBe(true);

    // Click "Continue" and Verify Redirection to HomePage
    const homePage = await logoutPage.ClickContinue();
    expect(await homePage.IsHomePageExists()).toBe(true);
}


// Function to Log in Using the Registered Email

async function PerformLogin(page: Page, email: string) {
    const config = new TestConfig();
    await page.goto(config.ApplicationUrl);  // Reload home page

    const homePage = new HomePage(page);
    await homePage.ClickMyAccountLink();
    await homePage.ClickOnLogin();

    const loginPage = new LoginPage(page);
    await loginPage.Login(email, "test123");  // Use the registered credentials

    // Verify login by Checking My Account Page
    const myAccountPage = new MyAccountPage(page);
    expect(await myAccountPage.IsMyAccountPageExists()).toBeTruthy();
}


// Function to Search for a Product and Add it to Cart

async function AddProductToCart(page: Page) {
    const homePage = new HomePage(page);

    const config = new TestConfig();
    const ProductName: string = config.ProductName;
    const ProductQuantity: string = config.ProductQuantity;

    await homePage.EnterProductName(ProductName);
    await homePage.ClickOnSearchButton();  // Click on search button

    const searchResultsPage = new SearchResultsPage(page);

    // Validate Sarch Results Page
    expect(await searchResultsPage.IsSearchResultsPageExists()).toBeTruthy();

    // Validate That the Desired Product Exists in the Results
    expect(await searchResultsPage.IsProductExist(ProductName)).toBeTruthy();

    // Select Product and Set Quantity
    const productPage = await searchResultsPage.SelectProduct(ProductName);
    await productPage?.EnterQuantity(ProductQuantity);
    await productPage?.AddToCart();  // Add product to shopping cart

    await page.waitForTimeout(3000); // Wait to simulate user delay

    // Confirm Product was Added
    expect(await productPage?.IsConfirmationMessageVisible()).toBe(true);
}


// Function to Verify the Shopping Cart Details

async function VerifyShoppingCart(page: Page) {
    const productPage = new ProductPage(page);

    // Navigate to Shopping Cart from Product Page
    await productPage.ClickItemsToNavigateToCart();
    const shoppingCartPage: ShoppingCartPage = await productPage.ClickViewCart();

    console.log("🛒 Navigated to shopping cart!");

    const config = new TestConfig();

    // Validate that Total Price is Correct (Based on Config)
    expect(await shoppingCartPage.GetTotalPrice()).toBe(config.TotalPrice);
}


// Function to Perform Checkout (Disabled for Demo Site)

async function PerformCheckout(page: Page) {
    // Checkout feature is not implemented since it's a demo site.
    // Place your checkout flow logic here if backend is available.
}
