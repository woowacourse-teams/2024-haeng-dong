package server.haengdong.domain.action;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import server.haengdong.domain.event.Event;

class ActionTest {

    @DisplayName("액션의 초기 순서번호는 1이다.")
    @Test
    void createFirst() {
        Event event = new Event("name", "token");
        Action action = Action.createFirst(event);

        assertThat(action.getSequence()).isOne();
    }

    @DisplayName("현재 액션의 다음 액션의 순서는 1만큼 증가한다.")
    @Test
    void next() {
        Event event = new Event("name", "token");
        Action action = new Action(event, 2L);

        Action nextAction = action.next();

        assertThat(nextAction.getSequence()).isEqualTo(3L);
    }
}
