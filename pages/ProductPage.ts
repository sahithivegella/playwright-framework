import { expect, Page } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  private inventoryItem(productName: string) {
    return this.page.locator('.inventory_item').filter({ hasText: productName });
  }

  private cartBadge = '.shopping_cart_badge';
  private cartLink = '.shopping_cart_link';
  private sortDropdown = '.product_sort_container';
  private inventoryNames = '.inventory_item_name';
  private inventoryPrices = '.inventory_item_price';

  async addProduct(productName: string) {
    const item = this.inventoryItem(productName);
    await item.getByRole('button', { name: /Add to cart/i }).click();
  }

  async addMultipleProducts(productNames: string[]) {
    for (const productName of productNames) {
      await this.addProduct(productName);
    }
  }

  async removeProduct(productName: string) {
    const item = this.inventoryItem(productName);
    await item.getByRole('button', { name: /Remove/i }).click();
  }

  async verifyProductButtonText(productName: string, expectedText: string) {
    await expect(
      this.inventoryItem(productName).getByRole('button')
    ).toHaveText(expectedText);
  }

  async verifyCartBadgeCount(expectedCount: number) {
    const badge = this.page.locator(this.cartBadge);

    if (expectedCount === 0) {
      await expect(badge).toHaveCount(0);
      return;
    }

    await expect(badge).toHaveText(String(expectedCount));
  }

  async openCart() {
    await this.page.locator(this.cartLink).click();
  }

  async sortProducts(option: 'lohi' | 'hilo' | 'az' | 'za') {
    await this.page.selectOption(this.sortDropdown, option);
  }

  async getProductNames() {
    return await this.page.locator(this.inventoryNames).allTextContents();
  }

  async getProductPrices() {
    const prices = await this.page.locator(this.inventoryPrices).allTextContents();
    return prices.map((price) => parseFloat(price.replace('$', '')));
  }

  async verifyProductsVisible() {
    await expect(this.page.locator('.inventory_item')).toHaveCount(6);
  }
}