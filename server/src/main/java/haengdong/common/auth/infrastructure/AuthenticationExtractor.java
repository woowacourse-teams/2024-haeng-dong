package haengdong.common.auth.infrastructure;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Arrays;
import haengdong.common.exception.AuthenticationException;
import haengdong.common.exception.HaengdongErrorCode;

public class AuthenticationExtractor {

    public String extract(HttpServletRequest request, String cookieName) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            throw new AuthenticationException(HaengdongErrorCode.TOKEN_NOT_FOUND);
        }

        return Arrays.stream(cookies)
                .filter(cookie -> cookieName.equals(cookie.getName()))
                .findFirst()
                .orElseThrow(() -> new AuthenticationException(HaengdongErrorCode.TOKEN_NOT_FOUND))
                .getValue();
    }
}
