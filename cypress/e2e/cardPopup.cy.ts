/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
describe('card popup', () => {
  it('should open the popup when the item is clicked', () => {
    cy.visit('/');
    cy.get('[data-testid="card-item"]').first().click();
    cy.get('[data-testid="card-popup"]').should('be.visible');
  });

  it('should close the popup when the close button is clicked', () => {
    cy.visit('/');
    cy.get('[data-testid="card-item"]').first().click();
    cy.get('[data-testid="card-popup"]').should('be.visible');
    cy.get('[aria-label="button-close"]').click();
    cy.get('[data-testid="card-popup"]').should('not.exist');
  });

  it('should zoom in the image when the zoom button is clicked', () => {
    cy.visit('/');
    cy.get('[data-testid="card-item"]').first().realClick();
    cy.get('[data-testid="card-image-container"]').realHover();
    cy.get('[aria-label="zoom-container"]').contains('Click to Zoom In').should('be.visible');
    cy.get('[aria-label="zoom-container"]').realClick();
    cy.get('[aria-label="zoom-container"]').contains('Click to Zoom In').should('not.exist');
    cy.get('[aria-label="zoom-container"]').realClick();
    cy.get('[aria-label="zoom-container"]').contains('Click to Zoom In').should('be.visible');
  });

  it('should close if clicked outside a popup', () => {
    cy.visit('/');
    cy.get('[data-testid="card-item"]').first().realClick();
    cy.get('[data-testid="card-popup"]').should('be.visible');
    cy.get('body').click('topLeft');
    cy.get('[data-testid="card-popup"]').should('not.exist');
  });
});
