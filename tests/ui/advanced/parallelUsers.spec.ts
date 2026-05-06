import { test } from '@playwright/test';

import { LoginPage } from '../../../pages/LoginPage';

const users = [

    'standard_user',

    'problem_user',

    'performance_glitch_user'
];

users.forEach((user) => {

    test(`Parallel Login - ${user}`, async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            user,
            'secret_sauce'
        );
    });
});