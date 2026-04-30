import { test, expect } from '../fixtures/baseTest';
import { ProductPage } from '../pages/ProductPage';

test('Cart Test', async ({ loggedInPage }) => {
  const product = new ProductPage(loggedInPage);

  await product.addFirstProduct();
  await product.goToCart();

  await expect(loggedInPage.locator('.cart_item')).toBeVisible();
});