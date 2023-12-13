import type { Page } from '@playwright/test';

export enum ACCOUNTS_SUBSCRIBE {
  NOT_SUBSCRIBED = 'notSubscribed',
  SUBSCRIBED = 'subscribed'
}

export const BASE_ACCOUNTS = {
  [ACCOUNTS_SUBSCRIBE.NOT_SUBSCRIBED]: {
    eMail: 'e2e.notSubscribed@workmagic.io',
    code: ['1', '1', '1', '1', '1', '1']
  },
  [ACCOUNTS_SUBSCRIBE.SUBSCRIBED]: {
    eMail: 'e2e.subscribed@workmagic.io',
    code: ['1', '1', '1', '1', '1', '1']
  }
}

export class Login {
  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async inputEmail(account: string) {
    await this.page.getByLabel('email_address').fill(account);
  }

  async inputCode(codeArr: string[]) {
    // 获取所有的 input 元素，并填入内容 "1"
    await this.page.getByLabel('code1').first().fill(codeArr[0]);
    await this.page.getByLabel('code2').first().fill(codeArr[1]);
    await this.page.getByLabel('code3').first().fill(codeArr[2]);
    await this.page.getByLabel('code4').first().fill(codeArr[3]);
    await this.page.getByLabel('code5').first().fill(codeArr[4]);
    await this.page.getByLabel('code5').first().fill(codeArr[5]);
  }

  async onLogin(account: string, code: string[]) {
    await this.goto();
    await this.inputEmail(account);
    // 选择并点击 type="submit" 的 button 元素
    await this.page.click('button[type="submit"]');
    await this.inputCode(code);
    await this.page.getByRole('button', { name: /Continue/i }).click();
    
    // 等待页面跳转完成
    await this.page.waitForURL('home');
  }
}