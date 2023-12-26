import { expect, type Locator, type Page, type Request } from '@playwright/test';
// import { GlobalModal } from './components/globalModal';

export class FreestylePage {
  private readonly promptBox: Locator;
  private readonly generateBtn: Locator;
  public readonly generatingBtn: Locator;
  constructor(public readonly page: Page, public readonly request?: Request) {
    this.promptBox = page.getByPlaceholder('Be as much descriptive as');
    this.generateBtn = page.getByRole('button', { name: 'Generate' });
    this.generatingBtn = page.getByRole('button', { name: 'loading Generating' });
  }

  async goto() {
    // const globalModal = new GlobalModal(this.page);
    await this.page.goto('/studio/freestyle');
	  // await globalModal.close();
  }
  async generate() {
    await this.promptBox.fill('detox tea in the bottle, on a platform, in the style of commercial imagery, studio lighting, depth of field, ultra detailed');
    // const fileInput =
    //   await page.getByRole('button', { name: 'Click to upload or drag-and-drop an image' })
    //     .filter({ has: page.locator('input[type="file"]')})
    //     .locator('input[type="file"]');
  
    // 定位文件选择输入框，并上传文件
    // const filePath = './assets/1fb0b11f-da58-4150-9112-e032f615c6dd.png'; // 你的文件路径
    // await fileInput.setInputFiles(filePath);
  
    await expect(this.generateBtn).toBeVisible();
    await this.generateBtn.click();
  }
}