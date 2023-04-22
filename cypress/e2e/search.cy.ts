/// <reference types="cypress" />

describe('Search', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should update search value when user types in input field and submits', () => {
    const searchTerm = 'Turkey';
    cy.get('[aria-label="search-input"]').last().type(searchTerm).should('have.value', searchTerm);
    cy.get('[aria-label="search-form"]').last().submit();
    cy.intercept('GET', `https://enthusiastic-wasp-jacket.cyclic.app/places?_q=${searchTerm}`, {
      statusCode: 200,
      body: { success: true },
    }).as('getRequest');
    cy.get('[data-testid="home-content"]').first().contains(searchTerm);
  });

  it('should not founded elements', () => {
    const searchTerm = 'somethingtextone1two3';
    cy.get('[aria-label="search-input"]').last().type(searchTerm).should('have.value', searchTerm);
    cy.get('[aria-label="search-form"]').last().submit();
    cy.intercept('GET', `https://enthusiastic-wasp-jacket.cyclic.app/places?_q=${searchTerm}`, {
      statusCode: 200,
      body: { success: true },
    }).as('getRequest');
    cy.get('[data-testid="home-content"]').contains('Places not found. Refine your search!');
  });
});
