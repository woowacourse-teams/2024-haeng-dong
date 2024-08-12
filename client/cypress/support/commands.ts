// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
Cypress.Commands.add('createEventName', (eventName: string) => {
  cy.visit('/event/create/name');
  cy.get('input').type(eventName);
  cy.get('button').contains('다음').click();
  cy.url().should('include', '/event/create/password');
});

declare global {
  namespace Cypress {
    interface Chainable {
      createEventName(eventName: string): Chainable<void>;
    }
  }
}

// 글로벌 선언
export {}; // 이 부분은 타입스크립트 환경에서 글로벌로 인식하게 합니다.
