package server.haengdong.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;
import static server.haengdong.domain.action.MemberActionStatus.IN;
import static server.haengdong.domain.action.MemberActionStatus.OUT;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import server.haengdong.application.response.MemberBillReportAppResponse;
import server.haengdong.domain.action.Action;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.BillActionRepository;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;
import server.haengdong.support.extension.DatabaseCleanerExtension;

@ExtendWith(DatabaseCleanerExtension.class)
@SpringBootTest
class ActionServiceTest {

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
        String token = "tOkEn1";
        Event event = new Event("행동대장", token);
        Event savedEvent = eventRepository.save(event);
        List<MemberAction> memberActions = List.of(
                new MemberAction(new Action(savedEvent, 1L), "소하", IN, 1L),
                new MemberAction(new Action(savedEvent, 2L), "감자", IN, 1L),
                new MemberAction(new Action(savedEvent, 3L), "쿠키", IN, 1L),
                new MemberAction(new Action(savedEvent, 5L), "감자", OUT, 2L)
        );
        List<BillAction> billActions = List.of(
                new BillAction(new Action(savedEvent, 4L), "뽕족", 60_000L),
                new BillAction(new Action(savedEvent, 6L), "인생맥주", 40_000L),
                new BillAction(new Action(savedEvent, 7L), "인생네컷", 20_000L)
        );
        memberActionRepository.saveAll(memberActions);
        billActionRepository.saveAll(billActions);

        List<MemberBillReportAppResponse> responses = actionService.getMemberBillReports(token);

        assertThat(responses)
                .hasSize(3)
                .extracting(MemberBillReportAppResponse::name, MemberBillReportAppResponse::price)
                .containsExactlyInAnyOrder(
                        tuple("감자", 20_000L),
                        tuple("쿠키", 50_000L),
                        tuple("소하", 50_000L)
                );
    }

    @DisplayName("존재하지 않는 이벤트의 참여자별 정산 현황을 조회하는 경우 예외가 발생한다.")
    @Test
    void getMemberBillReports1() {
        assertThatThrownBy(() -> actionService.getMemberBillReports("invalid token"))
                .isInstanceOf(HaengdongException.class)
                .hasMessage(HaengdongErrorCode.NOT_FOUND_EVENT.getMessage());
    }
}
