import InventoryPage from "../../support/pageObjects/inventory.page";
import HeaderComponentPage from "../../support/pageObjects/headerComponent.page";
import FooterComponentPage from "../../support/pageObjects/footerComponent.page";
describe("Inventory Page - Post-Login Verification", () => {
  const allProductNames = 6;
  const allProductPrices = 6;
  const allProductCount = 6;
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("[INV-UI-NAV-001] should confirm successful login by verifying URL and page title", () => {
    cy.url().should("include", "inventory.html");
    cy.title().should("eq", "Swag Labs");
  });

  describe("Header Component Verification", () => {
    it("[INV-UI-HEAD-001] should display product header", () => {
      HeaderComponentPage.verifyProductHeaderIsVisible();
    });
    it("[INV-UI-HEAD-002] should display hamburger menu button", () => {
      HeaderComponentPage.verifyHamburgerMenuButtonIsVisible();
    });
    it("[INV-UI-HEAD-003] should display shopping cart icon", () => {
      HeaderComponentPage.verifyShoppingCartIconIsVisible;
    });
  });
  describe("Inventory Items Verification", () => {
    it("[INV-UI-INV-COUNT-001] should display the correct number of products", () => {
      InventoryPage.verifyProductCount(allProductCount);
    });

    it("[INV-UI-INV-NAMES-002] should display names for all products", () => {
      InventoryPage.verifyProductNames(allProductNames);
    });

    it("[INV-UI-INV-PRICES-003] should display prices for all products", () => {
      InventoryPage.verifyProductPrices(allProductPrices);
    });
  });

  describe("Footer Component Verification", () => {
    it("[INV-UI-FOOT-SOCIAL-001] should display footer social media images", () => {
      FooterComponentPage.veryFooterSocialSitesImagesAreVisible();
    });

    it("[INV-UI-FOOT-ROBOT-002] should display the footer robot image", () => {
      FooterComponentPage.verifyFooterRobotImageIsVisible();
    });

    it("[INV-UI-FOOT-COPY-003] should display the footer copyright text", () => {
      FooterComponentPage.verifyFooterCopyRightTextIsVisible();
    });
  });
});
describe("Inventory Page - Responsive Layout Verification", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.url().should("include", "inventory.html");
  });
  it("[INV-UI-DESKTOP-001] should display correct layout on Desktop viewport (1280x720)", () => {
    cy.log("--- Testing on Desktop (1280x720) ---");
    cy.viewport(1280, 720);
    cy.title().should("eq", "Swag Labs");
    HeaderComponentPage.verifyHeaderElementsAreVisible();
    InventoryPage.verifyLayoutElementsAreVisible();
  });

  it("[INV-UI-MOBILE-002] should display correct layout on Mobile viewport (375x667)", () => {
    cy.log("--- Testing on Mobile (375x667) ---");
    cy.viewport(375, 667);
    cy.title().should("eq", "Swag Labs");
    HeaderComponentPage.verifyHeaderElementsAreVisible();
    InventoryPage.verifyLayoutElementsAreVisible();
  });

  it("[INV-UI-TABLET-LANDSCAPE-003] should display correct layout on Tablet landscape viewport (1024x768)", () => {
    cy.log("--- Testing on Tablet landscape mode (1024x768) ---");
    cy.viewport(1024, 768);
    cy.title().should("eq", "Swag Labs");
    HeaderComponentPage.verifyHeaderElementsAreVisible();
    InventoryPage.verifyLayoutElementsAreVisible();
  });
});
