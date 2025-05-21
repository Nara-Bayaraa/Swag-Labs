class CheckoutCompletePage {
  get checkoutCompleteTitle() {
    return cy.get('[data-test="title"]');
  }
  get thankYouForOrderHeader() {
    return cy.get('[data-test="complete-header"]');
  }
  get completeCheckmarkImage() {
    return cy.get('[data-test="pony-express"]');
  }
  get backHomeButton() {
    return cy.get('[data-test="back-to-products"]');
  }
  get shippingConfirmationMessage() {
    return cy.get('[data-test="complete-text"]');
  }
  verifyCheckoutCompleteTitleIsVisible() {
    this.checkoutCompleteTitle
      .should("be.visible")
      .and("contain", "Checkout: Complete!");
  }

  verifyThankYouForOrderMessageIsVisible() {
    this.thankYouForOrderHeader
      .should("be.visible")
      .and("contain", "Thank you for your order!");
  }

  verifyCompleteCheckmarkImageIsDisplayed() {
    this.completeCheckmarkImage.should("be.visible").and("have.attr", "src");
  }

  verifyBackHomeButtonIsDisplayed() {
    this.backHomeButton.should("be.visible").and("contain", "Back Home");
  }

  verifyBackHomeButtonColorIsCorrect() {
    this.backHomeButton.should(
      "have.css",
      "background-color",
      "rgb(61, 220, 145)"
    );
  }
  verifyShippingConfirmationIsDisplayed() {
    this.shippingConfirmationMessage
      .should("be.visible")
      .and(
        "have.text",
        "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
      );
  }
  verifyBackHomeButtonIsClickable() {
    this.backHomeButton.should("be.enabled");
  }
  clickBackHomeButton(){
    this.backHomeButton.click();
  }
}
export default new CheckoutCompletePage();
