import type { Locator, Page } from '@playwright/test';

export class GlobalModal {
  public readonly modalWrap: Locator;
  // public readonly modalWrap: Locator;
  constructor(public readonly page: Page) {
    this.modalWrap = page.locator('.ant-modal-wrap');
  }


  async close() {
    this.page.on('dialog', async dialog => {
      console.log('12345:', dialog.message());
      await dialog.dismiss();
    });
    await this.modalWrap.waitFor();
    const isVisible = async () => {
      if (await this.modalWrap.count() === 1) {
        return this.modalWrap.isVisible()
      } else {
        return this.modalWrap.first().isVisible();
      }
    }
    while(await isVisible()) {
      // console.log('this.modal: ', this.modal);
      const closeBox = this.page.getByRole('button', { name: 'Close', exact: true });
      await closeBox.locator('visible=true').click();
      // console.log('11111:', await isVisible());
    }
  }
}