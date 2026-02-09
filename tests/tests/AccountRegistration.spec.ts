/**
 * Test Case: Account Registration
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to application URL 
 * 2) Go to 'My Account' and click 'Register'
 * 3) Fill in registration details with random data
 * 4) Agree to Privacy Policy and submit the form
 * 5) Validate the confirmation message
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataUtility } from '../utils/RandomDataGenerator';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let registrationPage: RegistrationPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {

    config = new TestConfig();
    await page.goto(config.ApplicationUrl);
    
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);

})


test.afterEach(async ({ page }) => {

    await page.waitForTimeout(3000);
    await page.close();

})


test('User Registration Test @master @sanity @regression', async () => {

    //Go to 'My Account' and Click 'Register'

    await homePage.ClickMyAccountLink();
    await homePage.ClickRegisterLink();

    //Fill in Registration Details with Random Data

    await registrationPage.EnterFirstName(RandomDataUtility.GetFirstName());
    await registrationPage.EnterLastName(RandomDataUtility.GetlastName());
    await registrationPage.EnterEmail(RandomDataUtility.GetEmail());
    await registrationPage.EnterTelephone(RandomDataUtility.GetPhoneNumber());

    const Password = RandomDataUtility.GetPassword();

    await registrationPage.EnterPassword(Password);
    await registrationPage.EnterConfirmPassword(Password);

    await registrationPage.EnterPrivacyPolicy();
    await registrationPage.ClickContinue();

    //Validate the Confirmation Message

    const ConfirmationMessage = await registrationPage.GetConfirmationMsg();
    expect(ConfirmationMessage).toContain('Your Account Has Been Created!')


})
