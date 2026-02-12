import { Page, Locator } from '@playwright/test';
import { ProductPage } from './ProductPage'; // Import ProductPage if needed

export class SearchResultsPage {

    private readonly page: Page;
    
    private readonly SearchPageHeader: Locator;
    private readonly SearchProducts: Locator;

    constructor(page: Page) {

        this.page = page;
        
        this.SearchPageHeader = page.locator('#content h1');
        this.SearchProducts = page.locator('h4>a');
        
    }


    async IsSearchResultsPageExists(): Promise<boolean> {
        
        try {
            const HeaderText = await this.SearchPageHeader.textContent();
            return HeaderText?.includes('Search -') ?? false;
        } catch (error) {
            return false;
        }
    }


    async IsProductExist(ProductName: string): Promise<boolean> {
        try {

            const Count = await this.SearchProducts.count();

            for (let i = 0; i < Count; i++) {

                const Product = this.SearchProducts.nth(i);
                 const Title = await Product.textContent();

                 if (Title === ProductName) {

                    return true;
                }
            }
        } catch (error) {

            console.log(`Error checking product existence: ${error}`);
        }
        return false;
    }

   
    async SelectProduct(ProductName: string): Promise<ProductPage | null> {

        try {

            const Count = await this.SearchProducts.count();

            for (let i = 0; i < Count; i++) {

                const Product = this.SearchProducts.nth(i);
                const Title = await Product.textContent();

                if (Title === ProductName) {

                    await Product.click();
                    return new ProductPage(this.page);
                }
            }

            console.log(`Product not found: ${ProductName}`);
            
        } catch (error) {

            console.log(`Error selecting product: ${error}`);
        }
        return null;
    }


    async GetProductCount(): Promise<number> {
        return await this.SearchProducts.count();
    }
}