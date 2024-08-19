package server.haengdong.domain.action;

import static org.assertj.core.api.Assertions.assertThat;
import static server.haengdong.domain.action.MemberActionStatus.IN;
import static server.haengdong.domain.action.MemberActionStatus.OUT;

import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import server.haengdong.domain.event.Event;
import server.haengdong.support.fixture.Fixture;

class MemberBillReportTest {

    @DisplayName("액션 목록으로 참가자 정산 리포트를 생성한다.")
    @Test
    void createByActions() {
        Event event = Fixture.EVENT1;
        List<BillAction> billActions = List.of(
                new BillAction(new Action(event, 4L), "뽕족", 60_000L),
                new BillAction(new Action(event, 7L), "인생네컷", 20_000L)
        );
        billActions.get(0).addDetails(
                List.of(
                        new BillActionDetail("소하", 10_000L),
                        new BillActionDetail("감자", 40_000L),
                        new BillActionDetail("쿠키", 10_000L)
                )
        );
        billActions.get(1).addDetails(
                List.of(
                        new BillActionDetail("소하", 5_000L),
                        new BillActionDetail("쿠키", 15_000L)
                )
        );
        List<MemberAction> memberActions = List.of(
                new MemberAction(new Action(event, 1L), "소하", IN, 1L),
                new MemberAction(new Action(event, 2L), "감자", IN, 1L),
                new MemberAction(new Action(event, 3L), "쿠키", IN, 1L),
                new MemberAction(new Action(event, 5L), "감자", OUT, 2L)
        );

        MemberBillReport memberBillReport = MemberBillReport.createByActions(billActions, memberActions);

        assertThat(memberBillReport.getReports())
                .containsAllEntriesOf(
                        Map.of(
                                "감자", 40_000L,
                                "쿠키", 25_000L,
                                "소하", 15_000L
                        )
                );
    }
}
