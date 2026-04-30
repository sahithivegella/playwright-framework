import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async startCheckout() {
    await this.page.click('#checkout');
  }

  async fillDetails() {
    await this.page.fill('#first-name', 'Sahithi');
    await this.page.fill('#last-name', 'Varma');
    await this.page.fill('#postal-code', '500001');
  }

  async finishOrder() {
    await this.page.click('#continue');
    await this.page.click('#finish');
  }
}