class HeaderComponentPage {
  get productsHeader() {
    return cy.get(".product_label");
  }
  get hamburgerMenuButton() {
    return cy.get('[class="bm-burger-button"]');
  }
  get cartItemCountBadge() {
    return cy.get('[class="fa-layers-counter shopping_cart_badge"]');
  }
  get shoppingCart() {
    return cy.get("#shopping_cart_container");
  }
  get inventoryPageHeaderLogo() {
    return cy.get(".header_label");
  }
  verifyInventoryPageHeaderLogoIsExist() {
    this.inventoryPageHeaderLogo.should("exist");
  }
  verifyProductHeaderIsVisible() {
    this.productsHeader.should("be.visible");
  }
  verifyHamburgerMenuButtonIsVisible() {
    this.hamburgerMenuButton.should("be.visible");
  }
  verifyShoppingCartIconIsVisible() {
    this.shoppingCart.should("be.visible");
  }
  verifyHeaderElementsAreVisible() {
    this.productsHeader.should("be.visible");
    this.hamburgerMenuButton.should("be.visible");
    this.shoppingCart.should("be.visible");
  }
  verifyCartItemCount(expectedCount) {
    this.cartItemCountBadge.should("contain", expectedCount);
  }
  clickSidebarOpenButton() {
    this.hamburgerMenuButton.click();
  }
  verifyCartIsEmpty() {
    cy.get("body").then(($body) => {
      if ($body.find(".shopping_cart_badge").length) {
        this.shoppingCart.should("not.exist");
      } else {
        cy.log("Cart badge not present — as expected");
      }
    });
  }
  clickGoToCart() {
    this.shoppingCart.click();
  }
}
export default new HeaderComponentPage();
