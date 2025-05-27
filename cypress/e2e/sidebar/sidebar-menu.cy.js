import SidebarMenuPage from "../../support/page-objects/sidebar-menu.page";
import HeaderComponentPage from "../../support/page-objects/header-component.page";
import InventoryPage from "../../support/page-objects/inventory.page";
import LoginPage from "../../support/page-objects/login.page";

describe("Sidebar Menu Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });
  describe("Sidebar Visibility and Basic Interaction", () => {
    beforeEach(() => {
      HeaderComponentPage.clickSidebarOpenButton();
    });
    it("[SB-UI-001] should open the sidebar menu when the menu button is clicked", () => {
      SidebarMenuPage.verifySidebarIsVisible();
    });

    it("[SB-UI-002] should display all sidebar menu options when open", () => {
      SidebarMenuPage.verifyAllSidebarMenuOptionsAreVisible();
    });

    it('[SB-UI-003] should close the sidebar menu when the "X" (close) icon is clicked', () => {
      SidebarMenuPage.verifySidebarClosed();
    });
  });

  describe("Sidebar Navigation Links", () => {
    describe('"All Items" Link', () => {
      beforeEach(() => {
        HeaderComponentPage.clickSidebarOpenButton();
        SidebarMenuPage.clickAllItemsLink();
      });

      it('[SB-UI-NAV-001] should navigate to the product listing page URL when "All Items" is clicked', () => {
        cy.url().should("include", "inventory.html");
      });

      it('[SB-UI-002] should display products on the product listing page after navigating via "All Items"', () => {
        InventoryPage.verifyProductCount(6);
      });
    });

    describe('"About" Link', () => {
      beforeEach(() => {
        HeaderComponentPage.clickSidebarOpenButton();
      });
      it('[SB-UI-001] should ensure the "About" sidebar link has the correct href attribute', () => {
        SidebarMenuPage.verifyAboutLinkUrlIsCorrect();
      });

      it('[SB-API-002] should verify the "About" link URL is accessible and returns a 200 status', () => {
        SidebarMenuPage.verifyAboutLinkIsReachable();
      });
    });

    describe('"Logout" Link', () => {
      beforeEach(() => {
        HeaderComponentPage.clickSidebarOpenButton();
        SidebarMenuPage.clickLogoutLink();
      });

      it('[SB-UI-001] should navigate to the login page URL when "Logout" is clicked', () => {
        cy.url().should("include", "https://www.saucedemo.com/");
      });

      it('[SB-UI-002] should display the login form after "Logout" is clicked', () => {
        LoginPage.verifyLoginFormIsVisible();
      });
    });
  });

  describe("Sidebar Action Links", () => {
    describe('"Reset App State" Link', () => {
      beforeEach(() => {
        InventoryPage.addProductToCart("Sauce Labs Backpack");
        HeaderComponentPage.verifyCartItemCount(1);
        HeaderComponentPage.clickSidebarOpenButton();
        SidebarMenuPage.clickResetLink();
      });

      it('[SB-UI-001] should clear the cart immediately after "Reset App State" is clicked', () => {
        HeaderComponentPage.verifyCartIsEmpty();
      });

      it('[SB-UI-002] should ensure the cart remains empty after "Reset App State" and a page reload', () => {
        HeaderComponentPage.verifyCartIsEmpty();
        cy.reload();
        HeaderComponentPage.verifyCartIsEmpty();
      });
    });
  });
});
