import { test as base, type Page, type BrowserContext, expect } from '@playwright/test';
import { UserEntity } from '../types/user';

class subscribed {
  page: Page;
  context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    // this.greeting = page.locator('#greeting');
  }
}

class unsubscribed {
  // Page signed in as "user".
  page: Page;
  context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    // this.greeting = page.locator('#greeting');
  }
}

type MyFixtures = {
  subscribed: subscribed;
  unsubscribed: unsubscribed;
};

export * from '@playwright/test';

const closeAllModal = async (context: BrowserContext) => {
  const stage = await context.request.storageState({path: 'playwright/.auth/subscribed.json'});
  const user_token = stage['origins'][0].localStorage.find((ls) => ls.name === 'user_token');
  const closeFestiveOfferClickType = await context.request.post('/api/user/updateAppNotification', {
    data: {
      festiveOfferClickType:  "close",
      showCategory: "festiveOffer"
    },
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${user_token?.value}`,
    }
  });
  console.log('closeFestiveOfferClickType: ', closeFestiveOfferClickType.ok());
  expect(closeFestiveOfferClickType.ok()).toBeTruthy();
  const closeNPSSurvey = await context.request.post('/api/survey/remindMeLater', {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${user_token?.value}`,
    }
  });
  expect(closeNPSSurvey.ok()).toBeTruthy();

  const dialogType = ['completion', 'deadlineMissed', 'copilotFinished', 'generateProductImagesFinished', 'createCampaignFinished', 'onboardingPaywall']
  for(const type of dialogType) {
    const closeDialog = await context.request.post('/api/noviceTask/changeDialogClickStatus', {
      data: {
        dialogType: type,
      },
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${user_token?.value}`,
      }
    });
    expect(closeDialog.ok()).toBeTruthy();
  }

  // const page = new subscribed(await context.newPage(), context);
  // await context.addInitScript(() => {
  //   window.sessionStorage.setItem('close_global_modal', '1');
  // });
}

export const test = base.extend<MyFixtures>({
  subscribed: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'playwright/.auth/subscribed.json', });
    await closeAllModal(context);

    const page = new subscribed(await context.newPage(), context);
		// await context.addInitScript(() => {
		// 	window.sessionStorage.setItem('close_global_modal', '1');
		// });

    await use(page);
    await context.close();
  },
  unsubscribed: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'playwright/.auth/unsubscribed.json' });
    await closeAllModal(context);

    const page = new unsubscribed(await context.newPage(), context);
		// await context.addInitScript(() => {
		// 	window.sessionStorage.setItem('close_global_modal', '1');
		// });
    await use(page);
    await context.close();
  },
});

test.describe = base.describe;