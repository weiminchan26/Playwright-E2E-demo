import { expect, type Locator, type Page } from '@playwright/test';

export class StudioPage {
  private readonly entryWithoutProduct: Locator;
  private readonly entryListBox: Locator;
  constructor(public readonly page: Page) {
    this.entryListBox = page.getByRole('img', { name: 'plus' }).locator('svg');
    this.entryWithoutProduct = page.locator('li').filter({ hasText: 'Without productGenerate' });
  }

  async goto() {
    await this.page.goto('/studio');
  }
  async generateWithoutProductEntry() {
    await expect(this.entryListBox).toBeVisible();
    await this.entryListBox.click();
    await expect(this.entryWithoutProduct).toBeVisible();
    await this.entryWithoutProduct.click();

    await this.page.waitForURL('/studio/freestyle');
  };
}