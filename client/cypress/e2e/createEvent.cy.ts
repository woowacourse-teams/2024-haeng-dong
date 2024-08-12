import CONSTANTS from '../constants/constants';
beforeEach(() => {
  cy.blockSentry();
});

describe('Flow: 랜딩 페이지에서부터 이벤트를 생성 완료하는 flow', () => {
  it('랜딩페이지에서 "행사 생성하기" 버튼을 눌러 행사 이름 입력 페이지로 이동해야 한다.', () => {
    cy.visit('/');
    cy.get('button').should('have.text', '행사 생성하기').click();
    cy.url().should('include', '/event/create/name');
  });

  context('행사 이름 입력 페이지', () => {
    beforeEach(() => {
      cy.visit('/event/create/name');
    });

    it('행사 이름 입력 페이지에서 input이 포커싱 되어 있고, "다음" 버튼이 비활성화 되어 있어야 한다.', () => {
      cy.get('input').focused();
      cy.get('button').contains('다음').should('have.attr', 'disabled');
      cy.url().should('include', '/event/create/name');
    });

    it('행사 이름이 1자 이상 입력된 경우 "다음" 버튼이 활성화 되고, 값이 없는 경우 "다음" 버튼이 비활성화 되어야 한다.', () => {
      cy.get('input').type(CONSTANTS.eventName);
      cy.get('button').contains('다음').should('not.have.attr', 'disabled');
      cy.get('input').clear();
      cy.get('input').should('have.value', '');
      cy.get('button').contains('다음').should('have.attr', 'disabled');
      cy.url().should('include', '/event/create/name');
    });

    it('행사 이름을 입력한 후 "다음" 버튼을 누르면 행사 비밀번호 설정 화면으로 이동해야 한다.', () => {
      cy.get('input').type(CONSTANTS.eventName);
      cy.get('button').contains('다음').click();
      cy.url().should('include', '/event/create/password');
    });
  });

  context('행사 비밀번호 입력 페이지', () => {
    beforeEach(() => {
      cy.createEventName(CONSTANTS.eventName);
    });

    it('행사 비밀번호 입력 페이지에서 input이 포커싱 되어 있고, "행동 개시!" 버튼이 비활성화 되어 있어야 한다.', () => {
      cy.get('input').focused();
      cy.get('button').contains('행동 개시!').should('have.attr', 'disabled');
      cy.url().should('include', '/event/create/password');
    });

    it('행사 비밀번호에 숫자가 아닌 입력을 할 경우 값이 입력되지 않아야 한다.', () => {
      cy.get('input').type('테스트');
      cy.get('input').should('have.value', '');
    });

    it('행사 비밀번호에 4자리 이상 입력을 할 경우 처음 네 자리만 입력되어야 한다.', () => {
      cy.get('input').type('12345');
      cy.get('input').should('have.value', CONSTANTS.eventPassword);
    });

    it('행사 비밀번호이 1자 이상 입력된 경우 "행동 개시!" 버튼이 활성화 되고, 값이 없는 경우 "행동 개시!" 버튼이 비활성화 되어야 한다.', () => {
      cy.get('input').type(CONSTANTS.eventPassword);
      cy.get('button').contains('행동 개시!').should('not.have.attr', 'disabled');
      cy.get('input').clear();
      cy.get('input').should('have.value', '');
      cy.get('button').contains('행동 개시!').should('have.attr', 'disabled');
      cy.url().should('include', '/event/create/password');
    });

    it('행사 비밀번호을 입력한 후 "행동 개시!" 버튼을 누르면 행사 생성 완료 화면으로 이동해야 한다.', () => {
      cy.interceptAPI({type: 'postEvent', statusCode: 200});
      cy.interceptAPI({type: 'getEventName', statusCode: 200});
      cy.get('input').type(CONSTANTS.eventPassword);
      cy.get('button').contains('행동 개시!').click();

      cy.url().should('include', '/event/create/complete');
    });
  });
});
