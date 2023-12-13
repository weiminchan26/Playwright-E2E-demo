//登录页
import { Page } from '../playwright/fixtures';

export async function useLoginPage(props: {page: Page, url: string, authFile: string}) {
  const { page, url = 'https://platform.workmagic.io', authFile } = props;
  async function fetchData() {
    await page.goto(url);
  }
  await fetchData();

  const inputEmail = async (account: string) => {
    await page.getByLabel('email_address').fill(account);
  }

  const inputCode = async (codeArr: string[]) => {
    // 获取所有的 input 元素，并填入内容 "1"
    await page.getByLabel('code1').first().fill(codeArr[0]);
    await page.getByLabel('code2').first().fill(codeArr[1]);
    await page.getByLabel('code3').first().fill(codeArr[2]);
    await page.getByLabel('code4').first().fill(codeArr[3]);
    await page.getByLabel('code5').first().fill(codeArr[4]);
    await page.getByLabel('code5').first().fill(codeArr[5]);
  }

  const onLogin = async (account: string) => {
    await inputEmail(account);
    // 选择并点击 type="submit" 的 button 元素
    await page.click('button[type="submit"]');
    await inputCode(['1', '1', '1', '1', '1', '1']);
    await page.getByRole('button', { name: /Continue/i }).click();

    await page.context().storageState({ path: authFile });
  }

  return {
    onLogin,
  };
}