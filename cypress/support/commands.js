import LoginPage from './page-objects/login.page.js';
import InventoryPage from '../support/page-objects/inventory.page';
import HeaderComponentPage from '../support/page-objects/header-component.page.js';
import CartPage from '../support/page-objects/cart.page';
import CheckoutPage from './page-objects/checkout.page.js';


Cypress.Commands.add('login',()=> {
  LoginPage.login(Cypress.env("standardUsername"), Cypress.env("standardPassword"));
})
Cypress.Commands.add('clear_npm_cache', () => {
    cy.exec('npm cache clean --force', { timeout: 60000 }); 
  });
  
Cypress.Commands.add('forceClick', {prevSubject: 'element'}, (subject, options) => {
  cy.wrap(subject).click({force: true})
});

Cypress.Commands.add('startCheckoutWithSingleProduct', (productName) => {
  cy.log(`Adding product: ${productName} to cart and starting checkout`);
  InventoryPage.addProductToCart(productName);
  HeaderComponentPage.clickGoToCart();
  CartPage.clickCheckoutButton();
});

Cypress.Commands.add('startCheckoutWithMultipleProducts', (productNames) => {
  cy.log(`Adding product: ${productNames} to cart and starting checkout`);
  InventoryPage.addMultipleProductsToCart(productNames);
  HeaderComponentPage.clickGoToCart();
  CartPage.clickCheckoutButton();
});


Cypress.Commands.add('fillCheckoutFormAndContinue', (firstName, lastName, zipCode) => {
  CheckoutPage.fillPersonalDetails(firstName, lastName, zipCode);
  CheckoutPage.clickContinueButton();
});

Cypress.Commands.add('addMultipleItemsToCart', (productNames) => {
  productNames.forEach((productName) => {
    cy.get('.inventory_item').each(($item) => {
      const name = $item.find('.inventory_item_name').text().trim();
      if (name === productName) {
        cy.wrap($item).find('button').click();
      }
    });
  });
});
import './commands';


