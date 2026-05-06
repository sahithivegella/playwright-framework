import { expect, Page } from '@playwright/test';

export class LoginPage {

  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  usernameInput = '#user-name';
  passwordInput = '#password';
  loginButton = '#login-button';
  errorMessage = '[data-test="error"]';

  // Navigate
  async goto() {
    await this.page.goto('/');
  }

  // Positive Login
  async login(username: string, password: string) {

    await this.page.waitForSelector(this.usernameInput);

    await this.page.fill(this.usernameInput, username);

    await this.page.fill(this.passwordInput, password);

    await this.page.click(this.loginButton);

    // Wait only for successful login
    await this.page.waitForURL(
      '**/inventory.html',
      { timeout: 10000 }
    );
  }

  // Negative Login
  async invalidLogin(username: string, password: string) {

    await this.page.waitForSelector(this.usernameInput);

    await this.page.fill(this.usernameInput, username);

    await this.page.fill(this.passwordInput, password);

    await this.page.click(this.loginButton);
  }

  // Error Validation
  async verifyErrorMessage(expectedMessage: string) {

    await expect(
      this.page.locator(this.errorMessage)
    ).toContainText(expectedMessage);
  }
}