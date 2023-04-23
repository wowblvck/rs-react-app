/// <reference types="cypress" />
describe('header component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the logo and page title', () => {
    cy.get('[data-testid="header"]')
      .find('img')
      .should('have.attr', 'alt', 'Logo')
      .and('have.attr', 'src')
      .and('include', 'logo-icon.png');
  });

  it('opens and closes the mobile menu', () => {
    cy.viewport('iphone-6');
    cy.get('[aria-label="burger-menu"]').click();
    cy.wait(1000);
    cy.get('[aria-label="nav-menu"]').scrollIntoView().should('be.visible');

    cy.get('[aria-label="burger-menu"]').click();
    cy.get('[aria-label="nav-menu"]').should('not.be.visible');
  });

  it('should close if clicked outside a menu', () => {
    cy.viewport('iphone-6');
    cy.get('[aria-label="burger-menu"]').click();
    cy.wait(1000);
    cy.get('[aria-label="nav-menu"]').scrollIntoView().should('be.visible');

    cy.get('[data-testid="header"]').click('topLeft');
    cy.get('[aria-label="nav-menu"]').should('not.be.visible');
  });
});
