import ProductDetailPage from "../../support/pageObjects/productDetail.page";
import HeaderComponentPage from "../../support/pageObjects/headerComponent.page";
import InventoryPage from "../../support/pageObjects/inventory.page";

// --- Test Suite for Product Detail Page UI ---
describe("Product Detail Page - UI Verification", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    InventoryPage.clickProductByName("Sauce Labs Backpack");
  });

  it("[PDP-UI-001] should display the product name correctly", () => {
    cy.url().should("include", "/inventory-item.html?id=4");
    ProductDetailPage.verifyProductNameIsVisible();
  });

  it("[PDP-UI-002] should display the product description", () => {
    ProductDetailPage.verifyProductDescriptionIsVisible();
  });

  it("[PDP-UI-003] should display the product image", () => {
    ProductDetailPage.verifyProductImageIsVisible();
  });

  it("[PDP-UI-004] should display the product price correctly", () => {
    ProductDetailPage.verifyProductPrice("$29.99");
  });

  it("[PDP-UI-005] should display the ADD TO CART button when product is not in cart", () => {
    ProductDetailPage.verifyAddToCardButtonIsVisible();
  });

  it("[PDP-UI-005] should display the 'Back' button", () => {
    ProductDetailPage.verifyBackButtonIsVisible();
  });
});

// Test Suite for Product Detail Page Functionality ---
describe("Product Detail Page - Add to Cart Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    InventoryPage.clickProductByName("Sauce Labs Backpack"); // Navigate to PDP
    cy.url().should("include", "/inventory-item.html?id=4");
  });

  it("[PDP-UI-FUNC-001] should add the product to the cart from PDP", () => {
    ProductDetailPage.clickInventoryAddToCart();
    HeaderComponentPage.verifyCartItemCount(1);
  });

  it("[PDP-UI-FUNC-002] should display 'Remove' button after adding product to cart", () => {
    ProductDetailPage.clickInventoryAddToCart();
    ProductDetailPage.verifyRemoveButtonIsVisible();
  });
  
  it("[PDP-UI-FUNC-003] should remove the product from the cart from PDP", () => {
    cy.log("Adding then removing product from cart and verifying cart count");
    ProductDetailPage.clickInventoryAddToCart();
    HeaderComponentPage.verifyCartItemCount(1);
    ProductDetailPage.clickRemoveButton();
    HeaderComponentPage.verifyCartIsEmpty();
    ProductDetailPage.verifyAddToCardButtonIsVisible();
  });
});

// Test Suite for Navigation from Product Detail Page ---
describe("Product Detail Page - Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    InventoryPage.clickProductByName("Sauce Labs Backpack");
    cy.url().should("include", "/inventory-item.html?id=4");
  });

  it("[PDP-UI-NAV-001] should navigate back to the inventory page when 'Back' is clicked", () => {
    cy.log("Clicking 'Back to products' button and verifying URL");
    ProductDetailPage.clickBackButton();
    cy.url().should("include", "/inventory.html");
    InventoryPage.verifyLayoutElementsAreVisible();
  });
});
