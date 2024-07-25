package server.haengdong.domain.event;

import static org.assertj.core.api.Assertions.assertThatCode;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import server.haengdong.exception.HaengdongException;

class EventTest {

    @DisplayName("공백 문자가 연속되지 않고, 이름이 2자 이상 20자 이하인 행사를 생성하면 예외가 발생하지 않는다.")
    @ParameterizedTest
    @ValueSource(strings = {"12", "12345678901234567890", "공 백", " 공백", "공백 ", " 공 백 "})
    void createSuccessTest(String eventName) {
        assertThatCode(() -> new Event(eventName, "TEST_TOKEN"))
                .doesNotThrowAnyException();
    }

    @DisplayName("공백 문자가 연속되면 예외가 발생한다.")
    @ParameterizedTest
    @ValueSource(strings = {"  공백", "공백  ", "공백  연속", "공    백"})
    void createFailTest1(String eventName) {
        assertThatCode(() -> new Event(eventName, "TEST_TOKEN"))
                .isInstanceOf(HaengdongException.class)
                .hasMessage(String.format("행사 이름에는 공백 문자가 연속될 수 없습니다. 입력한 이름 : %s", eventName));
    }

    @DisplayName("이름이 2자 미만이거나 20자 초과인 경우 예외가 발생한다.")
    @ParameterizedTest
    @ValueSource(strings = {"", " ", "123456789012345678901"})
    void createFilTest2(String eventName) {
        assertThatCode(() -> new Event(eventName, "TEST_TOKEN"))
                .isInstanceOf(HaengdongException.class)
                .hasMessage(String.format("행사 이름은 2자 이상 20자 이하만 입력 가능합니다. 입력한 이름 길이 : %d", eventName.length()));
    }
}
