import { expect, Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  private checkoutButton = '#checkout';
  private firstNameInput = '#first-name';
  private lastNameInput = '#last-name';
  private postalCodeInput = '#postal-code';
  private continueButton = '#continue';
  private finishButton = '#finish';
  private errorMessage = '[data-test="error"]';

  private subtotalLabel = '.summary_subtotal_label';
  private taxLabel = '.summary_tax_label';
  private totalLabel = '.summary_total_label';

  private completeHeader = '.complete-header';

  async startCheckout() {
    await this.page.click(this.checkoutButton);
  }

  async fillDetails(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
    await this.page.click(this.continueButton);
  }

  async finishOrder() {
    await this.page.click(this.finishButton);
  }

  async verifyConfirmation() {
    await expect(this.page.locator(this.completeHeader)).toHaveText('Thank you for your order!');
  }

  async verifyMandatoryFieldError(expectedMessage: string) {
    await expect(this.page.locator(this.errorMessage)).toContainText(expectedMessage);
  }

  async verifyOrderSummaryVisible() {
    await expect(this.page.locator(this.subtotalLabel)).toBeVisible();
    await expect(this.page.locator(this.taxLabel)).toBeVisible();
    await expect(this.page.locator(this.totalLabel)).toBeVisible();
  }

  async verifyPriceCalculation() {
    const subtotalText = await this.page.locator(this.subtotalLabel).textContent();
    const taxText = await this.page.locator(this.taxLabel).textContent();
    const totalText = await this.page.locator(this.totalLabel).textContent();

    const subtotal = parseFloat(subtotalText?.replace('Item total: $', '').trim() || '0');
    const tax = parseFloat(taxText?.replace('Tax: $', '').trim() || '0');
    const total = parseFloat(totalText?.replace('Total: $', '').trim() || '0');

    expect((subtotal + tax).toFixed(2)).toBe(total.toFixed(2));
  }
}