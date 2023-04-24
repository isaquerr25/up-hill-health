describe('Home component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('renders the trending users section', () => {
    cy.get('h3').contains('Trending Users');
    cy.get('.dividerCards', { timeout: 10000 }).eq(0).should('be.visible');
    cy.get('.dividerCards')
      .eq(0)
      .find('.cardUser', { timeout: 10000 })
      .should('have.length.gt', 0);
  });

  it('renders the most active users section', () => {
    cy.get('h3').contains('Most Active Users');
    cy.get('.dividerCards').eq(1).should('be.visible');
    cy.get('.dividerCards').eq(1).find('.cardUser').should('have.length.gt', 0);
  });
});
