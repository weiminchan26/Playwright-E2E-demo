import { test as base, type Page } from '@playwright/test';

class subscribed {
  page: Page;
  // greeting: Locator;

  constructor(page: Page) {
    this.page = page;
    // this.greeting = page.locator('#greeting');
  }
}

class unsubscribed {
  // Page signed in as "user".
  page: Page;
  // greeting: Locator;

  constructor(page: Page) {
    this.page = page;
    // this.greeting = page.locator('#greeting');
  }
}

type MyFixtures = {
  subscribed: subscribed;
  unsubscribed: unsubscribed;
};


export * from '@playwright/test';

export const test = base.extend<MyFixtures>({
  subscribed: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'playwright/.auth/subscribed.json', });
    const page = new subscribed(await context.newPage());
		await context.addInitScript(() => {
			window.sessionStorage.setItem('close_global_modal', '1');
		});

    await use(page);
    await context.close();
  },
  unsubscribed: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'playwright/.auth/unsubscribed.json' });

    const page = new unsubscribed(await context.newPage());
		await context.addInitScript(() => {
			window.sessionStorage.setItem('close_global_modal', '1');
		});
    await use(page);
    await context.close();
  },
});

test.describe = base.describe;