import { expect, Page } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  private inventoryItem(productName: string) {
    return this.page.locator('.inventory_item').filter({ hasText: productName });
  }

  private cartBadge = '.shopping_cart_badge';
  private cartLink = '.shopping_cart_link';

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
}