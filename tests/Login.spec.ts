/**
 * Test Case: Login with Valid Credentials
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to Login page via Home page
 * 3) Enter valid credentials and log in
 * 4) Verify successful login by checking 'My Account' page presence
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';

let Config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;

// This Hook Runs Before Each Test

test.beforeEach(async ({ page }) => {
  
  Config = new TestConfig();                    // Load config (URL, credentials)
  await page.goto(Config.ApplicationUrl);       // Navigate to base URL

  // Initialize Page Objects

  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  myAccountPage = new MyAccountPage(page);

});

// Optional Cleanup After Each Test

test.afterEach(async ({ page }) => {
  await page.close();                           // Close browser tab (good practice in local/dev run)
});


test('User Login Test @master @sanity @regression', async () => {

  //Navigate to Login Page via Home Page

  await homePage.ClickMyAccountLink();
  await homePage.ClickOnLogin();

  //Enter Valid Credentials and Log In

  await loginPage.EnterEmail(Config.Email);
  await loginPage.EnterPassword(Config.Password);
  await loginPage.ClickOnLogin();

  //alternatevly
  //await loginPage.login(config.Email,config.Password);

  //Verify Successful Login by Checking 'My Account' Page Presence

  const isLoggedIn = await myAccountPage.IsMyAccountPageExists();
  expect(isLoggedIn).toBeTruthy();

})
