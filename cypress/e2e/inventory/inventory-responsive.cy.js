import InventoryPage from "../../support/page-objects/inventory.page";
import HeaderComponentPage from "../../support/page-objects/header-component.page";

describe("Inventory Page: Responsive Layout Verification", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.url().should("include", "inventory.html");
  });

  it("[INV-UI-DESKTOP-001] Should display correct layout on desktop viewport (1280x720)", () => {
    cy.log("--- Testing on Desktop (1280x720) ---");
    cy.viewport(1280, 720);
    cy.title().should("eq", "Swag Labs");
    HeaderComponentPage.verifyHeaderElementsAreVisible();
    InventoryPage.verifyLayoutElementsAreVisible();
  });

  it("[INV-UI-MOBILE-002] Should display correct layout on mobile viewport (375x667)", () => {
    cy.log("--- Testing on Mobile (375x667) ---");
    cy.viewport(375, 667);
    cy.title().should("eq", "Swag Labs");
    HeaderComponentPage.verifyHeaderElementsAreVisible();
    InventoryPage.verifyLayoutElementsAreVisible();
  });

  it("[INV-TABLET-LANDSCAPE-003] Should display correct layout on tablet landscape viewport (1024x768)", () => {
    cy.log("--- Testing on Tablet landscape mode (1024x768) ---");
    cy.viewport(1024, 768);
    cy.title().should("eq", "Swag Labs");
    HeaderComponentPage.verifyHeaderElementsAreVisible();
    InventoryPage.verifyLayoutElementsAreVisible();
  });
});
