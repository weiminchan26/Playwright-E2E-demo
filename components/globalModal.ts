import type { Page } from '@playwright/test';

export class GlobalModal {
  constructor(public readonly page: Page) {}


  async close() {
    const targetModal = await this.page.getByLabel('Close', { exact: true });
    if (targetModal) targetModal.click();
  }
}