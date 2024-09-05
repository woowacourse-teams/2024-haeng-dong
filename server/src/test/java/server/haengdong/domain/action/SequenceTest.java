package server.haengdong.domain.action;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class SequenceTest {

    @DisplayName("액션의 초기 순서번호는 1이다.")
    @Test
    void createFirst() {
        Sequence sequence = Sequence.createFirst();

        assertThat(sequence.getValue()).isOne();
    }

    @DisplayName("현재 액션의 다음 액션의 순서는 1만큼 증가한다.")
    @Test
    void next() {
        Sequence sequence = new Sequence(2L);

        Sequence nextAction = sequence.next();

        assertThat(nextAction.getValue()).isEqualTo(3L);
    }
}
