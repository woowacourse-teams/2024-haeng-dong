import {ROUTER_URLS} from '@constants/routerUrls';
import CONSTANTS from '../constants/constants';
import RULE from '@constants/rule';
import {ERROR_MESSAGE} from '@constants/errorMessage';

beforeEach(() => {
  cy.blockAmplitude();
  cy.blockSentry();
  cy.blockKakao();
  cy.interceptAPI({type: 'postEvent', statusCode: 200});
  cy.interceptAPI({type: 'getEvent', statusCode: 200});
  cy.interceptAPI({type: 'getSteps', statusCode: 200});
  cy.interceptAPI({type: 'getReports', statusCode: 200});
  cy.interceptAPI({type: 'postAuth', statusCode: 200});
});

describe('Flow: 관리페이지에서 지출내역 생성을 완료하는 flow', () => {
  it('초기 관리페이지에서 전체 지출 금액은 0원이어야 한다.', () => {
    cy.visit(`/event/${CONSTANTS.eventId}/admin`);
    // cy.get('p').contains('0').should('exist');
  });

  context('지출 생성 퍼널', () => {
    beforeEach(() => {
      cy.visit(ROUTER_URLS.createEvent);
    });
  });
});
