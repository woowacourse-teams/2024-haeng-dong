package haengdong.domain.event;

import static org.assertj.core.api.Assertions.assertThatCode;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import haengdong.event.domain.event.Password;
import haengdong.common.exception.HaengdongException;

class PasswordTest {

    @DisplayName("비밀번호는 4자리 숫자 입니다.")
    @ParameterizedTest
    @ValueSource(strings = {"1", "12", "123", "12345", "adgd"})
    void validatePassword(String rawPassword) {
        assertThatCode(() -> new Password(rawPassword))
                .isInstanceOf(HaengdongException.class);
    }
}
