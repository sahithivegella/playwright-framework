import { test, expect } from '../fixtures/baseTest';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Checkout Flow', async ({ loggedInPage }) => {
  const product = new ProductPage(loggedInPage);
  const checkout = new CheckoutPage(loggedInPage);

  await product.addFirstProduct();
  await product.goToCart();

  await checkout.startCheckout();
  await checkout.fillDetails();
  await checkout.finishOrder();

  await expect(loggedInPage.locator('.complete-header'))
    .toHaveText('Thank you for your order!');
});