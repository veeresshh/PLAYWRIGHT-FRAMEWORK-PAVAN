/**
 * Test Case: Product Search
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Enter the product name in the search field
 * 3) Click the search button
 * 4) Verify if the product is displayed in the search results
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { TestConfig } from '../test.config';


let config: TestConfig;
let homePage: HomePage;
let searchResultsPage: SearchResultsPage;


test.beforeEach(async ({ page }) => {
  
  config = new TestConfig(); 
  await page.goto(config.ApplicationUrl); 

  // Initialize page objects

  homePage = new HomePage(page);
  searchResultsPage = new SearchResultsPage(page);
});


test.afterEach(async ({ page }) => {
  await page.close(); 
});

test('Product Search Test @master @regression', async () => {

  const ProductName = config.ProductName;

  // Step 2 & 3: Enter Product Name and Click Search

  await homePage.EnterProductName(ProductName);
  await homePage.ClickOnSearchButton();


  // Step 4: Verify That the Search Results Page is Displayed

  expect(await searchResultsPage.IsSearchResultsPageExists()).toBeTruthy();


  // Step 5: Validate if the Searched Product Appears in Results

  const IsProductFound = await searchResultsPage.IsProductExist(ProductName);
  expect(IsProductFound).toBeTruthy();
});
