import HeaderComponentPage from "../../support/page-objects/header-component.page";
import LoginPage from "../../support/page-objects/login.page";

describe("Login and Logout Functionality: Positive Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Login Page Initial UI Elements", () => {
    it("[LOGIN-POS-001] should display the login page header logo", () => {
      LoginPage.verifyHeaderLogoIsVisible();
    });

    it("[LOGIN-POS-002] should display the login form box", () => {
      LoginPage.verifyLoginFormIsVisible();
    });
  });

  describe("Login Functionality", () => {
    it("[LOGIN-POS-001] should allow a standard user to login successfully and land on the inventory page", () => {
      LoginPage.login(
        Cypress.env("standardUsername"),
        Cypress.env("standardPassword")
      );
      HeaderComponentPage.verifyInventoryPageHeaderLogoIsExist();
      cy.url().should("include", "/inventory.html");
    });
  });

  
});
