package server.haengdong.domain.action;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static server.haengdong.support.fixture.Fixture.EVENT1;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
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
    void createBillAction() {
        String title = "title";
        Long price = 1_000L;

        Bill billAction = new Bill(EVENT1, title, price);

        assertAll(
                () -> assertThat(billAction.getTitle()).isEqualTo(title),
                () -> assertThat(billAction.getPrice()).isEqualTo(price)
        );
    }

    @DisplayName("지출 액션에 멤버별 고정 금액이 설정되어 있는지 확인한다.")
    @Test
    void isFixed1() {
        List<Member> members = List.of(new Member(EVENT1, "감자"), new Member(EVENT1, "고구마"));
        Bill fixedBillAction = Bill.create(EVENT1, "인생네컷", 2_000L, members);

        assertThat(fixedBillAction.isFixed()).isEqualTo(false);
    }
}
