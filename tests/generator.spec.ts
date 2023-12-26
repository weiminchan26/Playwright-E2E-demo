import { expect, test as base } from '@playwright/test';
import { StudioPage } from '../pages/studio-page';
import { StudioPhotoPage } from '../pages/studio-photo-page';
import { GlobalModal } from '../pages/components/globalModal';

export const test = base.extend<{ studioPage: StudioPage, studioPhotoPage: StudioPhotoPage }>({
  studioPage: async ({ page, request }, use) => {
    const globalModal = new GlobalModal(page, request);
    await globalModal.closeAll();
    const studioPage = new StudioPage(page);
    await studioPage.goto();

    await use(studioPage);
  },
  studioPhotoPage: async ({ page, request }, use) => {
    const globalModal = new GlobalModal(page, request);
    await globalModal.closeAll();
    const studioPhotoPage = new StudioPhotoPage(page);
    await studioPhotoPage.goto();

    await use(studioPhotoPage);
  }
});

test('AI生成图片(without product)', async ({ studioPage }) => {
  const freestylePage = await studioPage.generateWithoutProductEntry();
  await expect(freestylePage.page).toHaveURL('/studio/freestyle');
  await freestylePage.generate();
  await expect(freestylePage.generatingBtn).toHaveText('Generating...');
});

test('test', async ({ studioPhotoPage }) => {
  expect(studioPhotoPage.page).toHaveURL('/studio/photo');
})

// test.describe('studio', () => {
//   let studioPage;
//   test.beforeEach(async ({ page, request }) => {
//     const globalModal = new GlobalModal(page, request);
//     await globalModal.closeAll();
//     const studioPage = new StudioPage(page);
//     await studioPage.goto();
//   });
//   test('//...', async ({ }) => {
//     const freestylePage = await studioPage?.generateWithoutProductEntry();
//     expect(freestylePage?.page)?.toHaveURL('/studio/freestyle');
//     await freestylePage?.generate();
//     await expect(freestylePage?.generatingBtn)?.toHaveText('Generating...');
//   });
// })

// test.describe('studioPhoto', () => {
//   let studioPhotoPage;
//   test.beforeEach(async ({ page, request }) => {
//     const globalModal = new GlobalModal(page, request);
//     await globalModal.closeAll();
//     studioPhotoPage = new StudioPhotoPage(page);
//     await studioPhotoPage.goto();
//   });
//   test('//...', () => {
//     expect(studioPhotoPage.page).toHaveURL('/studio/photo');
//   });
// })

