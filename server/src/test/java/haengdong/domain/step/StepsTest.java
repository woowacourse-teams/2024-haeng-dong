package haengdong.domain.step;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static haengdong.support.fixture.Fixture.EVENT1;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import haengdong.event.domain.bill.Bill;
import haengdong.event.domain.event.member.EventMember;
import haengdong.event.domain.step.Step;
import haengdong.event.domain.step.Steps;

class StepsTest {

    @DisplayName("지출 목록 순으로 같은 회원 구성인 경우 같은 Step으로 묶는다.")
    @Test
    void of() {
        EventMember eventMember1 = new EventMember(1L, EVENT1, "감자", false);
        EventMember eventMember2 = new EventMember(2L, EVENT1, "고구마", false);
        EventMember eventMember3 = new EventMember(3L, EVENT1, "당근", false);
        EventMember eventMember4 = new EventMember(4L, EVENT1, "양파", false);
        Bill bill1 = Bill.create(EVENT1, "뽕족", 10_000L, List.of(eventMember1, eventMember2));
        Bill bill2 = Bill.create(EVENT1, "용용선생", 20_000L, List.of(eventMember2, eventMember1));
        Bill bill3 = Bill.create(EVENT1, "보승회관", 30_000L, List.of(eventMember1, eventMember2, eventMember3));
        Bill bill4 = Bill.create(EVENT1, "감자", 40_000L, List.of(eventMember1, eventMember2, eventMember3, eventMember4));
        Bill bill5 = Bill.create(EVENT1, "인생네컷", 5_000L, List.of(eventMember2, eventMember3, eventMember1, eventMember4));
        List<Bill> bills = List.of(bill1, bill2, bill3, bill4, bill5);

        Steps step = Steps.of(bills);

        List<Step> steps = step.getSteps();
        assertAll(
                () -> assertThat(steps).hasSize(3),
                () -> assertThat(steps.get(0).getBills()).hasSize(2)
                        .containsExactly(bill1, bill2),
                () -> assertThat(steps.get(0).getMembers()).hasSize(2)
                        .containsExactly(eventMember1, eventMember2),
                () -> assertThat(steps.get(1).getBills()).hasSize(1)
                        .containsExactly(bill3),
                () -> assertThat(steps.get(1).getMembers()).hasSize(3)
                        .containsExactly(eventMember1, eventMember2, eventMember3),
                () -> assertThat(steps.get(2).getBills()).hasSize(2)
                        .containsExactly(bill4, bill5),
                () -> assertThat(steps.get(2).getMembers()).hasSize(4)
                        .containsExactly(eventMember1, eventMember2, eventMember3, eventMember4)
        );
    }
}
