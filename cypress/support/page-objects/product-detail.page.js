class ProductDetailPage {
  get inventoryName() {
    return cy.get(".inventory_details_name");
  }
  get inventoryDescription() {
    return cy.get(".inventory_details_desc");
  }
  get inventoryPrice() {
    return cy.get(".inventory_details_price");
  }
  get inventoryImage() {
    return cy.get(".inventory_details_img");
  }
  get inventoryAddToCardButton() {
    return cy.get('[data-test="add-to-cart"]');
  }
  get inventoryBackToProductsButton() {
    return cy.get('[data-test="back-to-products"]');
  }
  get inventoryRemoveButton() {
    return cy.get('[data-test="remove"]');
  }
   clickInventoryAddToCart() {
    this.inventoryAddToCardButton.click();
  }
  verifyProductNameIsVisible() {
    this.inventoryName.should("be.visible");
  }
  verifyProductDescriptionIsVisible() {
    this.inventoryDescription.should("not.be.empty");
  }
  verifyProductImageIsVisible() {
    this.inventoryImage.should("be.visible").and(($img) => {
      expect($img[0].getAttribute("src")).to.not.be.empty;
    });
  }
  verifyAddToCardButtonIsVisible() {
    this.inventoryAddToCardButton
      .should("be.visible")
      .and("contain", "Add to cart");
  }
  verifyBackButtonIsVisible() {
    this.inventoryBackToProductsButton.should("be.visible").and("have.text", "Back to products");
  }
    verifyRemoveButtonIsVisible() {
    this.inventoryRemoveButton.should("be.visible");
  }
  verifyProductPrice(expectedPrice) {
    this.inventoryPrice.should("have.text", expectedPrice);
  }
  clickInventoryAddToCart() {
    this.inventoryAddToCardButton.click();
  }
  clickRemoveButton(){
    this.inventoryRemoveButton.click();
  }
  clickBackButton() {
    this.inventoryBackToProductsButton.forceClick(); 
  }
}
export default new ProductDetailPage();
