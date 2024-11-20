import {ROUTER_URLS} from '@constants/routerUrls';
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
  cy.intercept('GET', 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js', {
    statusCode: 200,
    body: '',
  }).as('blockKakao');
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
  cy.visit(ROUTER_URLS.createMemberEvent);
  cy.get('input').type(eventName);
  cy.get('button').contains('다음').click();
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
