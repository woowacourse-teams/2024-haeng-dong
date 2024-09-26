package server.haengdong.domain.member;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import server.haengdong.domain.bill.Bill;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.bill.MemberBillReport;
import server.haengdong.support.fixture.Fixture;

class MemberBillReportTest {

    @DisplayName("지출 목록으로 참가자 정산 리포트를 생성한다.")
    @Test
    void createByBills() {
        Event event = Fixture.EVENT1;
        Member member1 = new Member(1L, event, "소하", false);
        Member member2 = new Member(2L, event, "감자", false);
        Member member3 = new Member(3L, event, "쿠키", false);
        Member member4 = new Member(4L, event, "고구마", false);
        List<Member> members = List.of(member1, member2, member3, member4);
        List<Bill> bills = List.of(
                Bill.create(event, "뽕족", 60_000L, members),
                Bill.create(event, "인생네컷", 20_000L, members)
        );

        MemberBillReport memberBillReport = MemberBillReport.createByBills(bills);

        assertThat(memberBillReport.getReports())
                .containsAllEntriesOf(
                        Map.of(
                                member1, 20_000L,
                                member2, 20_000L,
                                member3, 20_000L,
                                member4, 20_000L
                        )
                );
    }
}
