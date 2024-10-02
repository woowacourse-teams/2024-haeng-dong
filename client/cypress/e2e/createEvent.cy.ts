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

describe('Flow: 랜딩 페이지에서부터 이벤트를 생성 완료하는 flow', () => {
  it('랜딩페이지에서 "정산 시작하기" 버튼을 눌러 행사 이름 입력 페이지로 이동해야 한다.', () => {
    cy.visit('/');
    cy.get('button').contains('정산 시작하기').click();
    cy.url().should('include', ROUTER_URLS.createEvent);
  });

  context('행사 이름 입력 페이지', () => {
    beforeEach(() => {
      cy.visit(ROUTER_URLS.createEvent);
    });

    it('행사 이름 입력 페이지에서 input이 포커싱 되어 있고, "다음" 버튼이 비활성화 되어 있어야 한다.', () => {
      cy.get('input').focused();
      cy.get('button').contains('다음').should('have.attr', 'disabled');
    });

    it(`행사 이름이 ${RULE.minEventNameLength}자 이상 입력된 경우 "다음" 버튼이 활성화 되고, 값이 없는 경우 "다음" 버튼이 비활성화 되어야 한다.`, () => {
      cy.get('input').type(CONSTANTS.eventName);
      cy.get('button').contains('다음').should('not.have.attr', 'disabled');
      cy.get('input').clear();
      cy.get('input').should('have.value', '');
      cy.get('button').contains('다음').should('have.attr', 'disabled');
    });

    it(`행사 이름이 ${RULE.maxEventNameLength}자 이상 입력할 경우 처음 ${RULE.maxEventNameLength}자리 까지만 입력이 되고 "${ERROR_MESSAGE.eventName}"에러메세지가 출력된다.`, () => {
      cy.get('input').type(CONSTANTS.eventNameExceeded);
      cy.get('button').contains('다음').should('not.have.attr', 'disabled');
      cy.get('input').invoke('val').should('eq', CONSTANTS.eventNameExceeded.slice(0, RULE.maxEventNameLength));
      cy.get('p').contains(ERROR_MESSAGE.eventName).should('be.visible');
    });

    it('행사 이름을 입력한 후 "다음" 버튼을 누르면 행사 비밀번호 설정 화면으로 이동해야 한다.', () => {
      cy.get('input').type(CONSTANTS.eventName);
      cy.get('button').contains('다음').click();

      cy.contains('비밀번호').should('exist');
    });

    it('행사 이름을 입력한 후 "Enter"키를 입력하면 행사 비밀번호 설정 화면으로 이동해야 한다.', () => {
      cy.get('input').type(`${CONSTANTS.eventName}{enter}`);

      cy.contains('비밀번호').should('exist');
    });
  });

  context('행사 비밀번호 입력 페이지', () => {
    beforeEach(() => {
      cy.createEventName();
    });

    it('행사 비밀번호 입력 페이지에서 input이 포커싱 되어 있고, "행동 개시!" 버튼이 비활성화 되어 있어야 한다.', () => {
      cy.get('input').focused();
      cy.get('button').contains('행동 개시!').should('have.attr', 'disabled');
    });

    it('행사 비밀번호에 숫자가 아닌 입력을 할 경우 값이 입력되지 않아야 한다.', () => {
      cy.get('input').type('테스트');
      cy.get('input').should('have.value', '');
    });

    it(`행사 비밀번호에 ${RULE.eventPasswordLength}자리 이상 입력할 경우 처음 ${RULE.eventPasswordLength}자리 까지만 입력이 되어야 한다.`, () => {
      cy.get('input').type(CONSTANTS.eventPasswordExceeded);
      cy.get('input').invoke('val').should('eq', CONSTANTS.eventPassword);
    });

    it('행사 비밀번호이 1자 이상 입력된 경우 "행동 개시!" 버튼이 활성화 되고, 값이 없는 경우 "행동 개시!" 버튼이 비활성화 되어야 한다.', () => {
      cy.get('input').type(CONSTANTS.eventPassword);
      cy.get('button').contains('행동 개시!').should('not.have.attr', 'disabled');
      cy.get('input').clear();
      cy.get('input').should('have.value', '');
      cy.get('button').contains('행동 개시!').should('have.attr', 'disabled');
    });

    it('행사 비밀번호을 입력한 후 "행동 개시!" 버튼을 누르면 행사 생성 완료 화면으로 이동해야 한다.', () => {
      cy.get('input').type(CONSTANTS.eventPassword);
      cy.get('button').contains('행동 개시!').click();
    });
  });

  context('행사 생성 완료 페이지', () => {
    it('행사 생성 완료 페이지에서 "관리 페이지로 이동" 버튼을 눌러 행사 관리 페이지로 이동해야 한다.', () => {
      cy.createEventComplete();
      cy.get('button').contains('관리 페이지로 이동').click();
      cy.url().should('include', `${ROUTER_URLS.event}/${CONSTANTS.eventId}`);
    });
  });
});
