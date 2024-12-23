package haengdong.event.domain.event;

import haengdong.common.exception.HaengdongErrorCode;
import haengdong.common.exception.HaengdongException;
import jakarta.persistence.Embeddable;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EqualsAndHashCode
@Embeddable
public class Password {

    private static final int PASSWORD_LENGTH = 4;
    private static final Pattern PASSWORD_PATTERN = Pattern.compile(String.format("^\\d{%d}$", PASSWORD_LENGTH));
    private static final String HASH_ALGORITHM = "SHA-256";

    private String value;

    public Password(String password) {
        validatePassword(password);
        this.value = encode(password);
    }

    private void validatePassword(String password) {
        Matcher matcher = PASSWORD_PATTERN.matcher(password);
        if (!matcher.matches()) {
            throw new HaengdongException(HaengdongErrorCode.EVENT_PASSWORD_FORMAT_INVALID, PASSWORD_LENGTH);
        }
    }

    private String encode(String rawPassword) {
        try {
            MessageDigest digest = MessageDigest.getInstance(HASH_ALGORITHM);
            byte[] hashedPassword = digest.digest(rawPassword.getBytes());
            return Base64.getEncoder().encodeToString(hashedPassword);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalArgumentException("해시 알고리즘이 존재하지 않습니다.");
        }
    }

    public boolean matches(String rawPassword) {
        String hashedPassword = encode(rawPassword);
        return value.equals(hashedPassword);
    }
}
