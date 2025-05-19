import LoginPage from './pageObjects/login.page.js'; // Corrected path with quotes
import InventoryPage from '../support/pageObjects/inventory.page';
import HeaderComponentPage from '../support/pageObjects/headerComponent.page';
import CartPage from '../support/pageObjects/cart.page';
import CheckoutPage from './pageObjects/checkout.page.js';


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


import './commands';


