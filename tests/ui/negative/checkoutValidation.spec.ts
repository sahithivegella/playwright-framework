import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { ProductPage } from '../../../pages/ProductPage';
import { CheckoutPage } from '../../../pages/CheckoutPage';

test.describe('Checkout mandatory field validation', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    const product = new ProductPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    await product.addProduct('Sauce Labs Backpack');
    await product.openCart();
  });

  test('First name required', async ({ page }) => {
    const checkout = new CheckoutPage(page);

    await checkout.startCheckout();
    await checkout.fillDetails('', 'Vegella', '500001');

    await checkout.verifyMandatoryFieldError('Error: First Name is required');
  });

  test('Last name required', async ({ page }) => {
    const checkout = new CheckoutPage(page);

    await checkout.startCheckout();
    await checkout.fillDetails('Sahithi', '', '500001');

    await checkout.verifyMandatoryFieldError('Error: Last Name is required');
  });

  test('Postal code required', async ({ page }) => {
    const checkout = new CheckoutPage(page);

    await checkout.startCheckout();
    await checkout.fillDetails('Sahithi', 'Vegella', '');

    await checkout.verifyMandatoryFieldError('Error: Postal Code is required');
  });
});