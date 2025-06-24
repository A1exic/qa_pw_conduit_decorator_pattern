import { SignUpPage } from '../../pages/auth/SignUpPage';
import { InternalHomePage } from '../../pages/home/InternalHomePage';
import { decorateWithUserId } from '../../../common/helpers/pw';
import { test } from '@playwright/test';

export async function signUpUser(page, user, userId = 0) {
  const step = decorateWithUserId(test.step, userId);

  await step(
    `Sign up user`,
    async () => {
      const signUpPage = new SignUpPage(page, userId);
      const homePage = new InternalHomePage(page, userId);

      await signUpPage.open();
      await signUpPage.submitSignUpForm(user);

      await homePage.yourFeed.assertTabLinkVisible();
    },
    userId,
  );
}
