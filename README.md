---
#  Swag Labs UI Testing 🛒

---

## 💻 Project Overview

This project automates UI testing for the Swag Labs web application using Cypress, incorporating the Page Object Model (POM) to enhance test maintainability and scalability. 
The suite validates crucial e-commerce operations like login, product listing, sorting, cart management, checkout, and order confirmation, aiming to deliver a reliable and seamless user experience.

---

## ✨ Key Features

* Cypress test automation with Page Object Model (POM)
* Positive and negative login scenarios
* Product sorting and detail validations
* Add to cart, cart content checks, and state reset
* Full checkout process: form fill, overview, and confirmation
* **Parallel test execution using `cypress-parallel`**
* HTML reporting with Mochawesome
* GitHub Actions CI workflow with a single parallel job for simplicity

---


## 🕒 Automated CI Schedule

```
schedule:
    - cron: '0 11 * * *'   #run every day at  5:00 AM Chicago time (CST)
```

- **Nightly runs:**  
  This project’s test suite is **automatically triggered every day at 5:00 AM Chicago time (CST)** via a scheduled GitHub Actions workflow.

- **Configuration:**  
  The schedule is managed using this [cron expression](https://crontab.guru/#0_11_*_*_*):

- **Purpose:**  
Purpose:
Automatically checks test health and coverage daily, so you don’t have to run tests manually.
All test results and reports are generated and can be accessed in the GitHub Actions workflow logs and artifacts.

---

##  📂 Project Structure

```
cypress/
├── e2e/                     # Contains all End-to-End test specifications
│   ├── cart/                # Tests related to the shopping cart functionality
│   ├── checkout/            # Tests for the checkout process
│   ├── inventory/           # Tests for product inventory and listing pages
│   ├── login/               # Login and authentication tests
│   ├── product/             # Tests for individual product detail pages
│   └── sidebar/             # Tests for the sidebar navigation menu
├── fixtures/                # Stores static test data (e.g., JSON files) used in tests
├── reports/                 # Output directory for generated Mochawesome test reports 📊
├── screenshots/             # Automatically captures screenshots on test failure 📸
└── support/                 # Reusable custom commands, page objects, and helper functions
    ├── helpers/
    │   └── generate-user-data.js # Utility to generate fake user data using Faker.js
    ├── page-objects/        # Page Object Model (POM) files for different UI sections
    │   ├── cart.page.js
    │   ├── checkout-complete.page.js
    │   ├── checkout-overview.page.js
    │   ├── checkout.page.js
    │   ├── footer-component.page.js
    │   ├── header-component.page.js
    │   ├── inventory.page.js
    │   ├── login.page.js
    │   ├── product-detail.page.js
    │   └── sidebar-menu.page.js
    ├── commands.js          # Defines custom Cypress commands for test reuse (e.g., cy.login())
    ├── constants.js         # Stores global constants like CSS selectors or frequently used strings
    └── e2e.js               # Common test utilities and configurations loaded before test files
```

---


## 🚀 Getting Started

### Prerequisites

* **Node.js** (e.g., LTS version ^18.x or ^20.x recommended - *specify a version or range if important*)
* npm (usually comes with Node.js) or yarn

## 🛠️ Tech Stack

* JavaScript
* **Node.js** (as the runtime environment)
* Cypress ^14.1.0
* Mochawesome ^7.1.3 (for test reporting)
* Marge ^1.0.1 (for merging Mochawesome reports)
* dotenv ^16.4.7 (for environment variable management)
* @faker-js/faker ^9.8.0 (for generating mock data)
* cypress-parallel ^0.15.0 (for parallel test execution)
* GitHub Actions (for CI/CD

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/Nara-Bayaraa/Swag-Labs.git
cd Swag-Labs
```

### 2. Install dependencies

```bash
npm install
```

---

## 🧪 Running Tests

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

---

### 📊 Generate Test Report

After running tests, merge and generate HTML reports:

```bash
npm run merge:reports
npm run generate:report
```

Serve the HTML report locally:

```bash
npx serve reports/html
```

---

## 🤖 Continuous Integration

This project uses GitHub Actions with a parallel CI pipeline.
A single job runs all E2E Cypress tests in parallel using the `cy:parallel` script, speeding up test feedback and reducing maintenance.

### **Workflow Example**

```yaml
name: Parallel Test Build

on:
  schedule:
    - cron: '0 11 * * *'   #run every day at  5:00 AM Chicago time (CST)
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
        env:
          STANDARD_USER_USERNAME: ${{ secrets.STANDARD_USER_USERNAME }}
          STANDARD_USER_PASSWORD: ${{ secrets.STANDARD_USER_PASSWORD }}
        run: npm run cy:parallel
```

---

## 📝  Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add: feature or fix description"`
4. Push to your branch: `git push origin feature-name`
5. Open a Pull Request against the main branch for review.

---

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## 💥 Future Enhancements

* Add more negative and edge case scenarios
* Run tests across multiple browsers
* Expand test coverage (edge cases, user flows)

---

Happy testing 🚀
---
