import { test as base, type Page } from '@playwright/test';

class RegularUserPage {
  page: Page;
  // greeting: Locator;

  constructor(page: Page) {
    this.page = page;
    // this.greeting = page.locator('#greeting');
  }
}

class NewUserPage {
  // Page signed in as "user".
  page: Page;
  // greeting: Locator;

  constructor(page: Page) {
    this.page = page;
    // this.greeting = page.locator('#greeting');
  }
}

type MyFixtures = {
  regularUserPage: RegularUserPage;
  newUserPage: NewUserPage;
};

export * from '@playwright/test';

export const test = base.extend<MyFixtures>({
  regularUserPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'playwright/.auth/regularUser.json' });

    const page = new RegularUserPage(await context.newPage());
    await use(page);
    await context.close();
  },
  newUserPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'playwright/.auth/newUser.json' });

    const page = new NewUserPage(await context.newPage());
    await use(page);
    await context.close();
  },
});