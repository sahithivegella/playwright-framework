import { test, expect } from '@playwright/test';

import { LoginPage } from '../../../pages/LoginPage';
import { ProductPage } from '../../../pages/ProductPage';
import { CheckoutPage } from '../../../pages/CheckoutPage';

test('Checkout Flow', async ({ page }) => {

    // Login
    const login = new LoginPage(page);

    await login.goto();

    await login.login(
        'standard_user',
        'secret_sauce'
    );

    // Product Actions
    const product = new ProductPage(page);

    const checkout = new CheckoutPage(page);

    // Add Product
    await product.addProduct(
        'Sauce Labs Backpack'
    );

    // Open Cart
    await product.openCart();

    // Checkout Flow
    await checkout.startCheckout();

    await checkout.fillDetails();

    await checkout.finishOrder();

    // Validation
    await expect(
        page.locator('.complete-header')
    ).toHaveText(
        'Thank you for your order!'
    );
});