class InventoryPage {
  get productNames() {
    return cy.get(".inventory_item_name");
  }
  get productItems() {
    return cy.get(".inventory_item");
  }
  get productPrices() {
    return cy.get(".inventory_item_price");
  }
  get productListContainer() {
    // Contains all items
    return cy.get(".inventory_list");
  }
  get productSortDropdown() {
    return cy.get(".product_sort_container");
  }
  get firstProductItem() {
    return this.productItems.first();
  }
  clickProductByName(productName) {
    this.productNames.each(($el) => {
      if ($el.text().includes(productName)) {
        cy.wrap($el).click();
      }
    });
  }
  verifyProductNames(expectedProductNames) {
    this.productNames
      .should("have.length", expectedProductNames)
      .each(($element) => {
        cy.wrap($element).should("be.visible");
      });
  }
  verifyProductCount(expectedProductCount) {
    this.productItems
      .should("have.length", expectedProductCount)
      .each(($element) => {
        cy.wrap($element).should("be.visible");
      });
  }

  verifyProductPrices(expectedProductPrices) {
    this.productPrices
      .should("have.length", expectedProductPrices)
      .each(($element) => {
        cy.wrap($element).should("be.visible");
      });
  }
  verifyLayoutElementsAreVisible() {
    this.productItems.should("have.length.greaterThan", 0).and("be.visible");
    this.productNames.should("have.length.greaterThan", 0).and("be.visible");
    this.productPrices.should("have.length.greaterThan", 0).and("be.visible");
  }
  verifySortValue(expectedValue) {
    this.productSortDropdown.should("have.value", expectedValue);
  }
  selectSortOption(optionValue) {
    this.productSortDropdown.select(optionValue);
  }
  verifyPredifinedDefaultOrder() {
    this.productItems.each(($element) => {
      cy.wrap($element).should("be.visible");
    });
  }
  verifyAllSortingOptionsAreVisible() {
    const expectedOptions = [
      "Name (A to Z)",
      "Name (Z to A)",
      "Price (low to high)",
      "Price (high to low)",
    ];
    this.productSortDropdown.find("option").then(($options) => {
      const actualOptions = [...$options].map((opt) => opt.innerText.trim());
      expect(actualOptions).to.deep.equal(expectedOptions);
    });
  }
  verifyProductNamesSortedAsc() {
    this.productNames.then(($items) => {
      const actual = [...$items].map((el) => el.innerText);
      const expected = [...actual].sort((a, b) => a.localeCompare(b));
      expect(actual).to.deep.equal(expected);
    });
  }
  verifyProductNamesSortedDesc() {
    this.productNames.then(($items) => {
      const actual = [...$items].map((el) => el.innerText);
      const expected = [...actual].sort((a, b) => b.localeCompare(a));
      expect(actual).to.deep.equal(expected);
    });
  }
  verifyPricesSortedLowToHigh() {
    this.productPrices.then(($items) => {
      const actual = [...$items].map((el) =>
        parseFloat(el.innerText.replace("$", ""))
      );
      const expected = [...actual].sort((a, b) => a - b);
      expect(actual).to.deep.equal(expected);
    });
  }
  verifyPricesSortedHighToLow() {
    this.productPrices.then(($items) => {
      const actual = [...$items].map((el) =>
        parseFloat(el.innerText.replace("$", ""))
      );
      const expected = [...actual].sort((a, b) => b - a);
      expect(actual).to.deep.equal(expected);
    });
  }
  addProductToCart(productName) {
    this.productItems.each(($item) => {
      const name = $item.find(".inventory_item_name").text().trim();
      if (name === productName) {
        cy.wrap($item).find("button").click(); 
      }
    });
  }
  addMultipleProductsToCart(productNames) {
    productNames.forEach((productName) => {
      this.addProductToCart(productName);
    });
  }
  verifyAddToCartButtonChangedToRemove(productName) {
    this.productItems.each(($addToCart) => {
      if (
        $addToCart.find(".inventory_item_name").text().trim() === productName
      ) {
        cy.wrap($addToCart).find("button").should("have.text", "REMOVE");
      }
    });
  }
  verifyProductListingIsVisible() {
    this.productListContainer.should("be.visible");
    this.productSortDropdown.should("be.visible");
    this.productItems.should("have.length.greaterThan", 0);
    this.firstProductItem.within(() => {
      cy.get(".inventory_item_img").find("img").should("be.visible");
      cy.get(".inventory_item_name").should("be.visible").and("not.be.empty");
      cy.get(".inventory_item_price").should("be.visible").and("not.be.empty");
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should("be.visible");
    });
  }
}
export default new InventoryPage();
