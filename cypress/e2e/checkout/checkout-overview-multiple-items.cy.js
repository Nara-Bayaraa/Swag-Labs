import CheckoutOverviewPage from "../../support/page-objects/checkout-overview.page";
import HeaderComponentPage from "../../support/page-objects/header-component.page";
import {
  firstName,
  lastName,
  zipCode,
} from "../../support/helpers/generate-user-data";

const productsToAdd = ["Sauce Labs Bike Light", "Sauce Labs Fleece Jacket"];

describe("Checkout Overview: Multiple Item Cart", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.startCheckoutWithMultipleProducts(productsToAdd);
    cy.fillCheckoutFormAndContinue(firstName, lastName, zipCode);
  });

  it("[CKO-MULTI-001] Should display the first product name and details", () => {
    CheckoutOverviewPage.verifyProductName("Sauce Labs Bike Light");
    CheckoutOverviewPage.verifyProductPrice("$9.99");
    CheckoutOverviewPage.verifyQuantity("1");
  });

  it("[CKO-MULTI-002] Should display the second product name and details", () => {
    CheckoutOverviewPage.verifyProductName("Sauce Labs Fleece Jacket");
    CheckoutOverviewPage.verifyProductPrice("$49.99");
    CheckoutOverviewPage.verifyQuantity("1");
  });

  it("[CKO-MULTI-003] Should display correct payment information", () => {
    CheckoutOverviewPage.verifyPaymentInfo("SauceCard #31337");
  });

  it("[CKO-MULTI-004] Should display correct shipping information", () => {
    CheckoutOverviewPage.verifyShippingMethod("Free Pony Express Delivery!");
  });

  it("[CKO-MULTI-005] Should display correct item total for multiple products", () => {
    CheckoutOverviewPage.verifyItemTotal("$59.98");
  });

  it("[CKO-MULTI-006] Should display correct tax for multiple products", () => {
    CheckoutOverviewPage.verifyTax("$4.80");
  });

  it("[CKO-MULTI-007] Should display correct total for multiple products", () => {
    CheckoutOverviewPage.verifyTotal("$64.78");
  });

  it("[CKO-MULTI-008] Should match calculated total with displayed total", () => {
    CheckoutOverviewPage.assertTotalMatchesDisplaydTotal("$64.78");
  });

  it("[CKO-MULTI-009] Should show correct cart item count in header", () => {
    HeaderComponentPage.verifyCartItemCount(productsToAdd.length);
    CheckoutOverviewPage.verifyFinishButtonIsClickable()
    CheckoutOverviewPage.clickFinishButton();
    cy.url().should('include','checkout-complete.html')
  });

});
