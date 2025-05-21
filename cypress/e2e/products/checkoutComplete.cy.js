import CheckoutCompletePage from "../../support/pageObjects/checkoutComplete.page";
import CheckoutOverviewPage from "../../support/pageObjects/checkoutOverview.page";
import InventoryPage from "../../support/pageObjects/inventory.page";
import {
  fakerFirstName,
  fakerLastName,
  fakerZipCode,
} from "../../support/fakerData";
import HeaderComponentPage from "../../support/pageObjects/headerComponent.page";
describe("", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
cy.startCheckoutWithSingleProduct("Sauce Labs Backpack");
cy.fillCheckoutFormAndContinue(fakerFirstName, fakerLastName, fakerZipCode);
CheckoutOverviewPage.clickFinishButton();
  
})
  it("[CKO-COMP-001] Verify the confirmation Title displayed", () => {
    CheckoutCompletePage.verifyCheckoutCompleteTitleIsVisible();
  });
  it(" [CKO-COMP-002] Verify the confirmation Message displayed", () => {
    CheckoutCompletePage.verifyThankYouForOrderMessageIsVisible();
  });

  it("[CKO-COMP-003] Verify the success Checkmark icon is visible", () => {
    CheckoutCompletePage.verifyBackHomeButtonIsDisplayed();
  });

  it(" [CKO-COMP-004] Verify cart is empty after order completion", () => {
    HeaderComponentPage.verifyCartIsEmpty();
    HeaderComponentPage.verifyHamburgerMenuButtonIsVisible();
  });
  it("[CKO-COMP-005] Verify Shipping information is displayed", () => {
    CheckoutCompletePage.verifyShippingConfirmationIsDisplayed();
  });

  it('[CKO-COMP-006] Verify that the "Back Home" button is visible with correct color', () => {
    CheckoutCompletePage.verifyBackHomeButtonIsDisplayed();
    CheckoutCompletePage.verifyBackHomeButtonColorIsCorrect();
  });

  it.only('[CKO-COMP-007] Verify that the "Back Home" button is functional', () => {
    CheckoutCompletePage.verifyBackHomeButtonIsClickable();
    CheckoutCompletePage.clickBackHomeButton()
    cy.url().should('include', 'inventory.html');
    InventoryPage.verifyProductListingIsVisible();
    
  });
});
