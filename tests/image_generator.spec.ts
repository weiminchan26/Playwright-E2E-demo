import { expect } from '@playwright/test';
import { test } from '../playwright/fixtures';
import { HomePage } from '../pages/home-page';
import { FreestylePage } from '../pages/freestyle-page';
import { StudioPage } from '../pages/studio-page';

test('go to Image generator page', async ({ subscribed }) => {
  const { page } = subscribed;
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.gotoImageGenerator();

  await expect(homePage.page).toHaveURL('/studio');
});

test('go to freestyle generator page', async ({ subscribed, unsubscribed }) => {
  /** subscribed */
  const { page } = subscribed;
  const studioPage = new StudioPage(page);
  await studioPage.goto();

  await studioPage.generateWithoutProductEntry();

  expect(studioPage.page).toHaveURL('/studio/freestyle');
});

test('Image generator', async ({ subscribed, unsubscribed }) => {
  /** subscribed */
  const freestylePage = new FreestylePage(subscribed.page)

  await freestylePage.goto();
  await freestylePage.generate();

  await expect(freestylePage.generatingBtn).toHaveText('Generating...');

  /** unsubscribed */
  const freestylePageForUnsubscribed = new FreestylePage(unsubscribed.page);

  await freestylePageForUnsubscribed.goto();
  await freestylePageForUnsubscribed.generate();

  await expect(freestylePageForUnsubscribed.generatingBtn).toHaveText('Generating...');
});
