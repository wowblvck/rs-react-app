/// <reference types="cypress" />

describe('pages loading', () => {
  it('display about page', () => {
    cy.visit('/about');

    cy.get('[data-testid="about-content"]').should('be.visible');
  });

  it('display error page', () => {
    cy.visit('/somepage');

    cy.get('[data-testid="error-page"]').should('exist');
  });

  it('displays post page', () => {
    cy.visit('/post');
    cy.get('[data-testid="post-form"]').should('be.visible');
  });
});
