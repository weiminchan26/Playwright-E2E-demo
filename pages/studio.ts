import type { Page } from '@playwright/test';
import { GlobalModal } from './globalModal';

export class StudioPage {
  constructor(public readonly page: Page) {}

  async goto() {
    const globalModal = new GlobalModal(this.page);
    await this.page.goto('/studio');
	  await globalModal.close();
  }
  async generateWithoutProductEntry() {
    // await this.page.waitForResponse('https://platform-preview.workmagic.io/api/assets?page=1&size=15&archived=false&search=&pipelineKeys=freestyleGenerator,fashionModelSceneGenerator,productSceneGenerator,petSceneGenerator');
    const entry = await this.page.locator('[data-mn="image_generator_generate_entry"]');
    await entry.waitFor();
    await entry.click();
    await this.page.getByText('Without product').click();

    await this.page.waitForURL('/studio/freestyle');
  };
}