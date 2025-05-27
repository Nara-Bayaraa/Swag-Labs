import CheckoutOverviewPage from "../../support/page-objects/checkout-overview.page";
import {
  firstName,
  lastName,
  zipCode,
} from "../../support/helpers/generate-user-data";

describe("Checkout Step One - Single Item Cart", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.startCheckoutWithSingleProduct("Sauce Labs Backpack");
    cy.fillCheckoutFormAndContinue(firstName, lastName, zipCode);
  });

  it("[CKO-OV-001] Should display the correct product name", () => {
    CheckoutOverviewPage.verifyProductName("Sauce Labs Backpack");
  });

  it("[CKO-OV-002] Should display the correct product price", () => {
    CheckoutOverviewPage.verifyProductPrice("$29.99");
  });

  it("[CKO-OV-003] Should display the correct product quantity", () => {
    CheckoutOverviewPage.verifyQuantity("1");
  });

  it("[CKO-OV-004] Should display correct payment information", () => {
    CheckoutOverviewPage.verifyPaymentInfo("SauceCard #31337");
  });

  it("[CKO-OV-005] Should display correct shipping method", () => {
    CheckoutOverviewPage.verifyShippingMethod("Free Pony Express Delivery!");
  });

  it("[CKO-OV-006] Should display correct item total", () => {
    CheckoutOverviewPage.verifyItemTotal("$29.99");
  });

  it("[CKO-OV-007] Should display correct tax amount", () => {
    CheckoutOverviewPage.verifyTax("$2.40");
  });

  it("[CKO-OV-008] Should display correct final total", () => {
    CheckoutOverviewPage.verifyTotal("$32.39");
  });

  it("[CKO-OV-009] Should display the Cancel button", () => {
    CheckoutOverviewPage.verifyCancelButtonVisible();
  });

  it("[CKO-OV-010] Should display the Finish button and it is enabled", () => {
    CheckoutOverviewPage.verifyFinishButtonIsVisible();
  });

  it("[CKO-OV-011] Should display the correct style for the Finish button", () => {
    CheckoutOverviewPage.assertFinishButtonColor();
  });

  it("[CKO-OV-012] Should navigate back to the cart when Cancel is clicked", () => {
    CheckoutOverviewPage.clickCancelButton();
    cy.url().should("include", "/inventory.html");
  });

  it("[CKO-OV-013] Should calculate and match displayed total accurately", () => {
    CheckoutOverviewPage.assertTotalMatchesDisplaydTotal("$32.39");
  });
});


