import { test, expect } from '@playwright/test';

// test('authentication', async ({ page }) => {
//   await page.goto('https://platform-testing.workmagic.io/login?redirect=https://platform-testing.workmagic.io/home');

//   await page.getByPlaceholder('Email address').fill('test_copilot_analyzer@workmagic.io');
  
  
//   // 选择并点击 type="submit" 的 button 元素
//   await page.click('button[type="submit"]');

//   // 获取所有的 input 元素，并填入内容 "1"
//   await page.locator('._input_4afev_7').first().fill('1');
//   await page.locator('._input_4afev_7:nth-child(2)').first().fill('1');
//   await page.locator('._input_4afev_7:nth-child(3)').first().fill('1');
//   await page.locator('._input_4afev_7:nth-child(4)').first().fill('1');
//   await page.locator('._input_4afev_7:nth-child(5)').first().fill('1');
//   await page.locator('._input_4afev_7:nth-child(6)').first().fill('1');

//    // 登录
//   await page.getByRole('button', { name: /Continue/i }).click();
//   // 等待页面跳转完成
//   await page.waitForURL('https://platform-testing.workmagic.io/home');

//   await expect(page.getByText('test_copilot_analyzer')).toBeVisible();
// });

test('Image generator', async ({ page }) => {
  await page.goto('https://platform-testing.workmagic.io/home');

  // // Click the get started link.
  // await page.getByRole('link', { name: 'Get started' }).click();

  const targetModal = await page.getByLabel('Close', { exact: true });

  if (targetModal) targetModal.click();

  await page.locator('a[href="/studio"]:has-text("Image generator")').click();

  const requestPromise = page.waitForResponse('https://platform-testing.workmagic.io/api/assets?page=1&size=15&archived=false&search=&pipelineKeys=freestyleGenerator,fashionModelSceneGenerator,productSceneGenerator,petSceneGenerator');
  // await page.getByText('trigger request').click();
  const request = await requestPromise;

  // Expects page to have a heading with the name of Installation.
  // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  await page.locator('[data-mn="image_generator_generate_entry"]').click()

  await page.getByText('Without product').click();

  await page.waitForURL('https://platform-testing.workmagic.io/studio/freestyle');

  await page.getByPlaceholder('Be as much descriptive as possible to help the AI give the best results').fill('detox tea in the bottle, on a platform, in the style of commercial imagery, studio lighting, depth of field, ultra detailed');

  const fileInput =
    await page.getByRole('button', { name: 'Click to upload or drag-and-drop an image' })
      .filter({ has: page.locator('input[type="file"]')})
      .locator('input[type="file"]');

  // 定位文件选择输入框，并上传文件
  const filePath = './assets/1fb0b11f-da58-4150-9112-e032f615c6dd.png'; // 你的文件路径
  await fileInput.setInputFiles(filePath);

  await page.locator('[data-mn="generate_click"]').click();

  await expect(page.locator('._img_1sbdi_30')).toHaveCount(4);

});
