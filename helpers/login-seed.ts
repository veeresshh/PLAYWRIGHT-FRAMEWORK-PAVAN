import { test as base, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';

type LoginSeedFixture = {
  loggedInPage: Page;
};

export const loginSeedTest = base.extend<LoginSeedFixture>({
  loggedInPage: async ({ page }, use) => {

    const config = new TestConfig();
    await page.goto(config.ApplicationUrl);

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const myAccountPage = new MyAccountPage(page);

    await homePage.ClickMyAccountLink();
    await homePage.ClickOnLogin();
    await loginPage.EnterEmail(config.Email);
    await loginPage.EnterPassword(config.Password);
    await loginPage.ClickOnLogin();

    await myAccountPage.IsMyAccountPageExists();

    await use(page);
  }
});

export { expect };