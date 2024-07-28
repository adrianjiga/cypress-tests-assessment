import dayjs from 'dayjs';

describe('Date Picker widget Suite', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (_err, _runnable) => {
      return false;
    });
    cy.visit('/date-picker');
    cy.get('h1').should('contain', 'Date Picker');
  });

  it('select a date from the future', () => {
    const date = dayjs().add(5, 'days');
    const futureDate = date.format('MM/DD/YYYY');

    cy.selectDate(futureDate);

    cy.get('#datePickerMonthYearInput').should('have.value', futureDate);

    cy.get('#datePickerMonthYearInput').click();

    cy.get('.react-datepicker__month-select').should(
      'have.value',
      date.format('M') - 1
    );
    cy.get('.react-datepicker__year-select').should(
      'have.value',
      date.format('YYYY')
    );
    cy.get('.react-datepicker__day--selected').should(
      'contain',
      date.format('D')
    );
  });

  it('leap years and rollover date', () => {
    const leapYearDate = '02/29/2024';
    cy.selectDate(leapYearDate);
    cy.get('#datePickerMonthYearInput').should('have.value', leapYearDate);

    const nonLeapYearDate = '02/29/2025';
    cy.selectDate(nonLeapYearDate);
    cy.get('#datePickerMonthYearInput').should(
      'not.have.value',
      nonLeapYearDate
    );

    const rolloverDate = '04/31/2025';
    cy.selectDate(rolloverDate);
    cy.get('#datePickerMonthYearInput').should('have.value', '05/01/2025');
  });
});
