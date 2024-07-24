describe('Date Picker widget Suite', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (_err, _runnable) => {
      return false;
    });
    cy.visit('/date-picker');
    cy.get('h1').should('contain', 'Date Picker');
  });

  it('select a date from the future', () => {
    let date = new Date();
    date.setDate(date.getDate() + 5);

    const formattedDate = date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });

    cy.get('#datePickerMonthYearInput')
      .should('be.visible')
      .and('be.enabled')
      .clear()
      .type(`${formattedDate}{enter}`);

    cy.get('#datePickerMonthYearInput').should('have.value', formattedDate);

    cy.get('#datePickerMonthYearInput').click();

    cy.get('.react-datepicker__month-select').should(
      'have.value',
      `${date.getMonth()}`
    );
    cy.get('.react-datepicker__year-select').should(
      'have.value',
      `${date.getFullYear()}`
    );
    cy.get('.react-datepicker__day--selected').should(
      'contain',
      `${date.getDate()}`
    );
  });

  it('leap years and rollover date', () => {
    const leapYearDate = '02/29/2024';
    cy.get('#datePickerMonthYearInput').clear().type(`${leapYearDate}{enter}`);
    cy.get('#datePickerMonthYearInput').should('have.value', leapYearDate);

    const nonLeapYearDate = '02/29/2025';
    cy.get('#datePickerMonthYearInput')
      .clear()
      .type(`${nonLeapYearDate}{enter}`);
    cy.get('#datePickerMonthYearInput').should(
      'not.have.value',
      nonLeapYearDate
    );

    const rolloverDate = '04/31/2025';
    cy.get('#datePickerMonthYearInput').clear().type(`${rolloverDate}{enter}`);
    cy.get('#datePickerMonthYearInput').should('have.value', '05/01/2023');
  });
});
