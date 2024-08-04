package server.haengdong.domain.event;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Event {

    private static final int MIN_NAME_LENGTH = 2;
    private static final int MAX_NAME_LENGTH = 20;
    private static final String SPACES = "  ";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String token;

    public Event(String name, String token) {
        validateName(name);
        this.name = name;
        this.token = token;
    }

    private void validateName(String name) {
        int nameLength = name.length();
        if (nameLength < MIN_NAME_LENGTH || MAX_NAME_LENGTH < nameLength) {
            throw new HaengdongException(HaengdongErrorCode.BAD_REQUEST,
                    String.format("행사 이름은 %d자 이상 %d자 이하만 입력 가능합니다. 입력한 이름 길이 : %d",
                            MIN_NAME_LENGTH,
                            MAX_NAME_LENGTH,
                            name.length()));
        }
        if (isBlankContinuous(name)) {
            throw new HaengdongException(HaengdongErrorCode.BAD_REQUEST,
                    String.format("행사 이름에는 공백 문자가 연속될 수 없습니다. 입력한 이름 : %s", name));
        }
    }

    private boolean isBlankContinuous(String name) {
        return name.contains(SPACES);
    }

    public boolean isTokenMismatch(String token) {
        return !this.token.equals(token);
    }
}
