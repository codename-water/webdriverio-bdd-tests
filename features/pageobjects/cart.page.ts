import { $ } from '@wdio/globals';
import HomePage from './home.page';

class CartPage {
    //selectors
    protected get yourCartTitle () {
        return $('//*[text()="Your Cart"]');
    }

    protected get continueShopping () {
        return $('#continue-shopping');
    }

    protected get checkout () {
        return $('#checkout');
    }

    protected get loginButton () {
        return $('#login-button');
    }

    protected get cartItems () {
        return $$('.cart_item');
    }
    
    
    //methods
    public async getItemsInCart() {
        await HomePage.navigateToCart();
        const cartItems = await this.cartItems;
        const itemList: CartItem[] = [];

        for (const item of cartItems) {
            const itemName = await item.$('.inventory_item_name').getText();
            const itemDescription = await item.$('.inventory_item_desc').getText();
            const itemPrice = await item.$('.inventory_item_price').getText();

            itemList.push({ name: itemName, description: itemDescription, price: itemPrice });
        }

        return itemList;
    }

    public async verifyItemsInCart(expectedItems) {
        console.log("Expected Items: ");
        for (let i = 0; i < expectedItems.length; i++) {
            console.log("Name: ", expectedItems[i].name);
            console.log("Description: ", expectedItems[i].description);
            console.log("Price: ", expectedItems[i].price);
        }

        const actualItems: CartItem[] = await this.getItemsInCart();
        console.log("Actual Items: ");
        for (let i = 0; i < actualItems.length; i++) {
            console.log("Name: ", actualItems[i].name);
            console.log("Description: ", actualItems[i].description);
            console.log("Price: ", actualItems[i].price);
        }

        // Compare the actual and expected items
        if (actualItems.length !== expectedItems.length) {
            throw new Error('Number of items in the cart does not match the expected number');
        }

        for (let i = 0; i < actualItems.length; i++) {
            if (actualItems[i].name !== expectedItems[i].name ||
                actualItems[i].description !== expectedItems[i].description ||
                actualItems[i].price !== expectedItems[i].price) {
                throw new Error('Item details in the cart do not match the expected details');
            }
        }

        console.log('All items in the cart match the expected items');
    }

    public async navigateToCheckoutPage() {
        await HomePage.navigateToCart();
        await this.checkout.click();
    }

    public async navigateToContinueShopping() {
        await expect(this.continueShopping).toBeClickable();
        await this.continueShopping.click();
    }
    
}
export interface CartItem {
    name: string;
    description: string;
    price: string;
}

export default new CartPage();
