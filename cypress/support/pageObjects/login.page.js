class Login {
  get loginPageHeaderLogo() {
    return cy.get(".login_logo");
  }
  get botImage() {
    return cy.get(".bot_column");
  }
  get loginFormContainer() {
    return cy.get("div[class='login-box'] form");
  }
  get usernameInput() {
    return cy.get('[data-test="username"]');
  }
  get passwordInput() {
    return cy.get('[data-test="password"]');
  }
  get loginButton() {
    return cy.get("#login-button");
  }
  get headerLogo() {
    return cy.get(".header_label");
  }
  get hamburgerMenuButton() {
    return cy.get('div[class="bm-burger-button"]');
  }
  get logoutButton() {
    return cy.get('[class="bm-item menu-item"]').contains("Logout");
  }
  get errorMessage() {
    return cy.get("h3[data-test='error']");
  }
  get modalCloseButton() {
    return cy.get("svg[role='img']");
  }
  get passwordRequiredMessage() {
    return cy.get("h3[data-test='error']");
  }
  get usernameRequiredMessage() {
    return cy.get("h3[data-test='error']");
  }
  login(username, password) {
    if (username && username.length > 0) {
      this.usernameInput.clear().type(username);
    } else {
      this.usernameInput.clear();
    }
    if (password && password.length > 0) {
      this.passwordInput.clear().type(password);
    } else {
      this.passwordInput.clear();
    }
    this.loginButton.click();
  }
  logout() {
    this.hamburgerMenuButton.forceClick();
    this.logoutButton.forceClick();
  }
  verifyLoginFormIsVisible() {
    this.usernameInput.should("be.visible");
    this.passwordInput.should("be.visible");
    this.loginButton.should("be.visible");
  }
  verifyHeaderLogoIsVisible() {
    this.loginPageHeaderLogo.should("be.visible");
  }
  verifyBotImageIsVisible() {
    this.botImage.should("be.visible");
  }
  verifyLoginFormContainerVisible() {
    this.loginFormContainer.should("be.visible");
  }
  assertLoginErrorMessageIsDisplayed(expectedErrorMessage) {
    this.errorMessage.should("be.visible").and("contain", expectedErrorMessage);
  }
  closeLoginErrorMessage() {
    this.modalCloseButton.click();
  }
  verifyLoginErrorMessageIsNotVisible() {
    this.errorMessage.should("not.exist");
  }
}
export default new Login();
