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

  it('edit an existing record', () => {
    const newAge = Math.floor(Math.random() * (65 - 18 + 1)) + 18; // random age between 18 and 65
    const newDepartment = 'Engineering';

    cy.get('#edit-record-1').should('be.visible').click();
    cy.get('.modal-content').should('be.visible');

    cy.get('#age')
      .should('be.visible')
      .clear()
      .type(newAge)
      .should('have.value', newAge);
    cy.get('#department')
      .should('be.visible')
      .clear()
      .type(newDepartment)
      .should('have.value', newDepartment);

    cy.get('#submit').click();
    cy.get('.modal-content').should('not.exist');

    cy.contains('.rt-tr-group', 'Cierra').within(() => {
      cy.get('.rt-td').eq(2).should('contain', newAge);
      cy.get('.rt-td').eq(5).should('contain', newDepartment);
    });
  });
});
