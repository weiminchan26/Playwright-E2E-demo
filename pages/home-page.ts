import { expect, type Page, type Locator } from '@playwright/test';
// import { GlobalModal } from './components/globalModal'

export class HomePage {
  private readonly imageGeneratorEntry: Locator;
  private readonly copyGeneratorEntry: Locator;
  private readonly copilotEntry: Locator;
  private readonly campaignEntry: Locator;
  private readonly analyticsList: Locator;
  private readonly analyticsEntry: Locator;
  private readonly productEntry: Locator;
  constructor(public readonly page: Page) {
    this.imageGeneratorEntry = page.getByRole('menuitem', { name: 'Image generator' });
    this.copilotEntry = page.getByRole('menuitem', { name: 'Marketing copilot' });
    this.copyGeneratorEntry = page.getByRole('menuitem', { name: 'Copy generator' });
    this.campaignEntry = page.getByRole('menuitem', { name: 'Marketing campaigns' });
    this.analyticsList = page.getByRole('menuitem', { name: 'fund Attribution & analytics' });
    this.analyticsEntry = page.getByRole('menuitem', { name: 'Channel attribution' });
    this.productEntry = page.getByRole('menuitem', { name: 'Product catalog' });
  }
  async goto() {
    // const globalModal = new GlobalModal(this.page)
    await this.page.goto('/home');
    // await globalModal.close();
  }

  async gotoImageGenerator() {
    await expect(this.imageGeneratorEntry).toBeVisible();
    await this.imageGeneratorEntry.click();
  };

  async gotoCopyGenerator() {
    await expect(this.copyGeneratorEntry).toBeVisible();
    await this.copyGeneratorEntry.click();
  };

  async gotoCopilot() {
    await expect(this.copilotEntry).toBeVisible();
    await this.copilotEntry.click();
  };

  async gotoCampaign() {
    await expect(this.campaignEntry).toBeVisible();
    await this.campaignEntry.click();
  };

  async gotoAnalytics() {
    await expect(this.analyticsList).toBeVisible();
    await this.analyticsList.click();
    await expect(this.analyticsEntry).toBeVisible();
    await this.analyticsEntry.click();
  };

  async gotoProduct() {
    await expect(this.productEntry).toBeVisible();
    await this.productEntry.click();
  };
}