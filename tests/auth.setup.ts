import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authentication', async ({ page }) => {
    console.log(12243464575);
  await page.goto('https://platform-testing.workmagic.io/login?redirect=https://platform-testing.workmagic.io/home');

  await page.getByPlaceholder('Email address').fill('test_copilot_analyzer@workmagic.io');
  
  
  // 选择并点击 type="submit" 的 button 元素
  await page.click('button[type="submit"]');

  // 获取所有的 input 元素，并填入内容 "1"
  await page.locator('._input_4afev_7').first().fill('1');
  await page.locator('._input_4afev_7:nth-child(2)').first().fill('1');
  await page.locator('._input_4afev_7:nth-child(3)').first().fill('1');
  await page.locator('._input_4afev_7:nth-child(4)').first().fill('1');
  await page.locator('._input_4afev_7:nth-child(5)').first().fill('1');
  await page.locator('._input_4afev_7:nth-child(6)').first().fill('1');

   // 登录
  await page.getByRole('button', { name: /Continue/i }).click();
  // 等待页面跳转完成
  await page.waitForURL('https://platform-testing.workmagic.io/home');

  await expect(page.getByText('test_copilot_analyzer')).toBeVisible();
  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});