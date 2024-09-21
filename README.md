# Cypress End-to-End Test Suite

## Setup

### Prerequisites

- Node.js
- NPM
- Git (to clone the repository)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/adrianjiga/cypress-tests-assessment
   cd cypress-tests-assessment
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Open Cypress:
   ```sh
   npx cypress open
   ```

## Running Tests

You can run the tests via the command line:

```sh
npx cypress run
```

You can run the tests using the command line on Google Chrome browser by running:

```sh
npm run test:chrome
```

## Selector Issues Encountered

A major problem is the absence of `data-*` attributes on the [demoqa.com](https://demoqa.com) website. These attributes help isolate selectors from CSS and JavaScript changes.

For example, instead of using `cy.get('.react-datepicker__month-select')`, it would be more robust to use `cy.get('[data-cy="date-picker-month-select"]')` if `data-*` attributes were available.

Essentially, every selector can be improved by adding `data-*` attributes, making tests more stable and less prone to breaking due to UI changes.

This is the first thing recommended in the [Best Practices](https://docs.cypress.io/guides/references/best-practices) page in Cypress documentation.

## App Issues Encountered

Another issue I encountered is a persistent console error on every page of the [demoqa.com](https://demoqa.com) website. This caused all of the tests to fail since Cypress stops if there are any errors in the application.

A workaround I found was to add this code:

```javascript
cy.on('uncaught:exception', (_err, _runnable) => {
  return false;
});
```

This code should be added in the `beforeEach` method before visiting the URL for each test.

Although the documentation suggests placing it in the support file since it loads before any test files, this approach didn't work for me as the error occurred every time a page was opened, not just initially.
