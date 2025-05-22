import LoginPage from "../../support/pageObjects/login.page";

describe("Logout Functionality", () => {
    beforeEach(() => {
        cy.visit('/')
      LoginPage.login(
        Cypress.env("standardUsername"),
        Cypress.env("standardPassword")
      );
      cy.url().should("include", "/inventory.html");
    });

    it("[LOGIN-FUNC-POS-001] should allow a logged-in user to logout successfully and return to the login page", () => {
      LoginPage.logout();
      cy.url().should("not.include", "/inventory.html");
      cy.url().should("include", "https://www.saucedemo.com/");
      LoginPage.verifyLoginFormIsVisible();
    });
  });