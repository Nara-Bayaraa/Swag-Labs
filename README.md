# Swag Labs UI Test Automation

End to end UI automation suite for the [Swag Labs](https://www.saucedemo.com/) e-commerce web application, built with Cypress and the Page Object Model design pattern.

The suite validates critical e-commerce workflows including login, product listing, cart management, checkout, and order confirmation, ensuring a robust shopping experience.

## Why this project

I built this framework to demonstrate scalable, maintainable UI test automation with modern JavaScript tooling. It covers the full e-commerce user journey on a real demo application, with parallel execution and nightly CI runs to mirror how production teams actually run their suites.

## Tech stack

| Tool | Version | Purpose |
| --- | --- | --- |
| Cypress | 14.1.0 | E2E browser automation |
| Node.js | 20.x | JavaScript runtime |
| Mochawesome | 7.1.3 | HTML reporting |
| mochawesome-merge | 1.0.1 | Merge parallel reports |
| Faker.js | 9.8.0 | Dynamic test data generation |
| cypress-parallel | 0.15.0 | Parallel test execution |
| dotenv | 16.4.7 | Environment variables |
| GitHub Actions | latest | CI/CD pipeline |

## Skills demonstrated

- End to end UI automation with Cypress
- Page Object Model architecture
- Positive and negative test coverage
- Parallel test execution for faster feedback
- Scheduled CI runs with GitHub Actions
- HTML reporting with Mochawesome
- Dynamic test data generation with Faker.js
- Custom Cypress commands and reusable utilities
- Secrets management with GitHub Actions secrets

## Test coverage

Test suites organized by feature area.

**Login flows.** Standard user login, locked out user, problem user, performance glitch user, invalid credentials.

**Inventory and product flows.** Product listing display, sorting by name and price, product detail page navigation.

**Cart flows.** Add to cart, remove from cart, cart badge count, persistence across pages.

**Checkout flows.** Information form validation, overview page totals, order completion, success page.

**Sidebar and navigation.** Menu open and close, logout, reset app state, about link.

## Project structure

```
cypress/
├── e2e/
│   ├── cart/
│   ├── checkout/
│   ├── inventory/
│   ├── login/
│   ├── product/
│   └── sidebar/
├── fixtures/
├── reports/
├── screenshots/
└── support/
    ├── helpers/
    │   └── generate-user-data.js
    ├── page-objects/
    ├── commands.js
    ├── constants.js
    └── e2e.js
```

## Automated CI schedule

The test suite runs automatically every day at 5:00 AM CST via a scheduled GitHub Actions workflow.

```yaml
schedule:
  - cron: '0 11 * * *'   # 5:00 AM Chicago time
```

Nightly runs catch regressions early without manual intervention. Reports are accessible in the GitHub Actions workflow logs and as downloadable artifacts.

## How to run

**Prerequisites:** Node.js 20 or higher, npm installed.

Clone the repo:

```bash
git clone https://github.com/Nara-Bayaraa/Swag-Labs.git
cd Swag-Labs
```

Install dependencies:

```bash
npm install
```

Run all tests headless:

```bash
npm run cy:run
```

Open Cypress GUI:

```bash
npm run cy:open
```

Run a specific suite:

```bash
npm run test:login
npm run test:cart
npm run test:inventory
npm run test:product
npm run test:checkout
npm run test:sidebar
```

Run all tests in parallel:

```bash
npm run cy:parallel
```

## Reports

After a test run, generate and view the HTML report:

```bash
npm run merge:reports
npm run generate:report
npx serve reports/html
```

| Report | Path |
| --- | --- |
| HTML report | `reports/html/index.html` |
| Failure screenshots | `cypress/screenshots/` |
| Raw JSON results | `reports/.jsons/` |

## Continuous integration

Fully automated with GitHub Actions.

Triggers on every push to main, every pull request, and on a daily schedule. The workflow installs dependencies, runs Cypress tests in parallel, and uploads HTML reports as downloadable artifacts.

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

## Test data management

Test data is generated on the fly using Faker.js through the `generate-user-data.js` helper. Sensitive credentials such as the standard user username and password are stored as GitHub Actions secrets and injected at runtime, never committed to the repo.

## Roadmap

- Broaden negative and edge case scenario coverage
- Add cross browser testing support for Firefox and Edge
- Expand to additional user journeys including account settings and password reset
- Add visual regression testing with Percy or Applitools

## Author

Nara Bayaraa, QA Automation Engineer based in Chicago, IL

- GitHub: https://github.com/Nara-Bayaraa
- LinkedIn: https://linkedin.com/in/Nara-Bayaraa
- Email: narab.qa@gmail.com

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

---

**Happy Testing! 🚀**

---
