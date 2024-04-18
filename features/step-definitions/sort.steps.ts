import { Then } from '@wdio/cucumber-framework';
import HomePage from '../pageobjects/home.page';


Then(/^I verify the (\w+) of the items$/, async (sortOrder) => {
    await HomePage.verifySortOrder(sortOrder);
});

Then(/^I change the sort order to (\w+)$/, async (sortOrder) => {
    await HomePage.changeSortOrder(sortOrder);
    await HomePage.verifySortOrder(sortOrder);
});
