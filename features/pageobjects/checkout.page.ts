import { $ } from '@wdio/globals'
import Page from './page';

class CheckoutPage {
    //selectors
    protected get checkoutPageTitle () {
        return $('//*[text()="Checkout: Your Information"]');
    }

    protected get firstNameInput () {
        return $('#first-name');
    }

    protected get lastNameInput () {
        return $('#last-name');
    }

    protected get postalCodeInput () {
        return $('#postal-code');
    }

    protected get continue () {
        return $('#continue');
    }

    protected get cancel () {
        return $('#cancel');
    }

    protected get firstNameError () {
        return $('//*[text()="Error: First Name is required"]');
    }

    protected get lastNameError () {
        return $('//*[text()="Error: Last Name is required"]');
    }

    protected get postalCodeError () {
        return $('//*[text()="Error: Postal Code is required"]');
    }

    
    //methods
    public async verifyInputFields (firstName: string = "TestFirstName", 
    lastName: string = "TestLastName",
    postalCode: string = "TestPostalCode",) {
        await this.continue.click();
        await expect(this.firstNameError).toBeDisplayed();
        await this.firstNameInput.setValue(firstName);
        await this.continue.click();
        await expect(this.lastNameInput).toBeDisplayed();
        await this.lastNameInput.setValue(lastName);
        await this.continue.click();
        await expect(this.postalCodeError).toBeDisplayed();
        await this.postalCodeInput.setValue(postalCode);
        await this.continue.click();
    }
}

export default new CheckoutPage();
