import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { InternalViewArticlePage } from '../../pages/article/view/InternalViewArticlePage';
import { decorateWithUserId } from '../../../common/helpers/pw';
import { test } from '@playwright/test';

export async function createArticle(page, article, userId = 0) {
  const step = decorateWithUserId(test.step, userId);

  article['url'] = await step(
    `Create an article`,
    async () => {
      const createArticlePage = new CreateArticlePage(page, userId);
      const viewArticlePage = new InternalViewArticlePage(page, userId);

      await createArticlePage.open();
      await createArticlePage.submitCreateArticleForm(article);
      await viewArticlePage.articleHeader.assertTitleIsVisible(article.title);

      return viewArticlePage.getCurrentPageUrl();
    },
    userId,
  );

  return article;
}
