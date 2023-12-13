import { expect, type Locator, type Page } from '@playwright/test';
import { GlobalModal } from '../components/globalModal';

export class StudioPage {
  private readonly entryWithoutProduct: Locator;
  private readonly entryListBox: Locator;
  constructor(public readonly page: Page) {
    this.entryListBox = page.getByRole('img', { name: 'plus' }).locator('svg');
    this.entryWithoutProduct = page.locator('li').filter({ hasText: 'Without productGenerate' });
  }

  async goto() {
    const globalModal = new GlobalModal(this.page);
    await this.page.goto('/studio');
	  await globalModal.close();
  }
  async generateWithoutProductEntry() {
    await expect(this.entryListBox).toBeVisible();
    await this.entryListBox.click();
    await expect(this.entryWithoutProduct).toBeVisible();
    await this.entryWithoutProduct.click();

    await this.page.waitForURL('/studio/freestyle');
  };
}