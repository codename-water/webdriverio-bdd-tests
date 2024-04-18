import { $ } from '@wdio/globals';

class OverviewPage {
    //selectors
    protected get overviewPageTitle () {
        return $('//*[text()="Checkout: Overview"]');
    }

    protected get itemsPrices () {
        return $$('.inventory_item_price');
    }

    protected get totalAmountBeforeTax () {
        return $('.summary_subtotal_label');
    }

    protected get totalAmountAfterTax () {
        return $('.summary_total_label');
    }

    protected get taxAmount () {
        return $('.summary_tax_label');
    }

    protected get cancel () {
        return $('#cancel');
    }

    protected get finish () {
        return $('#finish');
    }

    protected get thankYouMessage () {
        return $('//*[text()="Thank you for your order!"]');
    }

    
    //methods
    public async verifyTotal() {
        // Get the item prices
        const itemPrices = await this.itemsPrices;

        // Calculate the total item price before tax
        let totalBeforeTax = 0;
        for (const priceElement of itemPrices) {
            const priceText = await priceElement.getText();
            const price = parseFloat(priceText.replace('$', ''));
            totalBeforeTax += price;
        }

        // Get the total amount before tax and tax amount elements
        const totalBeforeTaxElement = await this.totalAmountBeforeTax;
        const taxAmountElement = await this.taxAmount;

        // Get the text content of total before tax and tax amount elements
        const totalBeforeTaxText = await totalBeforeTaxElement.getText();
        const taxAmountText = await taxAmountElement.getText();

        // Extract the numeric values from the text content
        const totalBeforeTaxValue = parseFloat(totalBeforeTaxText.replace('Item total: $', ''));
        const taxAmountValue = parseFloat(taxAmountText.replace('Tax: $', ''));

        // Calculate the expected total amount after tax
        const expectedTotalAfterTax = totalBeforeTaxValue + taxAmountValue;

        // Get the total amount after tax element
        const totalAfterTaxElement = await this.totalAmountAfterTax;

        // Get the text content of total after tax element
        const totalAfterTaxText = await totalAfterTaxElement.getText();

        // Extract the numeric value from the text content
        const totalAfterTaxValue = parseFloat(totalAfterTaxText.replace('Total: $', ''));

        // Round the expected and actual total amounts after tax to 2 decimal places
        const roundedExpectedTotal = expectedTotalAfterTax.toFixed(2);
        const roundedActualTotal = totalAfterTaxValue.toFixed(2);

        // Verify if the rounded calculated total matches the rounded expected total after tax
        if (roundedActualTotal !== roundedExpectedTotal) {
            throw new Error(`Total amount after tax does not match the expected amount. Expected: ${roundedExpectedTotal}, Actual: ${roundedActualTotal}`);
        }

        console.log('Total amount after tax matches the expected amount');
    }

    public async placeOrder (){
        await this.finish.click();
        await expect(this.thankYouMessage).toBeDisplayed();
    }
} 

export default new OverviewPage();
