import { test as setup, expect, BrowserContext } from '@playwright/test';
import { Login, BASE_ACCOUNTS, ACCOUNTS_SUBSCRIBE } from '../../authentication';

setup('do login', async ({ page, context }) => {
  const login = new Login(page);
  const account = BASE_ACCOUNTS[ACCOUNTS_SUBSCRIBE.SUBSCRIBED];
  await login.onLogin(account.eMail, account.code);
  await page.context().storageState({ path: 'playwright/.auth/subscribed.json' });
  await expect(page).toHaveURL('home');
  await expect(page.getByText('e2e.subscribed')).toBeVisible();
});