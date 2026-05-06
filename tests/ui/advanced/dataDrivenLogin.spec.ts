import { test } from '@playwright/test';

import { LoginPage } from '../../../pages/LoginPage';

import loginData from '../../../test-data/loginData.json';

test.describe('Data Driven Login Tests', () => {

    loginData.forEach((data, index) => {

        test(
            `Login Scenario ${index + 1} - ${data.type} - ${data.username || 'empty-user'}`,

            async ({ page }) => {

                const loginPage = new LoginPage(page);

                await loginPage.goto();

                // Positive Scenario
                if (data.type === 'positive') {

                    await loginPage.login(
                        data.username,
                        data.password
                    );
                }

                // Negative Scenario
                else if (data.type === 'negative') {

                    await loginPage.invalidLogin(
                        data.username,
                        data.password
                    );

                    await loginPage.verifyErrorMessage(
                        data.error!
                    );
                }

                // Performance User
                else if (data.type === 'performance') {

                    const startTime = Date.now();

                    await loginPage.login(
                        data.username,
                        data.password
                    );

                    const endTime = Date.now();

                    console.log(
                        `Performance Login Time: ${endTime - startTime} ms`
                    );
                }

                // Problem User
                else if (data.type === 'problem') {

                    await loginPage.login(
                        data.username,
                        data.password
                    );

                    console.log(
                        'Problem user logged in successfully'
                    );
                }

                // Visual User
                else if (data.type === 'visual') {

                    await loginPage.login(
                        data.username,
                        data.password
                    );

                    await page.screenshot({
                        path: 'visual-user.png',
                        fullPage: true
                    });
                }
            }
        );
    });
});