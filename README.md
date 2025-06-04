# Swag Labs UI Testing 💻

## Project Overview

This project automates UI testing for the Swag Labs web application using Cypress.
The tests validate core e-commerce flows such as login, product listing, sorting, cart management, checkout, and order confirmation to ensure a reliable and seamless user experience.

---

## Project Structure

```
cypress/
  e2e/
    cart/
    checkout/
    inventory/
    login/
    product/
    sidebar/
  fixtures/                 # Static test data
  reports/                  # Generated Mochawesome reports
  screenshots/              # Cypress screenshots
  support/
    helpers/
      generate-user-data.js # Faker-based user data generator
    page-objects/           # Page Object Model files
      cart.page.js
      checkout-complete.page.js
      checkout-overview.page.js
      checkout.page.js
      footer-component.page.js
      header-component.page.js
      inventory.page.js
      login.page.js
      product-detail.page.js
      sidebar-menu.page.js
    commands.js             # Custom Cypress commands
    constants.js            # Constants for selectors and strings
e2e.js                     # Common test utilities
```

---

## Key Features

* Cypress test automation with Page Object Model (POM)
* Positive and negative login scenarios
* Product sorting and detail validations
* Add to cart, cart content checks, and state reset
* Full checkout process: form fill, overview, and confirmation
* **Parallel test execution using `cypress-parallel`**
* **Wildcards in npm scripts mean new test files are picked up automatically—no need to change scripts or workflow config when adding more tests!**
* HTML reporting with Mochawesome
* GitHub Actions CI workflow with a single parallel job for simplicity

---

## Tech Stack

* JavaScript (CommonJS)
* Cypress ^14.1.0
* Mochawesome ^7.1.3
* Marge ^1.0.1
* dotenv ^16.4.7
* @faker-js/faker ^9.8.0
* cypress-parallel ^0.15.0
* GitHub Actions

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Nara-Bayaraa/Swag-Labs.git
cd Swag-Labs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run Tests

Run all tests in the terminal:

```bash
npm run cy:run
```

Run tests in the Cypress UI:

```bash
npm run cy:open
```

Run a specific suite (example):

```bash
npm run test:login
npm run test:cart
npm run test:inventory
npm run test:product
npm run test:checkout
npm run test:sidebar
```

Run all E2E tests in parallel (recommended for CI or local multi-core):

```bash
npm run cy:parallel
```

> **Note:**
> Wildcards in the script mean new `.cy.js` test files in `cypress/e2e/` are discovered automatically—no changes needed to scripts!

### 4. Generate Test Report

After running tests, merge and generate HTML reports:

```bash
npm run merge:reports
npm run generate:report
```

Serve the HTML report locally:

```bash
npx serve cypress/reports/html
```

---

## Available NPM Scripts

```json
"scripts": {
  "cy:open": "cypress open",
  "cy:run": "cypress run --browser chrome",
  "test:all": "cypress run --browser chrome",
  "test:login": "cypress run --spec 'cypress/e2e/login/*.cy.js' --browser chrome",
  "test:inventory": "cypress run --spec 'cypress/e2e/inventory/*.cy.js' --browser chrome",
  "test:cart": "cypress run --spec 'cypress/e2e/cart/*.cy.js' --browser chrome",
  "test:product": "cypress run --spec 'cypress/e2e/product/*.cy.js' --browser chrome",
  "test:checkout": "cypress run --spec 'cypress/e2e/checkout/*.cy.js' --browser chrome",
  "test:sidebar": "cypress run --spec 'cypress/e2e/sidebar/*.cy.js' --browser chrome",
  "cy:parallel": "cypress-parallel -s cy:run -t 5 -d 'cypress/e2e/**/*.cy.js' -e '**/*.DS_Store'",
  "cy:parallel:products": "cypress-parallel -s cy:run -t 8 -d 'cypress/e2e/products/**/*.cy.js' -e '**/*.DS_Store'",
  "cy:parallel:login": "cypress-parallel -s cy:run -t 2 -d 'cypress/e2e/login/**/*.cy.js' -e '**/*.DS_Store'",
  "clean:reports": "rm -rf cypress/reports",
  "pretest": "npm run clean:reports",
  "merge:reports": "mochawesome-merge cypress/reports/mochawesome/*.json > cypress/reports/mochawesome.json",
  "generate:report": "marge cypress/reports/mochawesome/*.json -f report -o cypress/reports/html",
  "test:report": "npm run cy:run || true && npm run merge:reports && npm run generate:report"
}
```

---

## Continuous Integration

This project uses GitHub Actions with a parallel CI pipeline.
A single job runs all E2E Cypress tests in parallel using the `cy:parallel` script, speeding up test feedback and reducing maintenance.

### **Workflow Example**

```yaml
name: Parallel Test Build

on:
  workflow_dispatch:
  pull_request:
    types: [opened, reopened, edited, synchronize]
  push:
    branches: [main]

jobs:
  cypress-parallel-e2e:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout
        uses: actions/checkout@v4.2.0

      - name: Set up Node.js 20.x
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'

      - name: Cache npm dependencies
        uses: actions/cache@v4
        with:
          path: ~/.npm
          key: ${{ runner.os }}-npm-cache-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-npm-cache-

      - name: Install dependencies
        run: npm ci

      - name: Run Cypress E2E tests in parallel
        # Wildcards in the npm script mean new test files are picked up automatically—
        # no need to change scripts or workflow config when adding more tests.
        env:
          STANDARD_USER_USERNAME: ${{ secrets.STANDARD_USER_USERNAME }}
          STANDARD_USER_PASSWORD: ${{ secrets.STANDARD_USER_PASSWORD }}
        run: npm run cy:parallel
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add: feature or fix description"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a pull request for review

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Future Enhancements

* Add visual regression and accessibility tests
* Add more negative and edge case scenarios
* Run tests across multiple browsers

---

Happy testing ✨

---

**Let me know if you want this as a markdown file, or want to add badges or more documentation examples!**
