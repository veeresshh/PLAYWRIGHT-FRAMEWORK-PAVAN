import { test as base, expect, Page } from '@playwright/test';
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

type E2ESeedFixture = {
  e2eFlowPage: Page;
};

export const e2eSeedTest = base.extend<E2ESeedFixture>({
  e2eFlowPage: async ({ page }, use) => {

    const config = new TestConfig();

    await page.goto(config.ApplicationUrl);

    // 🔹 STEP 1: Registration
    const homePage = new HomePage(page);
    await homePage.ClickMyAccountLink();
    await homePage.ClickRegisterLink();

    const registrationPage = new RegistrationPage(page);

    await registrationPage.EnterFirstName(RandomDataUtility.GetFirstName());
    await registrationPage.EnterLastName(RandomDataUtility.GetlastName());

    const email = RandomDataUtility.GetEmail();
    await registrationPage.EnterEmail(email);
    await registrationPage.EnterTelephone(RandomDataUtility.GetPhoneNumber());
    await registrationPage.EnterPassword("test123");
    await registrationPage.EnterConfirmPassword("test123");
    await registrationPage.EnterPrivacyPolicy();
    await registrationPage.ClickContinue();

    const confirmationMsg = await registrationPage.GetConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!');

    // 🔹 STEP 2: Logout
    const myAccountPage = new MyAccountPage(page);
    const logoutPage: LogoutPage = await myAccountPage.ClickLogout();
    expect(await logoutPage.IsContinueButtonVisible()).toBe(true);
    await logoutPage.ClickContinue();

    // 🔹 STEP 3: Login
    await page.goto(config.ApplicationUrl);
    await homePage.ClickMyAccountLink();
    await homePage.ClickOnLogin();

    const loginPage = new LoginPage(page);
    await loginPage.Login(email, "test123");

    expect(await myAccountPage.IsMyAccountPageExists()).toBeTruthy();

    // 🔹 STEP 4: Add Product to Cart
    await homePage.EnterProductName(config.ProductName);
    await homePage.ClickOnSearchButton();

    const searchResultsPage = new SearchResultsPage(page);
    expect(await searchResultsPage.IsSearchResultsPageExists()).toBeTruthy();
    expect(await searchResultsPage.IsProductExist(config.ProductName)).toBeTruthy();

    const productPage = await searchResultsPage.SelectProduct(config.ProductName);
    await productPage?.EnterQuantity(config.ProductQuantity);
    await productPage?.AddToCart();

    expect(await productPage?.IsConfirmationMessageVisible()).toBe(true);

    // 🔹 STEP 5: Verify Cart
    await productPage?.ClickItemsToNavigateToCart();
    const shoppingCartPage: ShoppingCartPage = await productPage!.ClickViewCart();

    expect(await shoppingCartPage.GetTotalPrice()).toBe(config.TotalPrice);

    // Pass final state page to test
    await use(page);
  }
});

export { expect };
