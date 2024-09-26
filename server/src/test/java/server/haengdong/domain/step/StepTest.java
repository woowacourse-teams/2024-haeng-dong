package server.haengdong.domain.step;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static server.haengdong.support.fixture.Fixture.EVENT1;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import server.haengdong.domain.bill.Bill;
import server.haengdong.domain.member.Member;
import server.haengdong.exception.HaengdongException;

class StepTest {

    @DisplayName("회원 구성이 같은 지출은 Step에 추가될 수 있다.")
    @Test
    void add1() {
        Member member1 = new Member(1L, EVENT1, "감자", false);
        Member member2 = new Member(2L, EVENT1, "고구마", false);
        Member member3 = new Member(3L, EVENT1, "당근", false);
        Member member4 = new Member(4L, EVENT1, "양파", false);
        Bill bill1 = Bill.create(EVENT1, "뽕족", 10_000L, List.of(member1, member2, member3, member4));
        Step step = Step.of(bill1);

        Bill bill2 = Bill.create(EVENT1, "인생네컷", 5_000L, List.of(member2, member3, member1, member4));

        step.add(bill2);

        List<Bill> bills = step.getBills();

        assertThat(bills).hasSize(2);
    }

    @DisplayName("회원 구성이 댜른 지출은 Step에 추가될 수 없다.")
    @Test
    void add2() {
        Member member1 = new Member(1L, EVENT1, "감자", false);
        Member member2 = new Member(2L, EVENT1, "고구마", false);
        Member member3 = new Member(3L, EVENT1, "당근", false);
        Member member4 = new Member(4L, EVENT1, "양파", false);
        Bill bill1 = Bill.create(EVENT1, "뽕족", 10_000L, List.of(member1, member2, member3, member4));
        Step step = Step.of(bill1);

        Bill bill2 = Bill.create(EVENT1, "인생네컷", 5_000L, List.of(member2, member3, member1));

        assertThatThrownBy(() -> step.add(bill2))
                .isInstanceOf(HaengdongException.class);
    }
}
