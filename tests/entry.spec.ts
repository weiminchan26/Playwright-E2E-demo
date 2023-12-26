import { expect, test as base } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { GlobalModal } from '../pages/components/globalModal';

export const test = base.extend<{ homePage: HomePage }>({
  homePage: async ({ page, request }, use) => {
    const globalModal = new GlobalModal(page, request);
    await globalModal.closeAll();
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
    // ...
  }
});

test('进入图片生成页面', async ({ homePage }) => {
  await homePage.gotoImageGenerator();
  await expect(homePage.page).toHaveURL('/studio');
});

test('进入文案生成页面', async ({ homePage }) => {
  await homePage.gotoCopyGenerator();
  await expect(homePage.page).toHaveURL('/copy');
});

test('进入campaign页面', async ({ homePage }) => {
  await homePage.gotoCampaign();
  await expect(homePage.page).toHaveURL('/campaign');
});

test('进入analytics页面', async ({ homePage }) => {
  await homePage.gotoAnalytics();
  await expect(homePage.page).toHaveURL('/analytics/channel');
});

test('进入product页面', async ({ homePage }) => {
  await homePage.gotoProduct();
  await expect(homePage.page).toHaveURL('/product');
});

