import { SortOptions } from "../../support/constants";
import InventoryPage from "../../support/pageObjects/inventory.page";

describe("Inventory Page - Sorting Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });
  describe("Initial State and Sort Options Visibility", () => {
    it("[SRT-DEF-001] should verify the default sorting order when the product list is initially loaded", () => {
      InventoryPage.verifyPredifinedDefaultOrder();
    });

    it("[SRT-UI-002] should verify all sorting options are present and visible in the sort dropdown", () => {
      InventoryPage.verifyAllSortingOptionsAreVisible();
    });
  });

  describe("Sorting by Name (A to Z)", () => {
    it("[SRT-UI-AZ-001] should update the sort dropdown UI when 'Name (A to Z)' is selected", () => {
      InventoryPage.selectSortOption(SortOptions.NAME_ASC);
      InventoryPage.verifySortValue("az");
    });

    it("[SRT-FUNC-AZ-002] should correctly sort products by 'Name (A to Z)'", () => {
      InventoryPage.selectSortOption(SortOptions.NAME_ASC);
      InventoryPage.verifyProductNamesSortedAsc();
    });
  });

  describe("Sorting by Name (Z to A)", () => {
    it("[SRT-UI-ZA-001] should update the sort dropdown UI when 'Name (Z to A)' is selected", () => {
      InventoryPage.selectSortOption(SortOptions.NAME_DESC);
      InventoryPage.verifySortValue("za");
    });

    it("[SRT-UI-ZA-002] should correctly sort products by 'Name (Z to A)'", () => {
      InventoryPage.selectSortOption(SortOptions.NAME_DESC);
      InventoryPage.verifyProductNamesSortedDesc();
    });
  });

  describe("Sorting by Price (low to high)", () => {
    it("[SRT-UI-LOHI-001] should update the sort dropdown UI when 'Price (low to high)' is selected", () => {
      InventoryPage.selectSortOption(SortOptions.PRICE_LOW_TO_HIGH);
      InventoryPage.verifySortValue("lohi");
    });

    it("[SRT-UI-LOHI-002] should correctly sort products by 'Price (low to high)'", () => {
      InventoryPage.selectSortOption(SortOptions.PRICE_LOW_TO_HIGH);
      InventoryPage.verifyPricesSortedLowToHigh();
    });
  });

  describe("Sorting by Price (high to low)", () => {
    it("[SRT-UI-HILO-001] should update the sort dropdown UI when 'Price (high to low)' is selected", () => {
      InventoryPage.selectSortOption(SortOptions.PRICE_HIGH_TO_LOW);
      InventoryPage.verifySortValue("hilo");
    });

    it("[SRT-UI-HILO-002] should correctly sort products by 'Price (high to low)'", () => {
      InventoryPage.selectSortOption(SortOptions.PRICE_HIGH_TO_LOW);
      InventoryPage.verifyPricesSortedHighToLow();
    });
  });
});
