import { test } from '@playwright/test';

import { LoginPage } from '../../../pages/LoginPage';

test.describe('Negative Login Test Cases', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);

        await loginPage.goto();
    });

    // Invalid username
    test('Invalid username + valid password', async () => {

        await loginPage.invalidLogin(
            'invalid_user',
            'secret_sauce'
        );

        await loginPage.verifyErrorMessage(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });

    // Invalid password
    test('Valid username + invalid password', async () => {

        await loginPage.invalidLogin(
            'standard_user',
            'wrong_password'
        );

        await loginPage.verifyErrorMessage(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });

    // Empty fields
    test('Empty username and password', async () => {

        await loginPage.invalidLogin('', '');

        await loginPage.verifyErrorMessage(
            'Epic sadface: Username is required'
        );
    });

    // Locked user
    test('Locked user validation', async () => {

        await loginPage.invalidLogin(
            'locked_out_user',
            'secret_sauce'
        );

        await loginPage.verifyErrorMessage(
            'Epic sadface: Sorry, this user has been locked out'
        );
    });

});