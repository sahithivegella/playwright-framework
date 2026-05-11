import { expect, Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  private cartItem = '.cart_item';

  private itemName = '.inventory_item_name';

  async verifyCartItemCount(expectedCount: number) {
    await expect(this.page.locator(this.cartItem)).toHaveCount(expectedCount);
  }

  async verifyProductInCart(productName: string) {
    const product = this.page.locator(this.cartItem).filter({ hasText: productName });
    await expect(product).toBeVisible();
  }

  async verifyProductNotInCart(productName: string) {
    const product = this.page.locator(this.cartItem).filter({ hasText: productName });
    await expect(product).toHaveCount(0);
  }

  async removeProduct(productName: string) {
    const product = this.page.locator(this.cartItem).filter({ hasText: productName });
    await product.getByRole('button', { name: /Remove/i }).click();
  }
}