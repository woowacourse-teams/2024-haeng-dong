package haengdong.domain.eventmember;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import haengdong.event.domain.bill.Bill;
import haengdong.event.domain.event.Event;
import haengdong.event.domain.bill.MemberBillReport;
import haengdong.event.domain.event.member.EventMember;
import haengdong.support.fixture.Fixture;

class EventMemberBillReportTest {

    @DisplayName("지출 목록으로 참가자 정산 리포트를 생성한다.")
    @Test
    void create() {
        Event event = Fixture.EVENT1;
        EventMember eventMember1 = new EventMember(1L, event, "소하", false);
        EventMember eventMember2 = new EventMember(2L, event, "감자", false);
        EventMember eventMember3 = new EventMember(3L, event, "쿠키", false);
        EventMember eventMember4 = new EventMember(4L, event, "고구마", false);
        EventMember eventMember5 = new EventMember(5L, event, "조커", false);
        List<EventMember> eventMembers = List.of(eventMember1, eventMember2, eventMember3, eventMember4);
        List<Bill> bills = List.of(
                Bill.create(event, "뽕족", 60_000L, eventMembers),
                Bill.create(event, "인생네컷", 20_000L, eventMembers)
        );
        List<EventMember> eventMembersReal = List.of(eventMember1, eventMember2, eventMember3, eventMember4, eventMember5);
        MemberBillReport memberBillReport = MemberBillReport.create(eventMembersReal, bills);

        assertThat(memberBillReport.getReports())
                .containsAllEntriesOf(
                        Map.of(
                                eventMember1, 20_000L,
                                eventMember2, 20_000L,
                                eventMember3, 20_000L,
                                eventMember4, 20_000L,
                                eventMember5, 0L
                        )
                );
    }
}
