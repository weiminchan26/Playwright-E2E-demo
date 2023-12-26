import { type Page } from '@playwright/test';

export class StudioPhotoPage {
  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto('/studio/photo');
  }
}