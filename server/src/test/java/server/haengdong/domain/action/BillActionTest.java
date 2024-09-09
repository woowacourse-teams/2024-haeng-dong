package server.haengdong.domain.action;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static server.haengdong.support.fixture.Fixture.BILL_ACTION;
import static server.haengdong.support.fixture.Fixture.EVENT1;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import server.haengdong.exception.HaengdongException;
import server.haengdong.support.fixture.Fixture;

class BillActionTest {

    @DisplayName("지출 내역 제목의 앞뒤 공백을 제거한 길이가 1 ~ 30자가 아니면 지출을 생성할 수 없다.")
    @ParameterizedTest
    @ValueSource(strings = {"", " ", "1234567890123456789012345678901"})
    void validateTitle(String title) {
        Sequence sequence = new Sequence(1L);
        Long price = 100L;

        assertThatThrownBy(() -> new BillAction(EVENT1, sequence, title, price))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("앞뒤 공백을 제거한 지출 내역 제목은 1 ~ 30자여야 합니다.");
    }

    @DisplayName("금액이 10,000,000 이하의 자연수가 아니면 지출을 생성할 수 없다.")
    @ParameterizedTest
    @ValueSource(longs = {0, 10_000_001, 20_000_000})
    void validatePrice(long price) {
        Sequence sequence = new Sequence(1L);
        String title = "title";

        assertThatThrownBy(() -> new BillAction(EVENT1, sequence, title, price))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("지출 금액은 10,000,000 이하의 자연수여야 합니다.");
    }

    @DisplayName("지출 내역을 올바르게 생성한다.")
    @Test
    void createBillAction() {
        Sequence sequence = new Sequence(1L);
        String title = "title";
        Long price = 1_000L;

        BillAction billAction = new BillAction(EVENT1, sequence, title, price);

        assertAll(
                () -> assertThat(billAction.getSequence().getValue()).isEqualTo(1L),
                () -> assertThat(billAction.getTitle()).isEqualTo(title),
                () -> assertThat(billAction.getPrice()).isEqualTo(price)
        );
    }

    @DisplayName("지출 액션에 멤버별 고정 금액이 설정되어 있는지 확인한다.")
    @Test
    void isFixed1() {
        BillAction fixedBillAction = Fixture.createBillAction(EVENT1, 1L, "인생네컷", 2_000L);

        List<BillActionDetail> unfixedBillActionDetails = List.of(
                new BillActionDetail(BILL_ACTION, "감자", 1_000L, false),
                new BillActionDetail(BILL_ACTION, "고구마", 1_000L, false)
        );
        fixedBillAction.addDetails(unfixedBillActionDetails);

        assertThat(fixedBillAction.isFixed()).isEqualTo(false);
    }

    @DisplayName("지출 액션에 멤버별 고정 금액이 설정되어 있는지 확인한다.")
    @Test
    void isFixed2() {
        BillAction fixedBillAction = Fixture.createBillAction(EVENT1, 1L, "인생네컷", 5_000L);

        List<BillActionDetail> unfixedBillActionDetails = List.of(
                new BillActionDetail(BILL_ACTION, "감자", 4_000L, true),
                new BillActionDetail(BILL_ACTION, "고구마", 1_000L, true)
        );
        fixedBillAction.addDetails(unfixedBillActionDetails);

        assertThat(fixedBillAction.isFixed()).isEqualTo(true);
    }
}
