package haengdong.user.domain;

import haengdong.common.exception.HaengdongErrorCode;
import haengdong.common.exception.HaengdongException;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EqualsAndHashCode
@Embeddable
public class Nickname {

    public static final int MAX_NAME_LENGTH = 8;
    private static final int MIN_NAME_LENGTH = 1;

    @Column(nullable = false, length = MAX_NAME_LENGTH)
    private String value;

    public Nickname(String value) {
        validateName(value);
        this.value = value;
    }

    private void validateName(String name) {
        int nameLength = name.length();
        if (nameLength < MIN_NAME_LENGTH || nameLength > MAX_NAME_LENGTH) {
            throw new HaengdongException(
                    HaengdongErrorCode.MEMBER_NAME_LENGTH_INVALID, MIN_NAME_LENGTH,
                    MAX_NAME_LENGTH);
        }
    }
}
