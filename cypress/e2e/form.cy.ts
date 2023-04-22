/// <reference types="cypress" />

describe('Form component', () => {
  beforeEach(() => {
    cy.visit('/post');
    cy.get('[aria-label="image"]').selectFile('cypress/fixtures/oludeniz.jpeg', { force: true });
    cy.get('[aria-label="location"]').type('Oludeniz Beach').should('have.value', 'Oludeniz Beach');
    cy.get('[aria-label="description"]')
      .type('The best beach in Fethiye')
      .should('have.value', 'The best beach in Fethiye');
    cy.get('[aria-label="country"]').select('Turkey').should('have.value', 'Turkey');
    cy.get('[aria-label="date"]').type('2023-04-22').should('have.value', '2023-04-22');
    cy.get('[aria-label="category"]')
      .check('Nature', { force: true })
      .should('have.value', 'Nature');
    cy.get('[aria-label="author.avatar"]').selectFile('cypress/fixtures/profile.jpg', {
      force: true,
    });
    cy.get('[aria-label="author.firstName"]').type('Indar').should('have.value', 'Indar');
    cy.get('[aria-label="author.lastName"]').type('Basto').should('have.value', 'Basto');
    cy.get('[aria-label="terms"]').check({ force: true });
    cy.get('[aria-label="consent"]').check({ force: true });
    cy.get('[data-testid="post-form"]').contains('Add Post').click();
    cy.intercept('POST', 'https://enthusiastic-wasp-jacket.cyclic.app/places/', {
      statusCode: 200,
      body: { success: true },
    }).as('postRequest');
    cy.wait(1000);
  });

  it('should popup modal is visible and post are created', () => {
    cy.get('[aria-label="form-modal"]').should('exist');
    cy.get('[data-testid="post-content"]').contains('Posts not created!').should('not.exist');
  });

  it('popup modal is closed click on button', () => {
    cy.get('[aria-label="form-modal"]').should('exist');
    cy.get('[aria-label="form-modal-close"]').click();
    cy.get('[aria-label="form-modal"]').should('not.exist');
  });

  it('popup modal is closed after 3 seconds', () => {
    cy.get('[aria-label="form-modal"]').should('exist');
    cy.wait(3000);
    cy.get('[aria-label="form-modal"]').should('not.exist');
  });

  it('popup modal is closed click outside a modal', () => {
    cy.get('[aria-label="form-modal"]').should('exist');
    cy.get('body').click('topLeft');
    cy.get('[aria-label="form-modal"]').should('not.exist');
  });
});
