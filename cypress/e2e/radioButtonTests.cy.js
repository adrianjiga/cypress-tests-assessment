describe('Radio Buttons Suite', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (_err, _runnable) => {
      return false;
    });
    cy.visit('/radio-button');
    cy.get('h1').should('contain', 'Radio Button');
  });

  it('select Yes and verify the result', () => {
    cy.get('label[for="yesRadio"]').click();
    cy.get('#yesRadio').should('be.checked');
    cy.get('.text-success')
      .should('have.text', 'Yes')
      .and('be.visible')
      .and('have.css', 'color', 'rgb(40, 167, 69)');
    cy.get('#impressiveRadio').should('not.be.checked');
    cy.get('#noRadio').should('not.be.checked');
  });

  it('select Impressive and verify the result', () => {
    cy.get('label[for="impressiveRadio"]').click();
    cy.get('#impressiveRadio').should('be.checked');
    cy.get('.text-success')
      .should('have.text', 'Impressive')
      .and('be.visible')
      .and('have.css', 'color', 'rgb(40, 167, 69)');
    cy.get('#yesRadio').should('not.be.checked');
    cy.get('#noRadio').should('not.be.checked');
  });
});
