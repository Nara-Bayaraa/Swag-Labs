import InventoryPage from "../../support/page-objects/inventory.page";
import HeaderComponentPage from "../../support/page-objects/header-component.page";
import CartPage from "../../support/page-objects/cart.page";
const productsToAdd = [
  "Sauce Labs Bike Light",
  "Sauce Labs Fleece Jacket",
  "Test.allTheThings() T-Shirt (Red)",
];

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
    CartPage.verifyCartItemIsVisible(itemToRemove); // Pre-condition: item is there
    CartPage.clickRemoveButton(itemToRemove);
    CartPage.verifyCartItemIsNotVisible(itemToRemove); // Assuming you have/create this verification
  });

  it("[[CART-UI-REM-003] Should ensure remaining items are unaffected after an item is removed", () => {
    CartPage.clickRemoveButton(itemToRemove);
    CartPage.verifyCartItemIsVisible(itemToKeep);
    CartPage.verifyCartItemQuantity(itemToKeep, 1);
  });
});
describe.only("Cart Page Navigation", () => {
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
