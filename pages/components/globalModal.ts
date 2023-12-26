import { type Locator, type Page, type APIRequestContext, expect } from '@playwright/test';

export class GlobalModal {
  public readonly modalWrap: Locator;
  // public readonly modalWrap: Locator;
  constructor(public readonly page: Page, public readonly request: APIRequestContext) {
    this.modalWrap = page.locator('.ant-modal-wrap').locator('visible=true');
  }


  async closeAll() {
    const closeFestiveOfferClickType = await this.request.post('/api/user/updateAppNotification', {
      data: {
        festiveOfferClickType:  "close",
        showCategory: "festiveOffer"
      },
    });
    await expect(closeFestiveOfferClickType.ok()).toBeTruthy();
    const closeNPSSurvey = await this.request.post('/api/survey/remindMeLater');
    await expect(closeNPSSurvey.ok()).toBeTruthy();
  
    const dialogType = ['completion', 'deadlineMissed', 'copilotFinished', 'generateProductImagesFinished', 'createCampaignFinished', 'onboardingPaywall']
    for(const type of dialogType) {
      const closeDialog = await this.request.post('/api/noviceTask/changeDialogClickStatus', {
        data: {
          dialogType: type,
        },
      });
      await expect(closeDialog.ok()).toBeTruthy();
    }
  }
}