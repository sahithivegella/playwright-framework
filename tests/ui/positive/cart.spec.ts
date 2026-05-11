import { test, expect } from '@playwright/test';

import { LoginPage } from '../../../pages/LoginPage';
import { ProductPage } from '../../../pages/ProductPage';
import { CartPage } from '../../../pages/CartPage';

test.describe('Add to Cart Scenarios', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Add single product to cart', async () => {
    await productPage.addProduct('Sauce Labs Backpack');

    await productPage.verifyCartBadgeCount(1);

    await productPage.openCart();

    await cartPage.verifyProductInCart('Sauce Labs Backpack');
    await cartPage.verifyCartItemCount(1);
  });

  test('Add multiple products to cart', async () => {
    const products = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt'
    ];

    await productPage.addMultipleProducts(products);

    await productPage.verifyCartBadgeCount(3);

    await productPage.openCart();

    for (const product of products) {
      await cartPage.verifyProductInCart(product);
    }

    await cartPage.verifyCartItemCount(3);
  });

  test('Remove product from cart', async () => {
    await productPage.addProduct('Sauce Labs Backpack');
    await productPage.verifyCartBadgeCount(1);

    await productPage.openCart();

    await cartPage.removeProduct('Sauce Labs Backpack');
    await cartPage.verifyCartItemCount(0);

    await productPage.verifyCartBadgeCount(0);
  });

  test('Verify cart badge count', async () => {
    await productPage.addProduct('Sauce Labs Backpack');
    await productPage.addProduct('Sauce Labs Bike Light');

    await productPage.verifyCartBadgeCount(2);

    await productPage.openCart();
    await cartPage.verifyCartItemCount(2);
  });

  test('Verify duplicate product handling', async () => {
    await productPage.addProduct('Sauce Labs Backpack');

    await productPage.verifyProductButtonText('Sauce Labs Backpack', 'Remove');
    await productPage.verifyCartBadgeCount(1);

    await productPage.openCart();

    await cartPage.verifyProductInCart('Sauce Labs Backpack');
    await cartPage.verifyCartItemCount(1);
  });
});