import {
  fakerFirstName,
  fakerLastName,
  fakerZipCode,
} from "../../support/fakerData";
import CheckoutOverviewPage from "../../support/pageObjects/checkoutOverview.page";
import HeaderComponentPage from "../../support/pageObjects/headerComponent.page";
const productsToAdd = ["Sauce Labs Bike Light", "Sauce Labs Fleece Jacket"];
describe("Checkout Step One - Single Item Cart", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.startCheckoutWithSingleProduct("Sauce Labs Backpack");
    cy.fillCheckoutFormAndContinue(fakerFirstName, fakerLastName, fakerZipCode);
  });

  it("[CKO-OV-001] should display the correct product name", () => {
    CheckoutOverviewPage.verifyProductName("Sauce Labs Backpack");
  });

  it("[CKO-OV-002] should display the correct product price", () => {
    CheckoutOverviewPage.verifyProductPrice("$29.99");
  });

  it("[CKO-OV-003] should display the correct product quantity", () => {
    CheckoutOverviewPage.verifyQuantity("1");
  });

  it("[CKO-OV-004] should display correct payment information", () => {
    CheckoutOverviewPage.verifyPaymentInfo("SauceCard #31337");
  });

  it("[CKO-OV-005] should display correct shipping method", () => {
    CheckoutOverviewPage.verifyShippingMethod("Free Pony Express Delivery!");
  });

  it("[CKO-OV-006] should display correct item total", () => {
    CheckoutOverviewPage.verifyItemTotal("$29.99");
  });

  it("[CKO-OV-007] should display correct tax amount", () => {
    CheckoutOverviewPage.verifyTax("$2.40");
  });

  it("[CKO-OV-008] should display correct final total", () => {
    CheckoutOverviewPage.verifyTotal("$32.39");
  });

  it("[CKO-OV-009] should display the Cancel button", () => {
    CheckoutOverviewPage.verifyCancelButtonVisible();
  });

  it("[CKO-OV-010] should display the Finish button and it is enabled", () => {
    CheckoutOverviewPage.verifyFinishButtonIsVisible();
  });

  it("[CKO-OV-011] should display the correct style for the Finish button", () => {
    CheckoutOverviewPage.assertFinishButtonColor();
  });

  it("[CKO-OV-012] should navigate back to the cart when Cancel is clicked", () => {
    CheckoutOverviewPage.clickCancelButton();
    cy.url().should("include", "/inventory.html");
  });

  it("[CKO-OV-013] should calculate and match displayed total accurately", () => {
    CheckoutOverviewPage.assertTotalMatchesDisplaydTotal("$32.39");
  });
});


describe("Checkout Overview - Multiple Item Cart", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.startCheckoutWithMultipleProducts(productsToAdd);
    cy.fillCheckoutFormAndContinue(fakerFirstName, fakerLastName, fakerZipCode);
  });

  it("[CKO-MULTI-001] should display the first product name and details", () => {
    CheckoutOverviewPage.verifyProductName("Sauce Labs Bike Light");
    CheckoutOverviewPage.verifyProductPrice("$9.99");
    CheckoutOverviewPage.verifyQuantity("1");
  });

  it("[CKO-MULTI-002] should display the second product name and details", () => {
    CheckoutOverviewPage.verifyProductName("Sauce Labs Fleece Jacket");
    CheckoutOverviewPage.verifyProductPrice("$49.99");
    CheckoutOverviewPage.verifyQuantity("1");
  });

  it("[CKO-MULTI-003] should display correct payment information", () => {
    CheckoutOverviewPage.verifyPaymentInfo("SauceCard #31337");
  });

  it("[CKO-MULTI-004] should display correct shipping information", () => {
    CheckoutOverviewPage.verifyShippingMethod("Free Pony Express Delivery!");
  });

  it("[CKO-MULTI-005] should display correct item total for multiple products", () => {
    CheckoutOverviewPage.verifyItemTotal("$59.98");
  });

  it("[CKO-MULTI-006] should display correct tax for multiple products", () => {
    CheckoutOverviewPage.verifyTax("$4.80");
  });

  it("[CKO-MULTI-007] should display correct total for multiple products", () => {
    CheckoutOverviewPage.verifyTotal("$64.78");
  });

  it("[CKO-MULTI-008] should match calculated total with displayed total", () => {
    CheckoutOverviewPage.assertTotalMatchesDisplaydTotal("$64.78");
  });

  it("[CKO-MULTI-009] should show correct cart item count in header", () => {
    HeaderComponentPage.verifyCartItemCount(productsToAdd.length);
    CheckoutOverviewPage.verifyFinishButtonIsClickable()
    CheckoutOverviewPage.clickFinishButton();
    cy.url().should('include','checkout-complete.html')

  });

});
