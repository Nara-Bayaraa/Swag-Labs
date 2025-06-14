import CheckoutPage from "../../support/page-objects/checkout.page";
import {
  firstName,
  lastName,
  zipCode,
} from "../../support/helpers/generate-user-data";

describe("Checkout Step One", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.startCheckoutWithSingleProduct("Sauce Labs Backpack");
  });

  describe("Input Fields Visibility", () => {
    it("[CKO-001] Should navigate to the correct Checkout Step One URL", () => {
      cy.url().should("include", "checkout-step-one.html");
    });

    it("[CKO-002] Should display First Name input field", () => {
      CheckoutPage.verifyFirstNameInputIsVisible();
    });

    it("[CKO-003] Should display Last Name input field", () => {
      CheckoutPage.verifyLastNameInputIsVisible();
    });

    it("[CKO-004] Should display Zip/Postal Code input field", () => {
      CheckoutPage.verifyZipPostalCodeInputIsVisible();
    });
  });

  describe("Checkout Step One - Input Field Validation", () => {
    it("[CKO-POS-001] Should allow user to enter all required fields", () => {
      CheckoutPage.fillFirstName(firstName);
      CheckoutPage.fillLastName(lastName);
      CheckoutPage.fillZipPostalCode(zipCode);
      CheckoutPage.assertCheckoutFieldsContainValues(
        firstName,
        lastName,
        zipCode
      );
    });

    it("[CKO-POS-002] Should navigate to Checkout Step Two with valid info", () => {
      CheckoutPage.fillPersonalDetails(firstName, lastName, zipCode);
      CheckoutPage.clickContinueButton();
      cy.url().should("include", "checkout-step-two.html");
    });
  });
});
