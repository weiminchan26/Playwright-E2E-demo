import { expect } from '@playwright/test';
import { test } from '../playwright/fixtures';
import { HomePage } from '../pages/home';
import { FreestylePage } from '../pages/freestyle-page';
import { StudioPage } from '../pages/studio';

// test.beforeAll('close global modal', async ({ regularUserPage, newUserPage }) => {
//   await regularUserPage.page.goto('/');
// 	const globalModalForSubscribed = new GlobalModal(regularUserPage.page);
// 	await globalModalForSubscribed.close();

// 	await newUserPage.page.goto('/');
// 	const globalModalForNotSubscribed = new GlobalModal(newUserPage.page);
	// await globalModalForNotSubscribed.close();
// });
test.describe('Image generator', () => {
	test('go to Image generator page', async ({ regularUserPage }) => {
		const homePage = new HomePage(regularUserPage.page);
		await homePage.goto();
	
		await homePage.gotoImageGenerator();
	
		expect(regularUserPage.page).toHaveURL('studio');
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
	
		await expect(freestylePage.generatingBtn).toHaveText('Generating...');
	
		/** newUserPage */
		// 。。。
	});
})
