import { expect } from '@playwright/test';
import { test } from '../playwright/fixtures';
import { useStudioPage } from '../pages/useStudio';
import { useFreestylePage } from '../pages/useFreestyle';
import { useGlobalModal } from '../pages/useGlobalModal';

test('Image generator', async ({ regularUserPage, newUserPage }) => {
	/** regularUserPage */
	const { close } = await useGlobalModal({ page: regularUserPage.page });
	const { generateWithoutProductEntry } = await useStudioPage({ page: regularUserPage.page });
	const { generate } = await useFreestylePage({ page: regularUserPage.page });
  await regularUserPage.page.goto('https://platform-testing.workmagic.io/home');

  await close();

	await regularUserPage.page.locator('a[href="/studio"]:has-text("Image generator")').click();

	await generateWithoutProductEntry();

  await generate();

  await expect(regularUserPage.page.locator('._img_1sbdi_30')).toHaveCount(4);

	/** newUserPage */
  // 。。。
});
