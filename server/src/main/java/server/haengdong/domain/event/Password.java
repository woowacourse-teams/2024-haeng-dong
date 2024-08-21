package server.haengdong.domain.event;

import jakarta.persistence.Embeddable;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Embeddable
public class Password {

    public static final int PASSWORD_LENGTH = 4;
    private static final Pattern PASSWORD_PATTERN = Pattern.compile(String.format("^\\d{%d}$", PASSWORD_LENGTH));
    private static final String HASH_ALGORITHM = "SHA-256";

    private String value;

    public Password(String password) {
        validatePassword(password);
        try {
            MessageDigest digest = MessageDigest.getInstance(HASH_ALGORITHM);
            byte[] hashedPassword = digest.digest(password.getBytes());
            this.value = Base64.getEncoder().encodeToString(hashedPassword);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalArgumentException("해시 알고리즘이 존재하지 않습니다.");
        }
    }

    private void validatePassword(String password) {
        Matcher matcher = PASSWORD_PATTERN.matcher(password);
        if (!matcher.matches()) {
            throw new HaengdongException(HaengdongErrorCode.EVENT_PASSWORD_FORMAT_INVALID, "비밀번호는 4자리 숫자만 가능합니다.");
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Password password = (Password) o;
        return Objects.equals(this.value, password.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}
