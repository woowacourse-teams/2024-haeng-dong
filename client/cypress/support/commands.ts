import CONSTANTS from '../constants/constants';

type APIType = 'sentry' | 'postEvent' | 'getEventName';

interface InterceptAPIProps {
  type: APIType;
  delay?: number;
  statusCode?: number;
}
const POST_EVENT = {
  method: 'POST',
  url: /.*api\/events.*/,
};

const GET_EVENT_NAME = {
  method: 'GET',
  url: /.*api\/events\.*/,
};

Cypress.Commands.add('blockSentry', () => {
  cy.intercept('POST', /.*sentry.io\/api.*/, {statusCode: 200}).as('sentry');
});

Cypress.Commands.add('blockKakao', () => {
  cy.intercept('POST', /.*kakaocdn.\/api.*/, {statusCode: 200}).as('kakao');
});

Cypress.Commands.add('interceptAPI', ({type, delay = 0, statusCode = 200}: InterceptAPIProps) => {
  if (type === 'postEvent')
    cy.intercept(POST_EVENT, {
      delay,
      statusCode,
      fixture: 'postEvent.json',
    }).as('postEvent');
  if (type === 'getEventName')
    cy.intercept(GET_EVENT_NAME, {
      delay,
      statusCode,
      body: {
        eventName: CONSTANTS.eventName,
      },
    }).as('getEventName');
});

Cypress.Commands.add('createEventName', (eventName: string) => {
  cy.visit('/event/create/name');
  cy.get('input').type(eventName);
  cy.get('button').contains('다음').click();
  cy.url().should('include', '/event/create/password');
});

declare global {
  namespace Cypress {
    interface Chainable {
      blockSentry(): Chainable<void>;
      blockKakao(): Chainable<void>;
      interceptAPI(props: InterceptAPIProps): Chainable<void>;
      createEventName(eventName: string): Chainable<void>;
    }
  }
}

export {};
