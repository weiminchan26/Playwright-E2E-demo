//登录页
import { Page } from '../playwright/fixtures';

export async function useStudioPage(props: {page: Page}) {
  const { page } = props;
  const generateWithoutProductEntry = async () => {
    await page.waitForResponse('https://platform-testing.workmagic.io/api/assets?page=1&size=15&archived=false&search=&pipelineKeys=freestyleGenerator,fashionModelSceneGenerator,productSceneGenerator,petSceneGenerator');
    await page.locator('[data-mn="image_generator_generate_entry"]').click()
    await page.getByText('Without product').click();
  };

  return {
    generateWithoutProductEntry,
  };
}