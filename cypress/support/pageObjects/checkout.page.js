class CheckoutPage {
  get checkoutPageHeader() {
    return cy.get(".subheader");
  }
  get firstNameInput() {
    return cy.get("#first-name");
  }
  get lastNameInput() {
    return cy.get("#last-name");
  }
  get zipPostalCodeInput() {
    return cy.get("#postal-code");
  }

  get checkoutFormContainer() {
    return cy.get(".checkout_info");
  }
  get cancelButton() {
    return cy.get('[data-test="cancel"]');
  }
  get continueButton() {
    return cy.get('[data-test="continue"]');
  }
  get errorMessage() {
    return cy.get('h3[data-test="error"]');
  }

  verifyFirstNameInputIsVisible() {
    this.firstNameInput.should("be.visible");
  }
  verifyLastNameInputIsVisible() {
    this.lastNameInput.should("be.visible");
  }
  verifyZipPostalCodeInputIsVisible() {
    this.zipPostalCodeInput.should("be.visible");
  }

  assertCheckoutFieldsContainValues(
    expectedFirstName,
    expectedLastName,
    expectedZipPostalCode
  ) {
    this.firstNameInput.should("have.value", expectedFirstName);
    this.lastNameInput.should("have.value", expectedLastName);
    this.zipPostalCodeInput.should("have.value", expectedZipPostalCode);
  }

  assertErrorMessageIsDisplayed(expectedMessage) {
    this.errorMessage.should("be.visible").and("have.text", expectedMessage);
  }

  fillFirstName(firstName) {
    if (firstName && firstName.length > 0) {
      this.firstNameInput.type(firstName);
    } else {
      this.firstNameInput.clear();
    }
  }
  fillLastName(lastName) {
    if (lastName && lastName.length > 0) {
      this.lastNameInput.type(lastName);
    } else {
      this.lastNameInput.clear();
    }
  }
  fillZipPostalCode(zipPostalCode) {
    if (zipPostalCode && zipPostalCode.length > 0) {
      this.zipPostalCodeInput.type(zipPostalCode);
    } else {
      this.zipPostalCodeInput.clear;
    }
  }
  fillPersonalDetails(firstName, lastName, zipPostalCode) {
    this.fillFirstName(firstName);
    this.fillLastName(lastName);
    this.fillZipPostalCode(zipPostalCode);
  }

  clickContinueButton() {
    this.continueButton.click();
  }
  clickCancelButton() {
    this.cancelButton.click();
  }
}
export default new CheckoutPage();
