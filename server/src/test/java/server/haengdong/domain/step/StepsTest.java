package server.haengdong.domain.step;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static server.haengdong.support.fixture.Fixture.EVENT1;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import server.haengdong.domain.bill.Bill;
import server.haengdong.domain.member.Member;

class StepsTest {

    @DisplayName("지출 목록 순으로 같은 회원 구성인 경우 같은 Step으로 묶는다.")
    @Test
    void of() {
        Member member1 = new Member(1L, EVENT1, "감자", false);
        Member member2 = new Member(2L, EVENT1, "고구마", false);
        Member member3 = new Member(3L, EVENT1, "당근", false);
        Member member4 = new Member(4L, EVENT1, "양파", false);
        Bill bill1 = Bill.create(EVENT1, "뽕족", 10_000L, List.of(member1, member2));
        Bill bill2 = Bill.create(EVENT1, "용용선생", 20_000L, List.of(member2, member1));
        Bill bill3 = Bill.create(EVENT1, "보승회관", 30_000L, List.of(member1, member2, member3));
        Bill bill4 = Bill.create(EVENT1, "감자", 40_000L, List.of(member1, member2, member3, member4));
        Bill bill5 = Bill.create(EVENT1, "인생네컷", 5_000L, List.of(member2, member3, member1, member4));
        List<Bill> bills = List.of(bill1, bill2, bill3, bill4, bill5);

        Steps step = Steps.of(bills);

        List<Step> steps = step.getSteps();
        assertAll(
                () -> assertThat(steps).hasSize(3),
                () -> assertThat(steps.get(0).getBills()).hasSize(2)
                        .containsExactly(bill1, bill2),
                () -> assertThat(steps.get(0).getMembers()).hasSize(2)
                        .containsExactly(member1, member2),
                () -> assertThat(steps.get(1).getBills()).hasSize(1)
                        .containsExactly(bill3),
                () -> assertThat(steps.get(1).getMembers()).hasSize(3)
                        .containsExactly(member1, member2, member3),
                () -> assertThat(steps.get(2).getBills()).hasSize(2)
                        .containsExactly(bill4, bill5),
                () -> assertThat(steps.get(2).getMembers()).hasSize(4)
                        .containsExactly(member1, member2, member3, member4)
        );
    }
}
