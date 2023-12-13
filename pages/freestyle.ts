import type { Page } from '@playwright/test';
import { GlobalModal } from './globalModal';

export class FreestylePage {
  constructor(public readonly page: Page) {}

  async goto() {
    const globalModal = new GlobalModal(this.page);
    await this.page.goto('/studio/freestyle');
	  await globalModal.close();
  }
  async generate() {
    await this.page.waitForURL('/studio/freestyle');
  
    await this.page.getByPlaceholder('Be as much descriptive as possible to help the AI give the best results').fill('detox tea in the bottle, on a platform, in the style of commercial imagery, studio lighting, depth of field, ultra detailed');
  
    // const fileInput =
    //   await page.getByRole('button', { name: 'Click to upload or drag-and-drop an image' })
    //     .filter({ has: page.locator('input[type="file"]')})
    //     .locator('input[type="file"]');
  
    // 定位文件选择输入框，并上传文件
    // const filePath = './assets/1fb0b11f-da58-4150-9112-e032f615c6dd.png'; // 你的文件路径
    // await fileInput.setInputFiles(filePath);
  
    await this.page.locator('[data-mn="generate_click"]').click();
  };
}