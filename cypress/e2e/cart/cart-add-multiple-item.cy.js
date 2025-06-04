import InventoryPage from "../../support/page-objects/inventory.page";
import HeaderComponentPage from "../../support/page-objects/header-component.page";
import CartPage from "../../support/page-objects/cart.page";
const productsToAdd = [
  "Sauce Labs Bike Light",
  "Sauce Labs Fleece Jacket",
  "Test.allTheThings() T-Shirt (Red)",
];

describe("Multiple Items Cart Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("[CART-UI-MI-001] Should update the header cart badge correctly when multiple items are added", () => {
    InventoryPage.addMultipleProductsToCart(productsToAdd);
    HeaderComponentPage.verifyCartItemCount(productsToAdd.length);
  });

  it("[CART-UI-MI-002] Should display all added multiple items in the cart", () => {
    InventoryPage.addMultipleProductsToCart(productsToAdd);
    HeaderComponentPage.clickGoToCart();
    CartPage.verifyMultipleCartItemsVisible(productsToAdd);
  });

  it("[CART-UI-MI-003] Should show the correct prices for each of the multiple added items in the cart", () => {
    InventoryPage.addMultipleProductsToCart(productsToAdd);
    HeaderComponentPage.clickGoToCart();
    CartPage.verifyCartItemPrice("Sauce Labs Bike Light", "$9.99");
    CartPage.verifyCartItemPrice("Sauce Labs Fleece Jacket", "$49.99");
    CartPage.verifyCartItemPrice("Test.allTheThings() T-Shirt (Red)", "$15.99");
  });

  it("[CART-UI-MI-004] Should reflect the correct total number of items on the cart page itself", () => {
    InventoryPage.addMultipleProductsToCart(productsToAdd);
    HeaderComponentPage.clickGoToCart();
    CartPage.verifyTotalCartItems(productsToAdd.length);
  });
});