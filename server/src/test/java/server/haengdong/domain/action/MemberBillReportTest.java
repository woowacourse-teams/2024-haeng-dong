package server.haengdong.domain.action;

import static org.assertj.core.api.Assertions.assertThat;
import static server.haengdong.domain.action.MemberActionStatus.IN;
import static server.haengdong.domain.action.MemberActionStatus.OUT;

import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import server.haengdong.domain.event.Event;

class MemberBillReportTest {

    @DisplayName("액션 목록으로 참가자 정산 리포트를 생성한다.")
    @Test
    void createByActions() {
        String token = "TOK2N";
        Event event = new Event("행동대장", token);
        List<BillAction> billActions = List.of(
                new BillAction(new Action(event, 4L), "뽕족", 60_000L),
                new BillAction(new Action(event, 6L), "인생맥주", 40_000L),
                new BillAction(new Action(event, 7L), "인생네컷", 20_000L)
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
                                "감자", 20_000L,
                                "쿠키", 50_000L,
                                "소하", 50_000L
                        )
                );
    }
}
