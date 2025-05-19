
require("dotenv").config();
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    env: {
      standardUsername: process.env.STANDARD_USER_USERNAME,
      standardPassword: process.env.STANDARD_USER_PASSWORD,
      problemUsername: process.env.PROBLEM_USER_USERNAME,
      problemPassword: process.env.PROBLEM_USER_PASSWORD,
      specPattern: "cypress/e2e/pro/*.cy.{js,jsx,ts,tsx}",
    },
    setupNodeEvents(on, config) {
    },
  },
  reporter: "mochawesome",
  reporterOptions: {
    charts: true,
    reportDir: "cypress/reports/mochawesome", 
    overwrite: false, 
    html: false, 
    json: true, 
  },
});
