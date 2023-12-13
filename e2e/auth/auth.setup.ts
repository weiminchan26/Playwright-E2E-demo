import { test as setup, expect } from '@playwright/test';

import { useLoginPage } from '../../pages/useLogin'

setup('authenticate as new user', async ({ page }) => {
  const { onLogin } = await useLoginPage({
    page,
    url: 'https://platform-preview.workmagic.io/home',
    authFile: 'playwright/.auth/newUser.json'
  });
  await onLogin('e2e.notSubscribed@workmagic.io');
  expect(page).toHaveURL(/http:\/\/localhost:5174\/home/);
});

setup('authenticate as new regular user', async ({ page }) => {
  const { onLogin } = await useLoginPage({
    page,
    url: 'https://platform-preview.workmagic.io/home',
    authFile: 'playwright/.auth/RegularUser.json'
  });
  await onLogin('e2e.subscribed@workmagic.io');
  expect(page).toHaveURL(/http:\/\/localhost:5174\/home/);
});