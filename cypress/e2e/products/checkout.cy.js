import CheckoutPage from "../../support/pageObjects/checkout.page";
import {
  fakerFirstName,
  fakerLastName,
  fakerZipCode,
} from "../../support/fakerData";

describe("Checkout Step One", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.startCheckoutWithSingleProduct("Sauce Labs Backpack");
  });

  describe("Input Fields Visibility", () => {
    it("[CKO-001] should navigate to the correct Checkout Step One URL", () => {
      cy.url().should("include", "checkout-step-one.html");
    });

    it("[CKO-002] should display First Name input field", () => {
      CheckoutPage.verifyFirstNameInputIsVisible();
    });

    it("[CKO-003] should display Last Name input field", () => {
      CheckoutPage.verifyLastNameInputIsVisible();
    });

    it("[CKO-004] should display Zip/Postal Code input field", () => {
      CheckoutPage.verifyZipPostalCodeInputIsVisible();
    });
  });

  describe("Checkout Step One - Input Field Validation", () => {
    it("[CKO-POS-001] should allow user to enter all required fields", () => {
      CheckoutPage.fillFirstName(fakerFirstName);
      CheckoutPage.fillLastName(fakerLastName);
      CheckoutPage.fillZipPostalCode(fakerZipCode);
      CheckoutPage.assertCheckoutFieldsContainValues(
        fakerFirstName,
        fakerLastName,
        fakerZipCode
      );
    });

    it("[CKO-POS-002] should navigate to Checkout Step Two with valid info", () => {
      CheckoutPage.fillPersonalDetails(
        fakerFirstName,
        fakerLastName,
        fakerZipCode
      );
      CheckoutPage.clickContinueButton();
      cy.url().should("include", "checkout-step-two.html");
    });

    it("[CKO-NEG-001] should show error when all fields are empty", () => {
      CheckoutPage.clickContinueButton();
      CheckoutPage.assertErrorMessageIsDisplayed(
        "Error: First Name is required"
      );
    });

    it("[CKO-NEG-002] should show error for missing First Name", () => {
      CheckoutPage.fillPersonalDetails("", fakerLastName, fakerZipCode);
      CheckoutPage.clickContinueButton();
      CheckoutPage.assertErrorMessageIsDisplayed(
        "Error: First Name is required"
      );
    });

    it("[CKO-NEG-003] should show error for missing Last Name", () => {
      CheckoutPage.fillPersonalDetails(fakerFirstName, "", fakerZipCode);
      CheckoutPage.clickContinueButton();
      CheckoutPage.assertErrorMessageIsDisplayed(
        "Error: Last Name is required"
      );
    });

    it("[CKO-NEG-004] should show error for missing Zip/Postal Code", () => {
      CheckoutPage.fillPersonalDetails(fakerFirstName, fakerLastName, "");
      CheckoutPage.clickContinueButton();
      CheckoutPage.assertErrorMessageIsDisplayed(
        "Error: Postal Code is required"
      );
    });

    it("[CKO-NAV-001] should return to cart page on Cancel", () => {
      CheckoutPage.clickCancelButton();
      cy.url().should("include", "cart.html");
    });
  });
});
