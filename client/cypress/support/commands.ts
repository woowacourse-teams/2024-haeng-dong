import {ROUTER_URLS} from '@constants/routerUrls';
import CONSTANTS from '../constants/constants';
import {Step, Steps} from 'types/serviceType';

type APIType = 'sentry' | 'postEvent' | 'getEvent' | 'getSteps' | 'getReports' | 'postAuth' | 'postLogin';

interface InterceptAPIProps {
  type: APIType;
  delay?: number;
  statusCode?: number;
}
const POST_EVENT = {
  method: 'POST',
  url: /api\/events$/,
};

const eventId = CONSTANTS.eventId;

const GET_EVENT = {
  method: 'GET',
  url: new RegExp(`/api/events/${eventId}$`),
};

const GET_STEPS = {
  method: 'GET',
  url: new RegExp(`/api/events/${eventId}/bills$`),
};

const GET_REPORTS = {
  method: 'GET',
  url: new RegExp(`/api/events/${eventId}/reports$`),
};

const POST_AUTH = {
  method: 'POST',
  url: new RegExp(`/api/admin/events/${eventId}/auth$`),
};

const POST_LOGIN = {
  method: 'POST',
  url: new RegExp(`/api/admin/events/${eventId}/login$`),
};

Cypress.Commands.add('blockAmplitude', () => {
  cy.intercept('POST', /.*amplitude.com.*/, {statusCode: 200}).as('amplitude');
});

Cypress.Commands.add('blockSentry', () => {
  cy.intercept('POST', /.*sentry.io\/api.*/, {statusCode: 200}).as('sentry');
});

Cypress.Commands.add('blockKakao', () => {
  cy.intercept('GET', 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js', {
    statusCode: 200,
    body: '',
  }).as('kakao');
});

Cypress.Commands.add('initSteps', () => {
  Cypress.env('steps', {steps: []});
});

Cypress.Commands.add('setSteps', (data: Step) => {
  Cypress.env('steps', (prev: {steps: Step[]}) => ({steps: [...prev.steps, data]}));
});

Cypress.Commands.add('useSteps', () => {
  Cypress.env('steps');
});

Cypress.Commands.add('interceptAPI', ({type, delay = 0, statusCode = 200}: InterceptAPIProps) => {
  if (type === 'postEvent')
    cy.intercept(POST_EVENT, {
      delay,
      statusCode,
      body: {
        eventId: CONSTANTS.eventId,
      },
    }).as('postEvent');
  if (type === 'getEvent') {
    cy.initSteps();
    cy.intercept(GET_EVENT, {
      delay,
      statusCode,
      body: {
        eventName: CONSTANTS.eventName,
        bankName: '',
        accountNumber: '',
      },
    }).as('getEvent');
  }

  if (type === 'getSteps')
    cy.intercept(GET_STEPS, {
      delay,
      statusCode,
      body: Cypress.env('steps'),
    }).as('getSteps');
  if (type === 'getReports')
    cy.intercept(GET_REPORTS, {
      delay,
      statusCode,
    }).as('getSteps');
  if (type === 'postAuth')
    cy.intercept(POST_AUTH, {
      delay,
      statusCode,
    }).as('postAuth');
  if (type === 'postLogin')
    cy.intercept(POST_LOGIN, {
      delay,
      statusCode,
      headers: {
        'Set-Cookie': 'eventToken=jwtToken;',
      },
    }).as('postLogin');
});

Cypress.Commands.add('createEventName', () => {
  cy.visit(ROUTER_URLS.createEvent);
  cy.get('input').type(CONSTANTS.eventName);
  cy.get('button').contains('다음').click();
});

Cypress.Commands.add('createEventComplete', () => {
  cy.createEventName();
  cy.get('input').type(CONSTANTS.eventPassword);
  cy.get('button').contains('행동 개시!').click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      blockAmplitude(): Chainable<void>;
      blockSentry(): Chainable<void>;
      blockKakao(): Chainable<void>;
      interceptAPI(props: InterceptAPIProps): Chainable<void>;
      initSteps(): Chainable<void>;
      setSteps(prop: Step): Chainable<void>;
      useSteps(): Chainable<Steps>;
      createEventName(): Chainable<void>;
      createEventComplete(): Chainable<void>;
    }
  }
}

export {};
