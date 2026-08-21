describe('Student Management Integration Tests', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('Should correctly display the main title and UI elements', () => {
    cy.contains('h1', 'Student Management System').should('be.visible');
  });

  it('Should successfully add a new student and update the list', () => {
    cy.get('[data-cy="input-firstname"]').type('John');
    cy.get('[data-cy="input-lastname"]').type('Doe');
    cy.get('[data-cy="input-age"]').type('23');
    cy.get('[data-cy="input-email"]').type('john.doe@example.com');

    cy.get('[data-cy="btn-submit"]').click();

    cy.get('[data-cy="input-firstname"]').should('have.value', '');

    cy.get('[data-cy="student-list"]').should('contain', 'John Doe');
    cy.get('[data-cy="student-list"]').should('contain', 'john.doe@example.com');
  });

  it('Should successfully delete a student from the list', () => {
    cy.get('[data-cy="student-item"]').then(($items) => {
      const initialLength = $items.length;

      cy.get('[data-cy="btn-delete"]').first().click();

      cy.get('[data-cy="student-item"]').should('have.length', initialLength - 1);
    });
  });

});