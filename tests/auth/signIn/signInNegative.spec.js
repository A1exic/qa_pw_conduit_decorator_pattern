import { test } from '../../_fixtures/fixtures';
import {
  EMPTY_EMAIL_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
  INVALID_EMAIL_OR_PASSWORD_MESSAGE,
} from '../../../src/ui/constants/authErrorMessages';
import { UserFactory } from '../../../src/factoryItems/UserFactory';

const userFactory = new UserFactory();
const testParameters = [
  {
    message: EMPTY_PASSWORD_MESSAGE,
    title: 'empty password',
    ...userFactory.generateUser({ password: '' }),
  },
  {
    message: EMPTY_EMAIL_MESSAGE,
    title: 'empty email',
    ...userFactory.generateUser({ email: '' }),
  },
  {
    message: INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    title: 'wrong password',
    ...userFactory.generateUser({ password: '1' }),
  },
];

testParameters.forEach(({ email, password, message, title }) => {
  test.describe('Sign in negative tests', () => {
    test(`Sign in with ${title}`, async ({ signInPage }) => {
      await signInPage.open();
      await signInPage.fillEmailField(email);
      await signInPage.fillPasswordField(password);
      await signInPage.clickSignInButton();
      await signInPage.assertErrorMessageContainsText(message);
    });
  });
});
