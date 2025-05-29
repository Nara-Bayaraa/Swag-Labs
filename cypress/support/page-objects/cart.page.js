class CartPage {
  get itemQuantity() {
    return cy.get(".cart_quantity_label");
  }
  get itemDescription() {
    return cy.get(".cart_desc_label");
  }
  get cartItem() {
    return cy.get(".inventory_item");
  }
  get itemPrice() {
    return cy.get('[class="inventory_item_price"]');
  }
  get removeButton() {
    return cy.get('[class="btn_secondary cart_button"]');
  }
  get checkoutButton() {
    return cy.get('#checkout');
  }
  get continueShoppingButton() {
    return cy.get('#continue-shopping');
  }

  verifyCartItemIsVisible(productName) {
    cy.contains(".cart_item", productName).should("be.visible");
  }

  verifyMultipleCartItemsVisible(productNames) {
    productNames.forEach((name) => {
      this.verifyCartItemIsVisible(name);
    });
  }

  verifyCartItemQuantity(productName, expectedQty) {
    cy.contains(".cart_item", productName)
      .find(".cart_quantity")
      .should("have.text", expectedQty);
  }

  verifyCartItemPriceFormat(productName) {
    cy.contains(".cart_item", productName)
      .find(".inventory_item_price")
      .invoke("text")
      .should("match", /^\d+(\.\d{2})?$/); 
  }

  verifyCartItemPrice(productName, expectedPrice) {
    cy.contains(".cart_item", productName)
      .find(".inventory_item_price")
      .should("have.text", expectedPrice);
  }
  verifyCheckoutButtonIsVisible() {
    this.checkoutButton
      .should("be.visible")
      .and("have.attr", "href", "./checkout-step-one.html")
      .and("have.text", "CHECKOUT");
  }
  verifyContinueShoppingButtonIsVisible() {
    this.continueShoppingButton.should("be.visible")
  }
  clickContinueShoppingButton() {
    this.continueShoppingButton.click();
  }
  verifyTotalCartItems(expectedCount) {
    cy.get(".cart_item").should("have.length", expectedCount);
  }
  clickRemoveButton(productName) {
    cy.contains(".cart_item", productName)
      .find(".btn_secondary.cart_button")
      .should("be.visible")
      .click();
  }
  
  verifyCartItemIsNotVisible(productName) {
    cy.contains(".inventory_item_name", productName).should("not.exist");
  }

  clickCheckoutButton() {
    this.checkoutButton.click();
  }
}
export default new CartPage();
