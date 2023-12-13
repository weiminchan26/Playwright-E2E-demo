//登录页
import { Page } from '../playwright/fixtures';

export async function useGlobalModal(props: {page: Page}) {
  const { page } = props;
  const close = async () => {
    const targetModal = await page.getByLabel('Close', { exact: true });
    if (targetModal) targetModal.click();
  };
  

  return {
    close,
  };
}