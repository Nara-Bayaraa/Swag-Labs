class OverviewPage {
  get overviewPageHeader() {
    return cy.get(".subheader");
  }
  get productName() {
    return cy.get(".inventory_item_name");
  }
  get productQuantity() {
    return cy.get('[data-test="item-quantity"]');
  }
  get productPrice() {
    return cy.get(".inventory_item_price");
  }
  get paymentInformation() {
    return cy.get(".summary_value_label").eq(0);
  }
  get shippingMethod() {
    return cy.get('[data-test="shipping-info-value"]');
  }
  get itemTotal() {
    return cy.get(".summary_subtotal_label");
  }
  get tax() {
    return cy.get(".summary_tax_label");
  }
  get total() {
    return cy.get(".summary_total_label");
  }
  get cancelButton() {
    return cy.get('[data-test="cancel"]');
  }
  get finishButton() {
    return cy.get('[data-test="finish"]');
  }

  verifyProductName(expectedName) {
    this.productName.should("contain", expectedName);
  }
  verifyProductPrice(expectedPrice) {
    this.productPrice.should("contain", expectedPrice);
  }
  verifyQuantity(expectedQty) {
    this.productQuantity.should("contain", expectedQty);
  }
  verifyPaymentInfo(expectedInfo) {
    this.paymentInformation.should("contain", expectedInfo);
  }
  verifyShippingMethod(expectedShipping) {
    this.shippingMethod.should("contain", expectedShipping);
  }
  verifyItemTotal(expectedTotal) {
    this.itemTotal.should("contain", expectedTotal);
  }
  verifyTax(expectedTax) {
    this.tax.should("contain", expectedTax);
  }
  verifyTotal(expectedTotal) {
    this.total.should("contain", expectedTotal);
  }

  verifyCancelButtonVisible() {
    this.cancelButton
      .should("be.visible");
  }
  verifyFinishButtonIsVisible() {
    this.finishButton
      .should("exist") 
      .should("be.visible") 
      .and("not.be.disabled"); 
  }
  verifyFinishButtonIsVisible(){
    this.finishButton.should('be.enabled')
  }
  assertFinishButtonColor() {
    this.finishButton.should(
      "have.css",
      "background-color",
      "rgb(61, 220, 145)"
    );
  }
verifyFinishButtonIsClickable(){
  this.finishButton.should('be.enabled')
}
  clickCancelButton() {
    this.cancelButton.click();
  }
  clickFinishButton() {
    this.finishButton.click();
  }
  assertTotalMatchesDisplaydTotal(expectedTotal) {
    cy.wrap(null)
      .then(() => {
        return this.itemTotal.invoke("text").then((itemTotalText) => {
          return parseFloat(itemTotalText.replace("Item total: $", ""));
        });
      })
      .then((itemTotalValue) => {
        return this.tax.invoke("text").then((taxText) => {
          const taxValue = parseFloat(taxText.replace("Tax: $", ""));

          expectedTotal = (itemTotalValue + taxValue).toFixed(2);
          this.total.should("contain", `$${expectedTotal}`);
        });
      });
  }
}
export default new OverviewPage();
