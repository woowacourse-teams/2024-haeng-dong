package haengdong.user.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import haengdong.common.exception.HaengdongException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class UserTest {

    @DisplayName("계좌 정보에 은행 이름과 계좌 번호가 모두 포함된다.")
    @Test
    void changeAccountTest() {
        User user = User.createGuest("이름", "1234");

        user.changeAccount("토스뱅크", "12345678");

        assertAll(
                () -> assertThat(user.getBank().getName()).isEqualTo("토스뱅크"),
                () -> assertThat(user.getAccountNumber().getValue()).isEqualTo("12345678")
        );
    }

    @DisplayName("계좌 정보에 은행 이름과 계좌 번호가 모두 포함되지 않으면 예외가 발생한다.")
    @Test
    void changeAccountTest1() {
        User user = User.createGuest("이름", "1234");

        assertThatThrownBy(() -> user.changeAccount("행대뱅크", ""))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("지원하는 은행이면 예외가 발생하지 않는다.")
    @ParameterizedTest
    @ValueSource(strings = {"토스뱅크", "KB국민은행"})
    void changeAccountTest2(String bankName) {
        User user = User.createGuest("이름", "1234");

        assertThatCode(() -> user.changeAccount(bankName, "12345678"))
                .doesNotThrowAnyException();
    }

    @DisplayName("지원하지 않는 은행이면 예외가 발생한다.")
    @ParameterizedTest
    @ValueSource(strings = {"행대뱅크", "토스 뱅크", "망쵸뱅크", "KB 국민은행"})
    void changeAccountTest3(String bankName) {
        User user = User.createGuest("이름", "1234");

        assertThatThrownBy(() -> user.changeAccount(bankName, "12345678"))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("계좌 번호가 8자 이상 30자 이하면 예외가 발생하지 않는다.")
    @ParameterizedTest
    @ValueSource(strings = {"12345678", "123456789012345678901234567890"})
    void changeAccountTest4(String accountNumber) {
        User user = User.createGuest("이름", "1234");

        assertThatCode(() -> user.changeAccount("토스뱅크", accountNumber))
                .doesNotThrowAnyException();
    }

    @DisplayName("계좌 번호가 8자 미만 30자 초과면 예외가 발생한다.")
    @ParameterizedTest
    @ValueSource(strings = {"", "  ", "1234567", "1234567890123456789012345678901"})
    void changeAccountTest5(String accountNumber) {
        User user = User.createGuest("이름", "1234");

        assertThatThrownBy(() -> user.changeAccount("토스뱅크", accountNumber))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("계좌 정보를 조회한다.")
    @Test
    void getBankNameTest() {
        User user = User.createGuest("이름", "1234");

        user.changeAccount("토스뱅크", "12345678");

        assertAll(
                () -> assertThat(user.getBank().getName()).isEqualTo("토스뱅크"),
                () -> assertThat(user.getAccountNumber().getValue()).isEqualTo("12345678")
        );
    }

    @DisplayName("계좌 번호에 공백이 있어도 계좌 정보를 정상적으로 조회한다.")
    @Test
    void getBankNameTest1() {
        User user = User.createGuest("이름", "1234");

        user.changeAccount("토스뱅크", "1234 5678 9012");

        assertAll(
                () -> assertThat(user.getBank().getName()).isEqualTo("토스뱅크"),
                () -> assertThat(user.getAccountNumber().getValue()).isEqualTo("1234 5678 9012")
        );
    }
}
