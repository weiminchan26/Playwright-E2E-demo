import { expect, type Page, type Locator } from '@playwright/test';
import { GlobalModal } from '../components/globalModal';

export class HomePage {
  private readonly generatorEntry: Locator;
  constructor(public readonly page: Page) {
    this.generatorEntry = this.page.getByRole('link', { name: 'Image generator' })
  }
  async goto() {
    const globalModal = new GlobalModal(this.page);
    await this.page.goto('/home');
	  await globalModal.close();
  }
  async gotoImageGenerator() {
    await expect(this.generatorEntry).toBeVisible();
    await this.generatorEntry.click();
    await this.page.waitForURL('/studio');
  };
}