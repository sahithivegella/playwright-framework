import { expect, Page } from '@playwright/test';

export class SearchPage {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    sortDropdown = '.product_sort_container';

    inventoryItems = '.inventory_item';

    inventoryNames = '.inventory_item_name';

    inventoryPrices = '.inventory_item_price';

    // Sort Products
    async sortProducts(option: string) {

        await this.page.selectOption(
            this.sortDropdown,
            option
        );
    }

    // Verify Products Visible
    async verifyProductsDisplayed() {

        await expect(
            this.page.locator(this.inventoryItems)
        ).toHaveCount(6);
    }

    // Verify Product Exists
    async verifyProductName(productName: string) {

        await expect(
            this.page.locator(this.inventoryNames)
        ).toContainText(productName);
    }

    // Get Product Prices
    async getAllPrices() {

        const prices = await this.page.locator(
            this.inventoryPrices
        ).allTextContents();

        return prices.map(price =>
            parseFloat(price.replace('$', ''))
        );
    }
}