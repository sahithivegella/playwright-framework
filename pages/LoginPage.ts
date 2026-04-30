import { Page } from '@playwright/test';

export class LoginPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.waitForSelector('#user-name');

    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');

    // ✅ FIX FOR CI
    await this.page.waitForURL('**/inventory.html', { timeout: 10000 });
  }
}