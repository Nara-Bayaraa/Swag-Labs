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
  it("[CKO-OV-001] should display correct order summary details", () => {
    CheckoutOverviewPage.verifyProductName("Sauce Labs Backpack");
    CheckoutOverviewPage.verifyProductPrice("$29.99");
    CheckoutOverviewPage.verifyQuantity("1");
    CheckoutOverviewPage.verifyPaymentInfo("SauceCard #31337");
    CheckoutOverviewPage.verifyShippingMethod("Free Pony Express Delivery!");
    CheckoutOverviewPage.verifyItemTotal("$29.99");
    CheckoutOverviewPage.verifyTax("$2.40");
    CheckoutOverviewPage.verifyTotal("$32.39");
    CheckoutOverviewPage.verifyCancelButtonVisible();
  });

  it('[CKO-OV-002] Verify that the "Finish" button is visible and enabled', () => {
    CheckoutOverviewPage.verifyFinishButtonIsVisible();
    CheckoutOverviewPage.assertFinishButtonColor();
  });

  it('[CKO-OV-003] Verify that the "Cancel" button redirects user to the cart', () => {
    CheckoutOverviewPage.clickCancelButton();
    cy.url().should("include", "/inventory.html");
  });

  it("[CKO-OV-004] Verify total price is calculated correctly", () => {
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
  it("[CKO-MULTI-001] should display first product details", () => {
    CheckoutOverviewPage.verifyProductName("Sauce Labs Bike Light");
    CheckoutOverviewPage.verifyProductPrice("$9.99");
    CheckoutOverviewPage.verifyQuantity("1");
    CheckoutOverviewPage.verifyPaymentInfo("SauceCard #31337");
    CheckoutOverviewPage.verifyShippingMethod("Free Pony Express Delivery!");
  });

  it("[CKO-MULTI-002] should display second product details", () => {
    CheckoutOverviewPage.verifyProductName("Sauce Labs Fleece Jacket");
    CheckoutOverviewPage.verifyProductPrice("$49.99");
    CheckoutOverviewPage.verifyQuantity("1");
    CheckoutOverviewPage.verifyPaymentInfo("SauceCard #31337");
    CheckoutOverviewPage.verifyShippingMethod("Free Pony Express Delivery!");
  });

  it("[CKO-MULTI-003] should display correct item total for multiple products", () => {
    CheckoutOverviewPage.verifyItemTotal("$59.98");
  });

  it("[CKO-MULTI-004] should display correct tax amount for multiple products", () => {
    CheckoutOverviewPage.verifyTax("$4.80");
  });

  it("[CKO-MULTI-005] should display correct total for multiple products", () => {
    CheckoutOverviewPage.verifyTotal("$64.78");
  });

  it("[CKO-MULTI-006] should correctly match displayed total", () => {
    CheckoutOverviewPage.assertTotalMatchesDisplaydTotal("$64.78");
  });

  it.only("[CKO-MULTI-007] should show correct cart item count in header", () => {
    HeaderComponentPage.verifyCartItemCount(productsToAdd.length);
  });
});
