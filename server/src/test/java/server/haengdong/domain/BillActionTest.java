package server.haengdong.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import server.haengdong.domain.action.Action;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.event.Event;

class BillActionTest {

    @DisplayName("지출 내역 제목의 앞뒤 공백을 제거한 길이가 2 ~ 30자가 아니면 지출을 생성할 수 없다.")
    @ParameterizedTest
    @ValueSource(strings = {" 감 ", "", " ", "1234567890123456789012345678901"})
    void validateTitle(String title) {
        Event event = new Event("name", "token");
        Action action = new Action(event, 1L);
        Long price = 100L;

        assertThatThrownBy(() -> new BillAction(action, title, price))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("앞뒤 공백을 제거한 지출 내역 제목은 2 ~ 30자여야 합니다.");
    }

    @DisplayName("금액이 10,000,000 이하의 자연수가 아니면 지출을 생성할 수 없다.")
    @ParameterizedTest
    @ValueSource(longs = {0, 10_000_001, 20_000_000})
    void validatePrice(long price) {
        Event event = new Event("name", "token");
        Action action = new Action(event, 1L);
        String title = "title";

        assertThatThrownBy(() -> new BillAction(action, title, price))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("지출 금액은 10,000,000 이하의 자연수여야 합니다.");
    }

    @DisplayName("지출 내역을 올바르게 생성한다.")
    @Test
    void createBillAction() {
        Event event = new Event("name", "token");
        Action action = new Action(event, 1L);
        String title = "title";
        Long price = 1_000L;

        BillAction billAction = new BillAction(action, title, price);

        assertAll(
                () -> assertThat(billAction.getAction()).isEqualTo(action),
                () -> assertThat(billAction.getTitle()).isEqualTo(title),
                () -> assertThat(billAction.getPrice()).isEqualTo(price)
        );
    }
}
