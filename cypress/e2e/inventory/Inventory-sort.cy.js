import { SortOptions } from "../../support/constants";
import InventoryPage from "../../support/page-objects/inventory.page";

describe("Inventory Page: Sorting Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });
  describe("Initial State and Sort Options Visibility", () => {
    it("[SRT-001] Should display products in the default sorting order on initial load", () => {
      InventoryPage.verifyPredifinedDefaultOrder();
    });

    it("[SRT-002] Should display all sorting options in the sort dropdown", () => {
      InventoryPage.verifyAllSortingOptionsAreVisible();
    });
  });

  describe("Sorting by Name (A to Z)", () => {
    it("[SRT-AZ-001] Should update sort dropdown to 'Name (A to Z)' when selected", () => {
      InventoryPage.selectSortOption(SortOptions.NAME_ASC);
      InventoryPage.verifySortValue("az");
    });

    it("[SRT-AZ-002] Should sort products by name in ascending order (A to Z)", () => {
      InventoryPage.selectSortOption(SortOptions.NAME_ASC);
      InventoryPage.verifyProductNamesSortedAsc();
    });
  });

  describe("Sorting by Name (Z to A)", () => {
    it("[SRT-ZA-001] Should update sort dropdown to 'Name (Z to A)' when selected", () => {
      InventoryPage.selectSortOption(SortOptions.NAME_DESC);
      InventoryPage.verifySortValue("za");
    });

    it("[SRT-ZA-002] Should sort products by name in descending order (Z to A)", () => {
      InventoryPage.selectSortOption(SortOptions.NAME_DESC);
      InventoryPage.verifyProductNamesSortedDesc();
    });
  });

  describe("Sorting by Price (low to high)", () => {
    it("[SRT-LOHI-001] Should update sort dropdown to 'Price (low to high)' when selected", () => {
      InventoryPage.selectSortOption(SortOptions.PRICE_LOW_TO_HIGH);
      InventoryPage.verifySortValue("lohi");
    });

    it("[SRT-LOHI-002] Should sort products by price in ascending order (low", () => {
      InventoryPage.selectSortOption(SortOptions.PRICE_LOW_TO_HIGH);
      InventoryPage.verifyPricesSortedLowToHigh();
    });
  });

  describe("Sorting by Price (high to low)", () => {
    it("[SRT-HILO-001] Should update sort dropdown to 'Price (high to low)' when selected", () => {
      InventoryPage.selectSortOption(SortOptions.PRICE_HIGH_TO_LOW);
      InventoryPage.verifySortValue("hilo");
    });

    it("[SRT-HILO-002] Should sort products by price in descending order (high to low)", () => {
      InventoryPage.selectSortOption(SortOptions.PRICE_HIGH_TO_LOW);
      InventoryPage.verifyPricesSortedHighToLow();
    });
  });
});
