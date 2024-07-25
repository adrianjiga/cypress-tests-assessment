describe('Web Tables Suite', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (_err, _runnable) => {
      return false;
    });
    cy.visit('/webtables');
  });

  it('search for a record', () => {
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

  it('add a new record', () => {
    const adrian = {
      firstName: 'Adrian',
      lastName: 'Jiga',
      email: 'jiga.ion.adrian@gmail.com',
      age: '29',
      salary: '15000',
      department: 'Engineering',
    };

    cy.get('#addNewRecordButton').click();
    cy.get('.modal-content').should('be.visible');
    cy.get('#registration-form-modal').should('contain', 'Registration Form');

    cy.get('#firstName')
      .type(adrian.firstName)
      .should('have.value', adrian.firstName);
    cy.get('#lastName')
      .type(adrian.lastName)
      .should('have.value', adrian.lastName);
    cy.get('#userEmail').type(adrian.email).should('have.value', adrian.email);
    cy.get('#age').type(adrian.age).should('have.value', adrian.age);
    cy.get('#salary').type(adrian.salary).should('have.value', adrian.salary);
    cy.get('#department')
      .type(adrian.department)
      .should('have.value', adrian.department);

    cy.get('#submit').click();
    cy.get('.modal-content').should('not.exist');

    cy.get('.rt-tbody').within(() => {
      cy.contains('.rt-tr-group', adrian.firstName).within(() => {
        cy.get('.rt-td').eq(0).should('contain', adrian.firstName);
        cy.get('.rt-td').eq(1).should('contain', adrian.lastName);
        cy.get('.rt-td').eq(2).should('contain', adrian.age);
        cy.get('.rt-td').eq(3).should('contain', adrian.email);
        cy.get('.rt-td').eq(4).should('contain', adrian.salary);
        cy.get('.rt-td').eq(5).should('contain', adrian.department);
        cy.get('.rt-td').eq(6).find('span[title="Edit"]').should('exist');
        cy.get('.rt-td').eq(6).find('span[title="Delete"]').should('exist');
      });
    });
  });

  it('delete an existing record', () => {
    cy.get('.rt-tbody div[role="row"]')
      .not('.-padRow')
      .then(($rows) => {
        const initialRowCount = $rows.length;

        const secondRecord = {
          firstName: $rows.eq(1).find('div').eq(0).text().trim(),
          lastName: $rows.eq(1).find('div').eq(1).text().trim(),
          age: $rows.eq(1).find('div').eq(2).text().trim(),
          email: $rows.eq(1).find('div').eq(3).text().trim(),
          salary: $rows.eq(1).find('div').eq(4).text().trim(),
          department: $rows.eq(1).find('div').eq(5).text().trim(),
        };

        //delete first record
        cy.get('#delete-record-1').click();
        cy.get('.rt-tbody div[role="row"]')
          .not('.-padRow')
          .should('have.length', initialRowCount - 1);

        //check that the 2nd record moved up to the first row
        cy.get('.rt-tbody div[role="row"]')
          .not('.-padRow')
          .first()
          .within(($firstRow) => {
            cy.wrap($firstRow)
              .find('div')
              .eq(0)
              .should('have.text', secondRecord.firstName);
            cy.wrap($firstRow)
              .find('div')
              .eq(1)
              .should('have.text', secondRecord.lastName);
            cy.wrap($firstRow)
              .find('div')
              .eq(2)
              .should('have.text', secondRecord.age);
            cy.wrap($firstRow)
              .find('div')
              .eq(3)
              .should('have.text', secondRecord.email);
            cy.wrap($firstRow)
              .find('div')
              .eq(4)
              .should('have.text', secondRecord.salary);
            cy.wrap($firstRow)
              .find('div')
              .eq(5)
              .should('have.text', secondRecord.department);
          });
      });
  });

  it('change the number of rows displayed', () => {
    cy.get('select[aria-label="rows per page"]').select('5 rows');
    cy.get('.rt-tbody div[role="row"]').should('have.length.at.most', 5);
    cy.get('.-totalPages').should('contain', '1');

    cy.get('select[aria-label="rows per page"]').select('10 rows');
    cy.get('.rt-tbody div[role="row"]').should('have.length.at.most', 10);
    cy.get('.-totalPages').should('contain', '1');

    cy.get('select[aria-label="rows per page"]').select('20 rows');
    cy.get('.rt-tbody div[role="row"]').should('have.length.at.most', 20);
    cy.get('.-totalPages').should('contain', '1');

    cy.get('select[aria-label="rows per page"]').select('25 rows');
    cy.get('.rt-tbody div[role="row"]').should('have.length.at.most', 25);
    cy.get('.-totalPages').should('contain', '1');

    cy.get('select[aria-label="rows per page"]').select('50 rows');
    cy.get('.rt-tbody div[role="row"]').should('have.length.at.most', 50);
    cy.get('.-totalPages').should('contain', '1');

    cy.get('select[aria-label="rows per page"]').select('100 rows');
    cy.get('.rt-tbody div[role="row"]').should('have.length.at.most', 100);
    cy.get('.-totalPages').should('contain', '1');
  });
});
