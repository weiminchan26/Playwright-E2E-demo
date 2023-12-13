import { expect } from '@playwright/test';
import { test } from '../playwright/fixtures';
import { FreestylePage } from '../pages/freestyle';
import { StudioPage } from '../pages/studio';
import { GlobalModal } from '../pages/globalModal';

// test.beforeAll('close global modal', async ({ regularUserPage, newUserPage }) => {
//   await regularUserPage.page.goto('/');
// 	const globalModalForSubscribed = new GlobalModal(regularUserPage.page);
// 	await globalModalForSubscribed.close();

// 	await newUserPage.page.goto('/');
// 	const globalModalForNotSubscribed = new GlobalModal(newUserPage.page);
// 	await globalModalForNotSubscribed.close();
// });

test('go to Image generator page', async ({ regularUserPage }) => {
	/** regularUserPage */
	const { page } = regularUserPage;
	await regularUserPage.page.goto('/home');

	const globalModalForSubscribed = new GlobalModal(page);
	await globalModalForSubscribed.close();

	await page.locator('a[href="/studio"]:has-text("Image generator")').click();

	await page.waitForURL('/studio');

	expect(page).toHaveURL('studio');
});

test('go to freestyle generator page', async ({ regularUserPage, newUserPage }) => {
	/** regularUserPage */
	const { page } = regularUserPage;
	const studioPage = new StudioPage(page);

  await studioPage.goto();

	await studioPage.generateWithoutProductEntry();

	expect(page).toHaveURL('/studio/freestyle');
});

test('Image generator', async ({ regularUserPage, newUserPage }) => {
	/** regularUserPage */
	const freestylePage = new FreestylePage(regularUserPage.page)

  await freestylePage.goto();
  await freestylePage.generate();

  await expect(regularUserPage.page.locator('._img_1sbdi_30')).toHaveCount(4);

	/** newUserPage */
	// 。。。
});
