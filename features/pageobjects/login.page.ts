import { $ } from '@wdio/globals'
import Page from './page';

class LoginPage extends Page {
    //selectors
    public get inputUsername () {
        return $('#user-name');
    }

    public get inputPassword () {
        return $('#password');
    }

    public get loginButton () {
        return $('#login-button');
    }

    public get lockedOutError () {
        return $('//*[text()="Epic sadface: Sorry, this user has been locked out."]');
    }

    
    //methods
    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.loginButton.click();
    }

    public async verifyLockedOutUserError() {
        await expect(this.lockedOutError).toBeDisplayed();
    }

    public open () {
        return super.open();
    }
}

export default new LoginPage();
