import {ROUTER_URLS} from '@constants/routerUrls';
import CONSTANTS from '../constants/constants';
import RULE from '@constants/rule';

beforeEach(() => {
  cy.blockSentry();
  cy.blockKakao();
});

describe('Flow: 비회원이 랜딩 페이지에서부터 이벤트를 생성 완료하는 flow', () => {
  it('비회원이 랜딩페이지에서 "정산 시작하기" 버튼을 누르면 로그인 페이지로 이동해야 한다.', () => {
    cy.visit(ROUTER_URLS.landing);
    cy.get('button').contains('정산 시작하기').click();
    cy.url().should('include', ROUTER_URLS.login);
  });
  it('로그인 페이지에서 "비회원으로 진행하기" 버튼을 누르면 비회원 행사 생성 페이지로 이동해야 한다. ', () => {
    cy.visit(ROUTER_URLS.login);
    cy.get('button').contains('비회원으로 진행하기').click();
    cy.url().should('include', ROUTER_URLS.createGuestEvent);
  });
  context('행사 이름 입력 페이지', () => {
    beforeEach(() => {
      cy.visit(ROUTER_URLS.createGuestEvent);
    });
    it('행사 이름 입력 페이지에서 input이 포커싱 되어 있고, "다음" 버튼이 비활성화 되어 있어야 한다.', () => {
      cy.get('input').focused();
      cy.get('button').contains('다음').should('have.attr', 'disabled');
    });
    it('행사 이름이 1자 이상 입력된 경우 "다음" 버튼이 활성화 되고, 값이 없는 경우 "다음" 버튼이 비활성화 되어야 한다.', () => {
      cy.get('input').type(CONSTANTS.eventName);
      cy.get('button').contains('다음').should('not.have.attr', 'disabled');
      cy.get('input').clear();
      cy.get('input').should('have.value', '');
      cy.get('button').contains('다음').should('have.attr', 'disabled');
    });
    it('행사 이름을 입력한 후 "다음" 버튼을 누르면 행사 관리자 이름 입력 화면으로 이동해야 한다.', () => {
      cy.get('input').type(CONSTANTS.eventName);
      cy.get('button').contains('다음').click();
      cy.contains('관리자의 이름').should('exist');
    });
  });
  context('관리자 이름 입력 페이지', () => {
    beforeEach(() => {
      cy.createEventName(CONSTANTS.eventName);
    });
    it('관리자 이름 입력 페이지에서 input이 포커싱 되어 있고, "다음" 버튼이 비활성화 되어 있어야 한다.', () => {
      cy.get('input').focused();
      cy.get('button').contains('다음').should('have.attr', 'disabled');
    });
    it('관리자 이름이 1자 이상 입력된 경우 "다음" 버튼이 활성화 되고, 값이 없는 경우 "다음" 버튼이 비활성화 되어야 한다.', () => {
      cy.get('input').type(CONSTANTS.adminName);
      cy.get('button').contains('다음').should('not.have.attr', 'disabled');
      cy.get('input').clear();
      cy.get('input').should('have.value', '');
      cy.get('button').contains('다음').should('have.attr', 'disabled');
    });
    it('관리자 이름을 입력한 후 "다음" 버튼을 누르면 행사 비밀번호 입력 화면으로 이동해야 한다.', () => {
      cy.get('input').type(CONSTANTS.adminName);
      cy.get('button').contains('다음').click();
      cy.contains('관리자 비밀번호').should('exist');
    });
  });
  context('행사 비밀번호 입력 페이지', () => {
    beforeEach(() => {
      cy.createAdminName(CONSTANTS.eventName, CONSTANTS.adminName);
    });
    it('행사 비밀번호 입력 페이지에서 input이 포커싱 되어 있고, "행동 개시!" 버튼이 비활성화 되어 있어야 한다.', () => {
      cy.get('input').focused();
      cy.get('button').contains('행동 개시!').should('have.attr', 'disabled');
    });
    it('행사 비밀번호에 숫자가 아닌 입력을 할 경우 값이 입력되지 않아야 한다.', () => {
      cy.get('input').type('테스트');
      cy.get('input').should('have.value', '');
    });
    it(`행사 비밀번호에 ${RULE.maxEventPasswordLength}자리 이상 입력을 할 경우 처음 ${RULE.maxEventPasswordLength}자리만 입력되어야 한다.`, () => {
      cy.get('input').type('12345');
      cy.get('input').should('have.value', CONSTANTS.eventPassword);
    });
    it('행사 비밀번호이 1자 이상 입력된 경우 "행동 개시!" 버튼이 활성화 되고, 값이 없는 경우 "행동 개시!" 버튼이 비활성화 되어야 한다.', () => {
      cy.get('input').type(CONSTANTS.eventPassword);
      cy.get('button').contains('행동 개시!').should('not.have.attr', 'disabled');
      cy.get('input').clear();
      cy.get('input').should('have.value', '');
      cy.get('button').contains('행동 개시!').should('have.attr', 'disabled');
    });
    it('행사 비밀번호을 입력한 후 "행동 개시!" 버튼을 누르면 행사 생성 완료 화면으로 이동해야 한다.', () => {
      cy.interceptAPI({type: 'postEvent', statusCode: 200});
      cy.interceptAPI({type: 'getEventName', statusCode: 200});
      cy.get('input').type(CONSTANTS.eventPassword);
      cy.get('button').contains('행동 개시!').click();
    });
  });
});
