package server.haengdong.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;
import static server.haengdong.domain.action.MemberActionStatus.IN;
import static server.haengdong.domain.action.MemberActionStatus.OUT;
import static server.haengdong.support.fixture.Fixture.BILL_ACTION;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import server.haengdong.application.response.MemberBillReportAppResponse;
import server.haengdong.domain.action.Action;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.BillActionDetail;
import server.haengdong.domain.action.BillActionRepository;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;
import server.haengdong.support.fixture.Fixture;

class ActionServiceTest extends ServiceTestSupport {

    @Autowired
    private ActionService actionService;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private BillActionRepository billActionRepository;

    @Autowired
    private MemberActionRepository memberActionRepository;

    @DisplayName("참여자별 정산 현황을 조회한다.")
    @Test
    void getMemberBillReports() {
        Event event = Fixture.EVENT1;
        Event savedEvent = eventRepository.save(event);
        List<MemberAction> memberActions = List.of(
                new MemberAction(new Action(savedEvent, 1L), "소하", IN, 1L),
                new MemberAction(new Action(savedEvent, 2L), "감자", IN, 1L),
                new MemberAction(new Action(savedEvent, 3L), "쿠키", IN, 1L),
                new MemberAction(new Action(savedEvent, 5L), "감자", OUT, 2L)
        );
        List<BillAction> billActions = List.of(
                new BillAction(new Action(savedEvent, 4L), "뽕족", 60_000L),
                new BillAction(new Action(savedEvent, 7L), "인생네컷", 20_000L)
        );
        billActions.get(0).addDetails(
                List.of(
                        new BillActionDetail(BILL_ACTION, "소하", 10_000L, false),
                        new BillActionDetail(BILL_ACTION, "감자", 40_000L, true),
                        new BillActionDetail(BILL_ACTION, "쿠키", 10_000L, false)
                )
        );
        billActions.get(1).addDetails(
                List.of(
                        new BillActionDetail(BILL_ACTION, "소하", 5_000L, true),
                        new BillActionDetail(BILL_ACTION, "쿠키", 15_000L, true)
                )
        );
        memberActionRepository.saveAll(memberActions);
        billActionRepository.saveAll(billActions);

        List<MemberBillReportAppResponse> responses = actionService.getMemberBillReports(event.getToken());

        assertThat(responses)
                .hasSize(3)
                .extracting(MemberBillReportAppResponse::name, MemberBillReportAppResponse::price)
                .containsExactlyInAnyOrder(
                        tuple("감자", 40_000L),
                        tuple("쿠키", 25_000L),
                        tuple("소하", 15_000L)
                );
    }

    @DisplayName("존재하지 않는 이벤트의 참여자별 정산 현황을 조회하는 경우 예외가 발생한다.")
    @Test
    void getMemberBillReports1() {
        assertThatThrownBy(() -> actionService.getMemberBillReports("invalid token"))
                .isInstanceOf(HaengdongException.class)
                .hasMessage(HaengdongErrorCode.EVENT_NOT_FOUND.getMessage());
    }
}
