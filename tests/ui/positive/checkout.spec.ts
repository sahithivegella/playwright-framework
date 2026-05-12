import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { ProductPage } from '../../../pages/ProductPage';
import { CheckoutPage } from '../../../pages/CheckoutPage';

test('Complete checkout with valid data', async ({ page }) => {
  const login = new LoginPage(page);
  const product = new ProductPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await product.addProduct('Sauce Labs Backpack');
  await product.openCart();

  await checkout.startCheckout();
  await checkout.fillDetails('Sahithi', 'Vegella', '500001');

  await checkout.verifyOrderSummaryVisible();
  await checkout.verifyPriceCalculation();

  await checkout.finishOrder();
  await checkout.verifyConfirmation();
});