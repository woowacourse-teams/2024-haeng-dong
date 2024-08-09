package server.haengdong.domain.event;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Event {

    public static final int MIN_NAME_LENGTH = 1;
    public static final int MAX_NAME_LENGTH = 20;
    public static final int PASSWORD_LENGTH = 4;
    private static final String SPACES = "  ";
    private static final Pattern PASSWORD_PATTERN = Pattern.compile(String.format("^\\d{%d}$", PASSWORD_LENGTH));

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String password;

    private String token;

    public Event(String name, String password, String token) {
        validateName(name);
        validatePassword(password);
        this.name = name;
        this.password = password;
        this.token = token;
    }

    private void validateName(String name) {
        int nameLength = name.trim().length();
        if (nameLength < MIN_NAME_LENGTH || MAX_NAME_LENGTH < nameLength) {
            throw new HaengdongException(HaengdongErrorCode.EVENT_NAME_LENGTH_INVALID,
                    String.format("행사 이름은 %d자 이상 %d자 이하만 입력 가능합니다. 입력한 이름 길이 : %d",
                            MIN_NAME_LENGTH,
                            MAX_NAME_LENGTH,
                            name.length()));
        }
        if (isBlankContinuous(name)) {
            throw new HaengdongException(HaengdongErrorCode.EVENT_NAME_CONSECUTIVE_SPACES,
                    String.format("행사 이름에는 공백 문자가 연속될 수 없습니다. 입력한 이름 : %s", name));
        }
    }

    private void validatePassword(String password) {
        Matcher matcher = PASSWORD_PATTERN.matcher(password);
        if (!matcher.matches()) {
            throw new HaengdongException(HaengdongErrorCode.EVENT_PASSWORD_FORMAT_INVALID, "비밀번호는 4자리 숫자만 가능합니다.");
        }
    }

    private boolean isBlankContinuous(String name) {
        return name.contains(SPACES);
    }

    public boolean isTokenMismatch(String token) {
        return !this.token.equals(token);
    }

    public boolean isNotSamePassword(String password) {
        return !this.password.equals(password);
    }
}
