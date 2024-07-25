describe('Web Tables Suite', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (_err, _runnable) => {
      return false;
    });
    cy.visit('/webtables');
  });

  it('search for a record and verify the result', () => {
    const searchTerm = 'Cierra';

    cy.get('#searchBox').type(searchTerm).should('have.value', searchTerm);

    cy.contains('.rt-tbody div[role="row"]', searchTerm)
      .not('.-padRow')
      .should('be.visible');

    cy.get('.rt-tbody div[role="row"]')
      .not('.-padRow')
      .should('have.length', 1);

    cy.get('#searchBox').clear().should('have.value', '');
    cy.get('.rt-tbody div[role="row"]')
      .not('.-padRow')
      .should('not.have.length.below', 2);
  });
});
