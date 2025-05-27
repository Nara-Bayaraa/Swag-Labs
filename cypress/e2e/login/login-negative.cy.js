import LoginPage from "../../support/page-objects/login.page";

describe("Login Functionality: Negative Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("[LOGIN-NEG-001] should show correct error for valid username and invalid password", () => {
    LoginPage.login(Cypress.env("standardUsername"), "invalidPassword");
    LoginPage.assertLoginErrorMessageIsDisplayed(
      "Username and password do not match any user in this service"
    );
  });

  describe("Scenario: Invalid Username and Valid Password", () => {
    beforeEach(() => {
      LoginPage.login("invalidUserName", Cypress.env("standardPassword"));
    });

    it("[LOGIN-NEG-OO2] should show an error message", () => {
      LoginPage.assertLoginErrorMessageIsDisplayed(
        "Epic sadface: Username and password do not match any user in this service"
      );
    });

    it("[LOGIN-NEG-003] should allow closing the error message", () => {
      LoginPage.assertLoginErrorMessageIsDisplayed(
        "Epic sadface: Username and password do not match any user in this service"
      );
      LoginPage.closeLoginErrorMessage();
      LoginPage.verifyLoginErrorMessageIsNotVisible();
    });
  });

  it("[LOGIN-NEG-004] should show 'Password is required' for valid username and empty password", () => {
    LoginPage.login(Cypress.env("standardUsername"), "");
    LoginPage.assertLoginErrorMessageIsDisplayed("Password is required");
  });

  it("[LOGIN-NEG-005] should show 'Username is required' for empty username and valid password", () => {
    LoginPage.login("", Cypress.env("standardPassword"));
    LoginPage.assertLoginErrorMessageIsDisplayed("Username is required");
  });

  it("[LOGIN-NEG-006] should show 'Username is required' for empty username and empty password", () => {
    LoginPage.login("", "");
    LoginPage.assertLoginErrorMessageIsDisplayed(
      "Epic sadface: Username is required"
    );
  });
});
