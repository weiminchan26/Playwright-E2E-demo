import { expect, type Page, type Locator } from '@playwright/test';

export class HomePage {
  private readonly generatorEntry: Locator;
  constructor(public readonly page: Page) {
    this.generatorEntry = page.getByRole('menuitem', { name: 'Image generator' })
  }
  async goto() {
    await this.page.goto('/home');
  }

  async gotoImageGenerator() {
    await expect(this.generatorEntry).toBeVisible();
    await this.generatorEntry.click();
  };
}