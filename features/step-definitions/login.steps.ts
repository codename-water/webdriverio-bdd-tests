import { Given, When, Then } from '@wdio/cucumber-framework';

import LoginPage from '../pageobjects/login.page';
import HomePage from '../pageobjects/home.page';


Given(/^I am on the login page$/, async () => {
    await LoginPage.open();
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password);
});

Then(/^I should see a locked out user error$/, async () => {
    await LoginPage.verifyLockedOutUserError();
});

Then(/^I logout$/, async () => {
    await HomePage.logout();
});

