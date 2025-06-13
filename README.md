---

# 🛒 Swag Labs UI Test Automation

## 💻 Project Overview

This repository contains an end-to-end UI automation suite for the [Swag Labs](https://www.saucedemo.com/) e-commerce web application, built with **Cypress** and the **Page Object Model (POM)** design pattern.
The suite validates critical e-commerce workflows—login, product listing, cart management, checkout, and order confirmation—ensuring a robust, user-friendly shopping experience.

* **Purpose:** Demonstrate best practices in scalable, maintainable UI test automation with modern JavaScript tooling.
---

## ✨ Key Features

* **Cypress E2E Automation:** Fast, reliable UI testing.
* **Page Object Model:** Modular, DRY, and scalable codebase.
* **Robust Test Coverage:** Positive & negative login, product sorting, cart, checkout, and order flows.
* **Parallel Test Execution:** Faster feedback using `cypress-parallel`.
* **Automated CI:** GitHub Actions runs tests daily at 5:00 AM CST.
* **Clear Reporting:** HTML reports via Mochawesome for easy results sharing.
* **Easy Data Management:** Uses Faker.js for dynamic user and test data.

---

## 🕒 Automated CI Schedule

The test suite runs automatically every day at **5:00 AM CST** via a scheduled GitHub Actions workflow.

```yaml
schedule:
    - cron: '0 11 * * *'   # 5:00 AM Chicago time
```

* **Nightly Runs:** Keeps test health and project quality in check—no manual intervention needed.
* **Results:** Reports are accessible in the GitHub Actions workflow logs and as downloadable artifacts.

---

## 📂 Project Structure

<details>
<summary>Expand to view folder structure</summary>

```
cypress/
├── e2e/                     # E2E test suites
│   ├── cart/                # Cart tests
│   ├── checkout/            # Checkout tests
│   ├── inventory/           # Inventory/product listing tests
│   ├── login/               # Login/auth tests
│   ├── product/             # Product detail tests
│   └── sidebar/             # Sidebar/navigation tests
├── fixtures/                # Test data (e.g. JSON)
├── reports/                 # Mochawesome HTML reports
├── screenshots/             # Failure screenshots
└── support/
    ├── helpers/
    │   └── generate-user-data.js   # Faker.js utilities
    ├── page-objects/               # Page Object files
    ├── commands.js                 # Custom Cypress commands
    ├── constants.js                # Reusable constants
    └── e2e.js                      # Common configs/utilities
```

</details>

---

## 🛠️ Tech Stack

* **JavaScript**, **Node.js**
* [Cypress](https://docs.cypress.io/) ^14.1.0
* [Mochawesome](https://github.com/adamgruber/mochawesome) ^7.1.3
* [Marge](https://github.com/marcomontalbano/marge) ^1.0.1
* [dotenv](https://www.npmjs.com/package/dotenv) ^16.4.7
* [@faker-js/faker](https://fakerjs.dev/) ^9.8.0
* [cypress-parallel](https://www.npmjs.com/package/cypress-parallel) ^0.15.0
* **GitHub Actions** for CI/CD

---

## ⚙️ Getting Started

#### 1. Clone the repository

```bash
git clone https://github.com/Nara-Bayaraa/Swag-Labs.git
cd Swag-Labs
```

#### 2. Install dependencies

```bash
npm install
```

---

## 🧪 Running Tests

**Run all tests (headless):**

```bash
npm run cy:run
```

**Run tests in Cypress GUI:**

```bash
npm run cy:open
```

**Run individual suites:**

```bash
npm run test:login
npm run test:cart
npm run test:inventory
npm run test:product
npm run test:checkout
npm run test:sidebar
```

**Run all tests in parallel (recommended for CI or multi-core):**

```bash
npm run cy:parallel
```

---

## 📊 Generating Test Reports

After running tests, generate and view reports:

```bash
npm run merge:reports
npm run generate:report
npx serve reports/html
```

---

## 🤖 Continuous Integration

**Fully automated with [GitHub Actions](https://github.com/features/actions):**

* Triggers on every push, PR, and on a daily schedule.
* Installs dependencies, runs Cypress tests in parallel, and uploads HTML reports as artifacts.

<details>
<summary>View sample CI workflow YAML</summary>

```yaml
name: Parallel Test Build

on:
  schedule:
    - cron: '0 11 * * *'   # 5:00 AM CST
  workflow_dispatch:
  pull_request:
    types: [opened, reopened, edited, synchronize]
  push:
    branches: [main]

jobs:
  cypress-parallel-e2e:
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v4.2.0
      - uses: actions/setup-node@v4
        with:
          node-version: '20.x'
      - uses: actions/cache@v4
        with:
          path: ~/.npm
          key: ${{ runner.os }}-npm-cache-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-npm-cache-
      - run: npm ci
      - name: Run Cypress E2E tests in parallel
        env:
          STANDARD_USER_USERNAME: ${{ secrets.STANDARD_USER_USERNAME }}
          STANDARD_USER_PASSWORD: ${{ secrets.STANDARD_USER_PASSWORD }}
        run: npm run cy:parallel
```

</details>

---

## 📝 Contributing

1. **Fork** the repository
2. **Create a branch:** `git checkout -b feature/your-feature`
3. **Commit changes:** `git commit -m "Add: your feature or fix"`
4. **Push to your branch:** `git push origin feature/your-feature`
5. **Open a Pull Request** for review

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

## 💡 Roadmap / Future Enhancements

* Broaden negative and edge case scenario coverage
* Cross-browser testing support
* Expand to cover additional user journeys

---

**Happy Testing! 🚀**

---
