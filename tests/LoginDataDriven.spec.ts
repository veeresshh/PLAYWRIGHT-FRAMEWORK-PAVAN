import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { DataProvider } from '../utils/DataProvider';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';


//Load JSON Test Data logindata.json

const JsonPath = "testdata/LoginData.json";
const JsonTestData = DataProvider.GetTestDataFromJson(JsonPath);


for (const Data of JsonTestData) {

    test(`Login Test with JSON Data: ${Data.TestName} @datadriven`, async ({ page }) => {

        const config = new TestConfig();           // Create Instance
        await page.goto(config.ApplicationUrl);    // Getting AppURL from test.config.ts file

        const homePage = new HomePage(page);
        await homePage.ClickMyAccountLink();
        await homePage.ClickOnLogin();

        const loginPage = new LoginPage(page);
        await loginPage.Login(Data.Email, Data.Password);

        if (Data.Expected.toLowerCase() === 'success') {

            const myAccountPage = new MyAccountPage(page);
            
            const isLoggedIn = await myAccountPage.IsMyAccountPageExists();
            expect(isLoggedIn).toBeTruthy();

        }

        else {

            const errorMessage = await loginPage.GetLogInErrorMessage();
            expect(errorMessage).toContain('Warning: No match');
        }
    })

}



//Load CSV Test Data logindata.csv

const CSVPath = "testdata/LoginData.csv";
const CSVTestData = DataProvider.GetTestDataFromCSV(CSVPath);


for (const Data of CSVTestData) {

    test(`Login Test with CSV Data: ${Data.TestName} @datadriven`, async ({ page }) => {

        const config = new TestConfig();           // Create Instance
        await page.goto(config.ApplicationUrl);    // Getting AppURL from test.config.ts file

        const homePage = new HomePage(page);
        await homePage.ClickMyAccountLink();
        await homePage.ClickOnLogin();

        const loginPage = new LoginPage(page);
        await loginPage.Login(Data.Email, Data.Password);

        if (Data.Expected.toLowerCase() === 'success') {

            const myAccountPage = new MyAccountPage(page);
            const isLoggedIn = await myAccountPage.IsMyAccountPageExists();
            expect(isLoggedIn).toBeTruthy();

        }

        else {

            const ErrorMessage = await loginPage.GetLogInErrorMessage();
            expect(ErrorMessage).toContain('Warning: No match');
        }
    })

}