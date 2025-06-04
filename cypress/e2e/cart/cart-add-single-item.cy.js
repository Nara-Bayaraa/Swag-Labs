import InventoryPage from "../../support/page-objects/inventory.page";
import HeaderComponentPage from "../../support/page-objects/header-component.page";
import CartPage from "../../support/page-objects/cart.page";

describe("Single Item Cart Functionality", () => {
  const singleProduct = "Sauce Labs Bike Light";
  const singleProductPrice = "$9.99";
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("[CART-UI-SI-001] Should update the header cart badge when a single item is added", () => {
    InventoryPage.addProductToCart(singleProduct);
    HeaderComponentPage.verifyCartItemCount(1);
  });

  it("[CART-UI-SI-002] Should display the added single item correctly in the cart", () => {
    InventoryPage.addProductToCart(singleProduct);
    HeaderComponentPage.clickGoToCart();
    CartPage.verifyCartItemIsVisible(singleProduct);
  });

  it("[CART-UI-SI-003] Should show the correct quantity (1) for a single added item in the cart", () => {
    InventoryPage.addProductToCart(singleProduct);
    HeaderComponentPage.clickGoToCart();
    CartPage.verifyCartItemQuantity(singleProduct, 1);
  });

  it("[CART-UI-SI-004] Should show the correct price for a single added item in the cart", () => {
    InventoryPage.addProductToCart(singleProduct);
    HeaderComponentPage.clickGoToCart();
    CartPage.verifyCartItemPrice(singleProduct, singleProductPrice);
  });
});