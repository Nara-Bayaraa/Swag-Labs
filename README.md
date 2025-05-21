# Swag-Labs-Project 

# Swag Labs UI Testing 💻

## Project Overview

This project automates UI testing for the Swag Labs web application using Cypress. The tests validate core e-commerce flows such as login, product listing, sorting, cart management, checkout, and order confirmation to ensure a reliable and seamless user experience.

## Project Structure

```
cypress/
  e2e/
    login/
      negative-login.cy.js
      positive-login.cy.js
    products/
      cart.cy.js
      checkout.cy.js
      checkoutComplete.cy.js
      inventory.cy.js
      inventorySort.cy.js
      overview.cy.js
      productDetail.cy.js
      sidebarMenu.cy.js
  fixtures/                  # Static test data
  reports/                   # Generated Mochawesome reports
  support/
    pageObjects/            # Page Object Model files
    commands.js             # Custom Cypress commands
    constants.js            # Constants for selectors and strings
    e2e.js                  # Common test utilities
    fakerData.js            # Faker-based test data generation
.env                        # Environment variable definitions
```

## Key Features

* Cypress test automation with Page Object Model (POM)
* Positive and negative login scenarios
* Product sorting and detail validations
* Add to cart, cart content checks, and state reset
* Full checkout process: form fill, overview, and confirmation
* Parallel test execution using `cypress-parallel`
* HTML reporting with Mochawesome
* GitHub Actions CI workflow with job-level test separation

## Tech Stack

* JavaScript (CommonJS)
* Cypress ^14.1.0
* Mochawesome ^7.1.3
* Marge ^1.0.1
* dotenv ^16.4.7
* @faker-js/faker ^9.8.0
* GitHub Actions

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/swag-labs-ui-testing.git
cd swag-labs-ui-testing
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run Tests

Run all tests:

```bash
npm run cy:run
```

Run tests in UI:

```bash
npm run cy:open
```

Run specific suites:

```bash
npm run test:Login
npm run test:Products
npm run test:Checkout
```

Run in parallel:

```bash
npm run cy:parallel:products
npm run cy:parallel:login
```

### 4. Generate Test Report

```bash
npm run merge:reports
npm run generate:report
```

Serve the HTML report:

```bash
npx serve cypress/reports/html
```

## Available NPM Scripts

```json
"scripts": {
  "test:Login": "cypress run --spec cypress/e2e/login/*.cy.js --browser chrome",
  "test:Products": "cypress run --spec cypress/e2e/products/cart.cy.js --browser chrome",
  "test:LoginPositive": "cypress run --spec cypress/e2e/login/positive-login.cy.js --browser chrome",
  "test:LoginNegative": "cypress run --spec cypress/e2e/login/negative-login.cy.js --browser chrome",
  "test:Cart": "cypress run --spec cypress/e2e/products/cart.cy.js --browser chrome",
  "test:Inventory": "cypress run --spec cypress/e2e/products/inventory.cy.js --browser chrome",
  "test:InventorySort": "cypress run --spec cypress/e2e/products/inventorySort.cy.js --browser chrome",
  "test:Overview": "cypress run --spec cypress/e2e/products/overview.cy.js --browser chrome",
  "test:Checkout": "cypress run --spec cypress/e2e/products/checkout.cy.js --browser chrome",
  "test:SidebarMenu": "cypress run --spec cypress/e2e/products/sidebarMenu.cy.js --browser chrome",
  "test:ProductDetail": "cypress run --spec cypress/e2e/products/productDetail.cy.js --browser chrome",
  "cy:open": "cypress open",
  "cy:run": "cypress run --browser chrome",
  "cy:parallel:products": "cypress-parallel -s cy:run -t 8 -d 'cypress/e2e/products/**/*.cy.js' -e '**/*.DS_Store'",
  "cy:parallel:login": "cypress-parallel -s cy:run -t 2 -d 'cypress/e2e/login/**/*.cy.js' -e '**/*.DS_Store'",
  "clean:reports": "rm -rf cypress/reports",
  "pretest": "npm run clean:reports",
  "merge:reports": "mochawesome-merge cypress/reports/mochawesome/*.json > cypress/reports/mochawesome.json",
  "generate:report": "marge cypress/reports/mochawesome/*.json -f report -o cypress/reports/html",
  "test:report": "npm run cy:run || true && npm run merge:reports && npm run generate:report"
}
```

## Continuous Integration

This project uses GitHub Actions with a parallel CI pipeline. Each job runs a different Cypress test group with Node.js setup and dependency installation. Credentials are securely handled via `secrets`.

```yaml
name: Parallel Test Build
on:
  workflow_dispatch:
  pull_request:
    types: [opened, reopened, edited, synchronize]
  push:
    branches: [main]

jobs:
  Login-Test:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout
        uses: actions/checkout@v4.2.0

      - name: Set up Node.js 20.x
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'

      - name: Install dependencies
        run: npm ci

      - name: Cypress run - Login Tests
        uses: cypress-io/github-action@v6
        env:
          STANDARD_USER_USERNAME: ${{ secrets.STANDARD_USER_USERNAME }}
          STANDARD_USER_PASSWORD: ${{ secrets.STANDARD_USER_PASSWORD }}
        with:
          command: npm run test:Login -- -v

  Products-Test:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout
        uses: actions/checkout@v4.2.0

      - name: Set up Node.js 20.x
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'

      - name: Install dependencies
        run: npm ci

      - name: Cypress run - Products Tests
        uses: cypress-io/github-action@v6
        env:
          STANDARD_USER_USERNAME: ${{ secrets.STANDARD_USER_USERNAME }}
          STANDARD_USER_PASSWORD: ${{ secrets.STANDARD_USER_PASSWORD }}
        with:
          command: npm run test:Products -- -v
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add: feature name or fix description"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a pull request for review

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Future Enhancements

* Add visual regression and accessibility tests
* Add more negative and edge case scenarios
* Integrate with Cypress Dashboard
* Run tests across multiple browsers

---

Happy testing ✨

