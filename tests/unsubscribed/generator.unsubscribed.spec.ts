import { expect, test as base } from '@playwright/test';
import { StudioPage } from '../../pages/studio-page';
import { GlobalModal } from '../../pages/components/globalModal';

export const test = base.extend<{ studioPage: StudioPage }>({
  studioPage: async ({ page, request }, use) => {
    const globalModal = new GlobalModal(page, request);
    await globalModal.closeAll();
    const studioPage = new StudioPage(page);
    await studioPage.goto();

    await use(studioPage);
  }
});

test('未订阅，AI生成图片(without product)', async ({ studioPage }) => {
  const freestylePage = await studioPage.generateWithoutProductEntry();
  expect(freestylePage.page).toHaveURL('/studio/freestyle');
  await freestylePage.generate();
  await expect(freestylePage.generatingBtn).toHaveText('Generating...');
});

