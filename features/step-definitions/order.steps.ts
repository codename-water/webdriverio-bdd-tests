import { Then } from '@wdio/cucumber-framework';
import HomePage from '../pageobjects/home.page';
import OverviewPage from '../pageobjects/overview.page';
import CartPage, { CartItem } from '../pageobjects/cart.page';
import CheckoutPage from '../pageobjects/checkout.page';

let cartItems: CartItem[];

Then(/^I add an item to the cart$/, async () => {
    await HomePage.navigateToHomePage();
    await HomePage.addItemToCart();
});

Then(/^I get the items in the cart$/, async () => {
    await HomePage.navigateToCart();
    cartItems = await CartPage.getItemsInCart();
});

Then(/^I verify the items in the cart$/, async () => {
    await CartPage.verifyItemsInCart(cartItems);
});

Then(/^I navigate to home page$/, async () => {
    await HomePage.navigateToHomePage();
    await HomePage.verifyHomePage();
});

Then(/^I navigate to checkout information page$/, async () => {
    await CartPage.navigateToCheckoutPage();
});

Then(/^I verify the input fields$/, async () => {
    await CheckoutPage.verifyInputFields();
});

Then(/^I navigate to overview page and verify price and place order$/, async () => {
    await OverviewPage.verifyTotal();
    await OverviewPage.placeOrder();
});
