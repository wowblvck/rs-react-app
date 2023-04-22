/// <reference types="cypress" />

describe('Share options', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should event when click on buttons', () => {
    cy.get('[aria-label="like-button"]').first().click();
    cy.get('[aria-label="share-button"]').first().click();
  });
});
