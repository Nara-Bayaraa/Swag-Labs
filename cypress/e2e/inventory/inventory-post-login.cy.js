import InventoryPage from "../../support/page-objects/inventory.page";
import HeaderComponentPage from "../../support/page-objects/header-component.page";
import FooterComponentPage from "../../support/page-objects/footer-component.page";

describe("Inventory Page: Post-Login Verification", () => {
  const allProductNames = 6;
  const allProductPrices = 6;
  const allProductCount = 6;
  beforeEach(() => {
    cy.visit("/");
    cy.login();
      cy.scrollTo('bottom');
  });

  it("[INV-NAV-001] Should confirm successful login by verifying URL and page title", () => {
    cy.url().should("include", "inventory.html");
    cy.title().should("eq", "Swag Labs");
  });

  describe("Header Component Verification", () => {
    it("[INV-HEAD-001] Should display the product header", () => {
      HeaderComponentPage.verifyProductHeaderIsVisible();
    });
    it("[INV-HEAD-002] Should display the hamburger menu button", () => {
      HeaderComponentPage.verifyHamburgerMenuButtonIsVisible();
    });
    it("[INV-UI-HEAD-003] Should display the shopping cart icon", () => {
      HeaderComponentPage.verifyShoppingCartIconIsVisible();
    });
  });
  describe("Inventory Items Verification", () => {
    it("[INV-COUNT-001] Should display the correct number of products", () => {
      InventoryPage.verifyProductCount(allProductCount);
    });

    it("[INV-NAMES-002] Should display names for all products", () => {
      InventoryPage.verifyProductNames(allProductNames);
    });

    it("[INV-PRICES-003] Should display prices for all products", () => {
      InventoryPage.verifyProductPrices(allProductPrices);
    });
  });

  describe("Footer Component Verification", () => {
  
    it("[INV-FOOT-SOCIAL-001] Should display footer social media icons/images", () => {
      FooterComponentPage.veryFooterSocialSitesImagesAreVisible();
    });

    it("[INV-FOOT-COPY-002] Should display the footer copyright text", () => {
      FooterComponentPage.verifyFooterCopyRightTextIsVisible();
    });
  });
});

