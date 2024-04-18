import { $ } from '@wdio/globals'

class MenuPage  {
    //selectors
    protected get menuCross () {
        return $('#react-burger-cross-btn');
    }

    protected get allItems () {
        return $('#inventory_sidebar_link');
    }

    protected get about () {
        return $('#about_sidebar_link');
    }

    protected get logoutButton () {
        return $('#logout_sidebar_link');
    }

    protected get resetAppState () {
        return $('#reset_sidebar_link');
    }

    //methods
    public async logout(){
        await expect(this.logoutButton).toBeClickable();
        await this.logoutButton.click();
    }
}

export default new MenuPage();