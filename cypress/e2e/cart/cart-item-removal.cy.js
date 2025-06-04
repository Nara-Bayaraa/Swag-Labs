import InventoryPage from "../../support/page-objects/inventory.page";
import HeaderComponentPage from "../../support/page-objects/header-component.page";
import CartPage from "../../support/page-objects/cart.page";

describe("Cart Item Removal Functionality", () => {
  const itemToKeep = "Sauce Labs Bike Light";
  const itemToRemove = "Sauce Labs Fleece Jacket";

  beforeEach(() => {

    cy.visit("/");
    cy.login();

    InventoryPage.addProductToCart(itemToKeep);
    InventoryPage.addProductToCart(itemToRemove);
    HeaderComponentPage.clickGoToCart();
  });

  it("[[CART-UI-REM-001] Should update the header cart badge correctly after removing an item", () => {
    HeaderComponentPage.verifyCartItemCount(2);
    CartPage.clickRemoveButton(itemToRemove);
    HeaderComponentPage.verifyCartItemCount(1);
  });

  it("[[CART-UI-REM-002] Should remove the correct item from the cart list", () => {
    CartPage.verifyCartItemIsVisible(itemToRemove); 
    CartPage.clickRemoveButton(itemToRemove);
    CartPage.verifyCartItemIsNotVisible(itemToRemove); 

  it("[[CART-UI-REM-003] Should ensure remaining items are unaffected after an item is removed", () => {
    CartPage.clickRemoveButton(itemToRemove);
    CartPage.verifyCartItemIsVisible(itemToKeep);
    CartPage.verifyCartItemQuantity(itemToKeep, 1);
  });
});
});