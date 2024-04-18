import { $ } from '@wdio/globals';
import MenuPage from './menu.page';
import Page from './page';

class HomePage extends Page {
    //selectors
    protected get appLogo () {
        return $('.app_logo');
    }

    protected get menu () {
        return $('#react-burger-menu-btn');
    }

    protected get shoppingCart () {
        return $('#shopping_cart_container');
    }

    protected get filter () {
        return $('.select_container');
    }

    protected get itemsNames () {
        return $$('.inventory_item_name');
    }

    protected get itemsPrices () {
        return $$('.inventory_item_price');
    }

    protected get addToCartButton () {
        return $('//button[text()="Add to cart"]');
    }

    //methods
    public async navigateToHomePage() {
        await super.open("inventory.html");
        await this.verifyHomePage();
    }

    public async verifyHomePage() {
        await expect(this.appLogo).toBeDisplayed();
    }

    public async logout() {
        await this.menu.click();
        await MenuPage.logout();
    }

    public async addItemToCart() {
        await this.addToCartButton.click();
    }
    
    public async navigateToCart() {
        await this.shoppingCart.click();
    }

    public async changeSortOrder(sortOrder: "az" | "za" | "lohi" | "hilo"){
        await expect(this.filter).toBeClickable();
        await this.filter.click();
        const sortOrderLocator = $(`[value="${sortOrder}"]`);
        await sortOrderLocator.click();
    } 
    

    public async verifySortOrder(sortOrder: "az" | "za" | "lohi" | "hilo"){
        switch(sortOrder) {
            case "az":
                console.log("Verifying sorting order: Name (A to Z) default");
                await this.verifyAtoZOrder();
                break;
            case "za":
                console.log("Verifying sorting order: Name (Z to A)");
                await this.verifyZtoAOrder();
                break;
            case "lohi":
                console.log("Verifying sorting order: Price (low to high)");
                await this.verifyLowtoHighOrder();
                break;
            case "hilo":
                console.log("Verifying sorting order: Price (high to low)");
                await this.verifyHightoLowOrder();
                break;
            default:
                // Handle default order or throw an error
                throw new Error("Invalid sortOrder specified.");
        }
    }

    private async verifyAtoZOrder(){
        const itemNamesElements = await this.itemsNames;
        const itemNames = await Promise.all(await itemNamesElements.map(async item => await item.getText()));
        console.log("Fetched Names of the items ... ", itemNames);
        const sortedItemNames = itemNames.slice().sort();
        expect(itemNames).toEqual(sortedItemNames);
    }

    private async verifyZtoAOrder(){
        const itemNamesElements = await this.itemsNames;
        const itemNames = await Promise.all(await itemNamesElements.map(async item => await item.getText()));
        console.log("Fetched Names of the items ... ", itemNames);
        const sortedItemNames = itemNames.slice().sort().reverse();
        expect(itemNames).toEqual(sortedItemNames);
    }

    private async verifyLowtoHighOrder(){
        const itemPricesElements = await this.itemsPrices;
        const itemPrices = await Promise.all(await itemPricesElements.map(async item => await item.getText()));
        console.log("Fetched Prices of the items ... ", itemPrices);
        const sortedItemPrices = itemPrices.slice().sort((a, b) => parseFloat(a.replace('$', '')) - parseFloat(b.replace('$', '')));
        expect(itemPrices).toEqual(sortedItemPrices);
    }

    private async verifyHightoLowOrder(){
        const itemPricesElements = await this.itemsPrices;
        const itemPrices = await Promise.all(await itemPricesElements.map(async item => await item.getText()));
        console.log("Fetched Prices of the items ... ", itemPrices);
        const sortedItemPrices = itemPrices.slice().sort((a, b) => parseFloat(b.replace('$', '')) - parseFloat(a.replace('$', '')));
        expect(itemPrices).toEqual(sortedItemPrices);
    }
    
}

export default new HomePage();
