import InventoryPage from "../../support/page-objects/inventory.page";
import HeaderComponentPage from "../../support/page-objects/header-component.page";
import CartPage from "../../support/page-objects/cart.page";

describe("Cart Page Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    InventoryPage.addProductToCart("Sauce Labs Bike Light");
    HeaderComponentPage.clickGoToCart();
  });

  it("[CART-UI-NAV-001] Should ensure the “Continue Shopping” button is visible on the cart page", () => {
    CartPage.verifyContinueShoppingButtonIsVisible();
  });

  it("[CART-UI-NAV-002] Should return to the Inventory Page when “Continue Shopping” button is clicked", () => {
    CartPage.clickContinueShoppingButton();
    cy.url().should("include", "/inventory.html");
    InventoryPage.verifyProductListingIsVisible();
  });
});
