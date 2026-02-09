/**
 * Test Case: Add Product to Cart
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1. Navigate to application URL
 * 2. Enter an existing product name in the search box
 * 3. Click the search button
 * 4. Verify the product appears in the search results
 * 5. Select the product
 * 6. Set quantity
 * 7. Add the product to the cart
 * 8. Verify the success message
 */

import { test, expect } from '@playwright/test';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';

let config: TestConfig;
let homePage: HomePage;
let searchResultsPage: SearchResultsPage;
let productPage: ProductPage;

test.beforeEach(async ({ page }) => {

  config = new TestConfig(); 
  await page.goto(config.ApplicationUrl); 

  homePage = new HomePage(page);
  searchResultsPage = new SearchResultsPage(page);
  productPage = new ProductPage(page);

});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('Add Product to Cart Test @master @regression', async ({ page }) => {

  // Step 2: Enter Product Name in Search Box

  await homePage.EnterProductName(config.ProductName);


  // Step 3: Click the Search Button

  await homePage.ClickOnSearchButton();


  // Step 4: Verify Search Results Page is Displayed

  expect(await searchResultsPage.IsSearchResultsPageExists()).toBeTruthy();


  // Step 5: Verify That the Product Exists in the Results

  const ProductName = config.ProductName;
  expect(await searchResultsPage.IsProductExist(ProductName)).toBeTruthy();


  // Step 6-7-8: Select product → Set quantity → Add to cart → Verify Vonfirmation

  if (await searchResultsPage.IsProductExist(ProductName)) {

    await searchResultsPage.SelectProduct(ProductName);
    await productPage.EnterQuantity(config.ProductQuantity); // Set quantity
    await productPage.AddToCart();                         // Add to cart


    // Step 8: Assert Success Message is Visible

    expect(await productPage.IsConfirmationMessageVisible()).toBeTruthy();
  }

});
