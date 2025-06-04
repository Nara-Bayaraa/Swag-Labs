import CheckoutPage from "../../support/page-objects/checkout.page";
import {
  firstName,
  lastName,
  zipCode,
} from "../../support/helpers/generate-user-data";

describe("Checkout Step One - Negative Scenarios", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.startCheckoutWithSingleProduct("Sauce Labs Backpack");
  });

  it("[CKO-NEG-001] Should show error when all fields are empty", () => {
    CheckoutPage.clickContinueButton();
    CheckoutPage.assertErrorMessageIsDisplayed("Error: First Name is required");
  });

  it("[CKO-NEG-002] Should show error for missing First Name", () => {
    CheckoutPage.fillPersonalDetails("", lastName, zipCode);
    CheckoutPage.clickContinueButton();
    CheckoutPage.assertErrorMessageIsDisplayed("Error: First Name is required");
  });

  it("[CKO-NEG-003] Should show error for missing Last Name", () => {
    CheckoutPage.fillPersonalDetails(firstName, "", zipCode);
    CheckoutPage.clickContinueButton();
    CheckoutPage.assertErrorMessageIsDisplayed("Error: Last Name is required");
  });

  it("[CKO-NEG-004] should show error for missing Zip/Postal Code", () => {
    CheckoutPage.fillPersonalDetails(firstName, lastName, "");
    CheckoutPage.clickContinueButton();
    CheckoutPage.assertErrorMessageIsDisplayed(
      "Error: Postal Code is required"
    );
  });

  it("[CKO-NAV-005] should return to cart page on Cancel", () => {
    CheckoutPage.clickCancelButton();
    cy.url().should("include", "cart.html");
  });
});
