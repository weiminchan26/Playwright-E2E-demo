import { type Locator, type Page, type APIRequestContext, expect, request } from '@playwright/test';

export class GlobalModal {
  public readonly modalWrap: Locator;
  // public readonly modalWrap: Locator;
  constructor(public readonly page: Page, public readonly request: APIRequestContext) {
    this.modalWrap = page.locator('.ant-modal-wrap').locator('visible=true');
  }


  async closeAll() {
    await this.page.goto('/');
    const token = await this.page.evaluateHandle(() => window.localStorage.getItem('user_token'));
    const closeFestiveOfferClickType = await this.request.post('/api/user/updateAppNotification', {
      data: {
        festiveOfferClickType:  "close",
        showCategory: "festiveOffer"
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    await expect(closeFestiveOfferClickType.ok()).toBeTruthy();
    const closeNPSSurvey = await this.request.post('/api/survey/remindMeLater', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    await expect(closeNPSSurvey.ok()).toBeTruthy();
  
    const dialogType = ['completion', 'deadlineMissed', 'copilotFinished', 'generateProductImagesFinished', 'createCampaignFinished', 'onboardingPaywall']
    for(const type of dialogType) {
      const closeDialog = await this.request.post('/api/noviceTask/changeDialogClickStatus', {
        data: {
          dialogType: type,
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      await expect(closeDialog.ok()).toBeTruthy();
    }
  }
}