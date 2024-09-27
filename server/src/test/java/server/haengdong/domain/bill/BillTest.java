package server.haengdong.domain.bill;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static server.haengdong.support.fixture.Fixture.EVENT1;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import server.haengdong.domain.member.Member;
import server.haengdong.exception.HaengdongException;

class BillTest {

    @DisplayName("지출 내역 제목의 앞뒤 공백을 제거한 길이가 1 ~ 30자가 아니면 지출을 생성할 수 없다.")
    @ParameterizedTest
    @ValueSource(strings = {"", " ", "1234567890123456789012345678901"})
    void validateTitle(String title) {
        Long price = 100L;

        assertThatThrownBy(() -> new Bill(EVENT1, title, price))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("앞뒤 공백을 제거한 지출 내역 제목은 1 ~ 30자여야 합니다.");
    }

    @DisplayName("금액이 10,000,000 이하의 자연수가 아니면 지출을 생성할 수 없다.")
    @ParameterizedTest
    @ValueSource(longs = {0, 10_000_001, 20_000_000})
    void validatePrice(long price) {
        String title = "title";

        assertThatThrownBy(() -> new Bill(EVENT1, title, price))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("지출 금액은 10,000,000 이하의 자연수여야 합니다.");
    }

    @DisplayName("지출 내역을 올바르게 생성한다.")
    @Test
    void createBill() {
        String title = "title";
        Long price = 1_000L;

        Bill bill = new Bill(EVENT1, title, price);

        assertAll(
                () -> assertThat(bill.getTitle()).isEqualTo(title),
                () -> assertThat(bill.getPrice()).isEqualTo(price)
        );
    }

    @DisplayName("지출에 멤버별 고정 금액이 설정되어 있는지 확인한다.")
    @Test
    void isFixed1() {
        List<Member> members = List.of(new Member(EVENT1, "감자"), new Member(EVENT1, "고구마"));
        Bill fixedBill = Bill.create(EVENT1, "인생네컷", 2_000L, members);

        assertThat(fixedBill.isFixed()).isEqualTo(false);
    }

    @DisplayName("같은 멤버 목록을 가지고 있는지 비교한다.")
    @Test
    void isSameMember1() {
        Member member1 = new Member(1L, EVENT1, "감자", false);
        Member member2 = new Member(2L, EVENT1, "고구마", false);
        Member member3 = new Member(3L, EVENT1, "당근", false);

        List<Member> members1 = List.of(member1, member2, member3);
        List<Member> members2 = List.of(member2, member3, member1);

        Bill bill1 = Bill.create(EVENT1, "뽕족", 20_000L, members1);
        Bill bill2 = Bill.create(EVENT1, "인생네컷", 30_000L, members2);

        boolean isSameMembers = bill1.isSameMembers(bill2);

        assertThat(isSameMembers).isTrue();
    }

    @DisplayName("같은 멤버 목록을 가지고 있는지 비교한다.")
    @Test
    void isSameMember2() {
        Member member1 = new Member(1L, EVENT1, "감자", false);
        Member member2 = new Member(2L, EVENT1, "고구마", false);
        Member member3 = new Member(3L, EVENT1, "당근", false);

        List<Member> members1 = List.of(member1, member2, member3);
        List<Member> members2 = List.of(member2, member1);

        Bill bill1 = Bill.create(EVENT1, "뽕족", 20_000L, members1);
        Bill bill2 = Bill.create(EVENT1, "인생네컷", 30_000L, members2);

        boolean isSameMembers = bill1.isSameMembers(bill2);

        assertThat(isSameMembers).isFalse();
    }
}
