describe('Tool Tips Suite', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (_err, _runnable) => {
      return false;
    });
    cy.visit('/tool-tips');
  });

  it('tooltip on button hover', () => {
    cy.get('#toolTipButton').trigger('mouseover');
    cy.get('#buttonToolTip')
      .should('be.visible')
      .within(() => {
        cy.get('.tooltip-inner')
          .should('be.visible')
          .and('have.text', 'You hovered over the Button');
      });

    cy.get('#toolTipButton').trigger('mouseout');
    cy.get('#buttonToolTip').should('not.exist');
  });

  it('tooltips on text field and text hover', () => {
    //text field tooltip
    cy.get('#toolTipTextField').trigger('mouseover');
    cy.get('#textFieldToolTip')
      .should('be.visible')
      .within(() => {
        cy.get('.tooltip-inner')
          .should('be.visible')
          .and('have.text', 'You hovered over the text field');
      });

    cy.get('#toolTipTextField').trigger('mouseout');
    cy.get('#textFieldToolTip').should('not.exist');

    //text tooltip
    cy.contains('Contrary').trigger('mouseover');
    cy.get('#contraryTexToolTip')
      .should('be.visible')
      .within(() => {
        cy.get('.tooltip-inner')
          .should('be.visible')
          .and('have.text', 'You hovered over the Contrary');
      });

    cy.contains('Contrary').trigger('mouseout');
    cy.get('#contraryTexToolTip').should('not.exist');
  });
});
