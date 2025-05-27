import CheckoutCompletePage from "../../support/page-objects/checkout-complete.page";
import CheckoutOverviewPage from "../../support/page-objects/checkout-overview.page";
import InventoryPage from "../../support/page-objects/inventory.page";
import HeaderComponentPage from "../../support/page-objects/header-component.page";
import {
  firstName,
  lastName,
  zipCode,
} from "../../support/helpers/generate-user-data";

describe("Checkout Complete Page Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
cy.startCheckoutWithSingleProduct("Sauce Labs Backpack");
cy.fillCheckoutFormAndContinue(firstName, lastName, zipCode);
CheckoutOverviewPage.clickFinishButton();
  
})
  it("[CKO-COMP-001] Should display the confirmation title after order completion", () => {
    CheckoutCompletePage.verifyCheckoutCompleteTitleIsVisible();
  });
  it("[CKO-COMP-002] Should display the thank you for your order message", () => {
    CheckoutCompletePage.verifyThankYouForOrderMessageIsVisible();
  });

  it("[CKO-COMP-003] Should display the success checkmark icon", () => {
    CheckoutCompletePage.verifyBackHomeButtonIsDisplayed();
  });

  it("[CKO-COMP-004] Should empty the cart after order completion", () => {
    HeaderComponentPage.verifyCartIsEmpty();
    HeaderComponentPage.verifyHamburgerMenuButtonIsVisible();
  });
  it("[CKO-COMP-005] Should display the shipping confirmation information", () => {
    CheckoutCompletePage.verifyShippingConfirmationIsDisplayed();
  });

  it('[CKO-COMP-006] Should display the "Back Home" button with correct color', () => {
    CheckoutCompletePage.verifyBackHomeButtonIsDisplayed();
    CheckoutCompletePage.verifyBackHomeButtonColorIsCorrect();
  });

  it.only('[CKO-COMP-007] Should navigate to inventory when "Back Home" button is clicked', () => {
    CheckoutCompletePage.verifyBackHomeButtonIsClickable();
    CheckoutCompletePage.clickBackHomeButton()
    cy.url().should('include', 'inventory.html');
    InventoryPage.verifyProductListingIsVisible();
    
  });
});
