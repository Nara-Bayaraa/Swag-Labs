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
    return cy.get('[class="btn_primary btn_inventory"]');
  }
  get inventoryBackButton() {
    return cy.get(".inventory_details_back_button");
  }
  get inventoryRemoveButton() {
    return cy.get('[class="btn_secondary btn_inventory"]');
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
      .and("contain", "ADD TO CART");
  }
  verifyBackButtonIsVisible() {
    this.inventoryBackButton.should("be.visible").and("have.text", "<- Back");
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
    this.inventoryBackButton.forceClick(); 
  }
}
export default new ProductDetailPage();
