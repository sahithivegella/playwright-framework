import { Page } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  async addFirstProduct() {
    await this.page.click('.inventory_item:first-child button');
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }
}