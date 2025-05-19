import HeaderComponentPage from "../../support/pageObjects/headerComponent.page";
import LoginPage from "../../support/pageObjects/login.page";

describe("UI: User Login and Logout Functionality - Positive Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Login Page Initial UI Elements", () => {
    it("[LOGIN-UI-POS-001] should display the login page header logo", () => {
      LoginPage.verifyHeaderLogoIsVisible();
    });

    it("[LOGIN-UI-POS-002] should display the bot image on the login page", () => {
      LoginPage.verifyBotImageIsVisible();
    });

    it("[LOGIN-UI-POS-003] should display the login form box", () => {
      LoginPage.verifyLoginFormIsVisible();
    });
  });

  describe("Login Functionality", () => {
    it("[LOGIN-FUNC-POS-001] should allow a standard user to login successfully and land on the inventory page", () => {
      LoginPage.login(
        Cypress.env("standardUsername"),
        Cypress.env("standardPassword")
      );
      HeaderComponentPage.verifyInventoryPageHeaderLogoIsExist();
      cy.url().should("include", "/inventory.html");
    });
  });

  describe("Logout Functionality", () => {
    beforeEach(() => {
      LoginPage.login(
        Cypress.env("standardUsername"),
        Cypress.env("standardPassword")
      );
      cy.url().should("include", "/inventory.html");
    });

    it("[LOGIN-FUNC-POS-001] should allow a logged-in user to logout successfully and return to the login page", () => {
      LoginPage.logout();
      cy.url().should("not.include", "/inventory.html");
      cy.url().should("include", "index.html");
      LoginPage.verifyLoginFormIsVisible();
    });
  });
});
