import { test, expect } from '@playwright/test';

import { LoginPage } from '../../../pages/LoginPage';

import { ProductPage } from '../../../pages/ProductPage';

test('Cart Test', async ({ page }) => {

    // Login First
    const login = new LoginPage(page);

    await login.goto();

    await login.login(
        'standard_user',
        'secret_sauce'
    );

    // Product Actions
    const product = new ProductPage(page);

    await product.addFirstProduct();

    await product.goToCart();

    // Validation
    await expect(
        page.locator('.cart_item')
    ).toBeVisible();
});