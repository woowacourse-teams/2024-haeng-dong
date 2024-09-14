package server.haengdong.domain.event;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import server.haengdong.exception.HaengdongException;

class EventTest {

    @DisplayName("공백 문자가 연속되지 않고, 이름이 2자 이상 20자 이하인 행사를 생성하면 예외가 발생하지 않는다.")
    @ParameterizedTest
    @ValueSource(strings = {"12", "12345678901234567890", "공 백", " 공백", "공백 ", " 공 백 "})
    void createSuccessTest(String eventName) {
        assertThatCode(() -> new Event(eventName, "1234", "TEST_TOKEN"))
                .doesNotThrowAnyException();
    }

    @DisplayName("공백 문자가 연속되면 예외가 발생한다.")
    @ParameterizedTest
    @ValueSource(strings = {"  공백", "공백  ", "공백  연속", "공    백"})
    void createFailTest1(String eventName) {
        assertThatCode(() -> new Event(eventName, "1234", "TEST_TOKEN"))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("행사 이름에는 공백 문자가 연속될 수 없습니다.");
    }

    @DisplayName("이름이 1자 미만이거나 20자 초과인 경우 예외가 발생한다.")
    @ParameterizedTest
    @ValueSource(strings = {"", " ", "123456789012345678901"})
    void createFilTest2(String eventName) {
        assertThatCode(() -> new Event(eventName, "1234", "TEST_TOKEN"))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("행사 이름은 1자 이상 20자 이하만 입력 가능합니다.");
    }

    @DisplayName("비밀번호는 4자리 숫자 입니다.")
    @ParameterizedTest
    @ValueSource(strings = {"1", "12", "123", "12345", "adgd"})
    void validatePassword(String password) {
        assertThatCode(() -> new Event("이름", password, "TEST_TOKEN"))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("비밀번호가 다른지 검증한다.")
    @Test
    void isNotSamePassword() {
        String rawPassword = "1234";
        Event event = new Event("이름", rawPassword, "TEST_TOKEN");

        assertThat(event.isPasswordMismatch(rawPassword)).isFalse();
    }

    @DisplayName("비밀번호가 다른지 검증한다.")
    @Test
    void isNotSamePassword1() {
        String rawPassword = "1234";
        Event event = new Event("이름", "5678", "TEST_TOKEN");

        assertThat(event.isPasswordMismatch(rawPassword)).isTrue();
    }

    @DisplayName("이름을 수정한다.")
    @Test
    void renameTest() {
        Event event = new Event("이름", "1234", "TEST_TOKEN");

        event.rename("새로운 이름");

        assertThat(event.getName()).isEqualTo("새로운 이름");
    }

    @DisplayName("계좌 정보에 은행 이름과 계좌 번호가 모두 포함된다.")
    @Test
    void changeAccountTest() {
        Event event = new Event("이름", "1234", "TEST_TOKEN");

        event.changeAccount("행대뱅크", "12345678");

        assertThat(event.getAccount()).isEqualTo("행대뱅크 12345678");
    }

    @DisplayName("계좌 정보에 은행 이름과 계좌 번호가 모두 포함되지 않으면 예외가 발생한다.")
    @Test
    void changeAccountTest1() {
        Event event = new Event("이름", "1234", "TEST_TOKEN");

        assertThatThrownBy(() -> event.changeAccount("행대뱅크", ""))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("은행 이름이 1자 이상 10자 이하면 예외가 발생하지 않는다.")
    @ParameterizedTest
    @ValueSource(strings = {"1", "1234567890"})
    void changeAccountTest2(String bankName) {
        Event event = new Event("이름", "1234", "TEST_TOKEN");

        assertThatCode(() -> event.changeAccount(bankName, "12345678"))
                .doesNotThrowAnyException();
    }

    @DisplayName("은행 이름이 1자 미만 10자 초과면 예외가 발생한다.")
    @ParameterizedTest
    @ValueSource(strings = {"", "  ", "12345678901"})
    void changeAccountTest3(String bankName) {
        Event event = new Event("이름", "1234", "TEST_TOKEN");

        assertThatThrownBy(() -> event.changeAccount(bankName, "12345678"))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("계좌 번호가 8자 이상 30자 이하면 예외가 발생하지 않는다.")
    @ParameterizedTest
    @ValueSource(strings = {"12345678", "123456789012345678901234567890"})
    void changeAccountTest4(String accountNumber) {
        Event event = new Event("이름", "1234", "TEST_TOKEN");

        assertThatCode(() -> event.changeAccount("행대뱅크", accountNumber))
                .doesNotThrowAnyException();
    }

    @DisplayName("계좌 번호가 8자 미만 30자 초과면 예외가 발생한다.")
    @ParameterizedTest
    @ValueSource(strings = {"", "  ", "1234567", "1234567890123456789012345678901"})
    void changeAccountTest5(String accountNumber) {
        Event event = new Event("이름", "1234", "TEST_TOKEN");

        assertThatThrownBy(() -> event.changeAccount("행대뱅크", accountNumber))
                .isInstanceOf(HaengdongException.class);
    }
}
