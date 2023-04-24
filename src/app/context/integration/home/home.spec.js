/// <reference types="cypress" >

context('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display trending users cards when data is loaded', () => {
    cy.get('[data-testid="trending-users"]').within(() => {
      cy.get('[data-testid="card-user"]').should('have.length.greaterThan', 0);
    });
  });

  it('should display most active users cards when data is loaded', () => {
    cy.get('[data-testid="active-users"]').within(() => {
      cy.get('[data-testid="card-user"]').should('have.length.greaterThan', 0);
    });
  });

  it('should display top repositories cards when data is loaded', () => {
    cy.get('[data-testid="top-repositories"]').within(() => {
      cy.get('[data-testid="card-project"]').should(
        'have.length.greaterThan',
        0,
      );
    });
  });
});
