package server.haengdong.infrastructure.auth;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Arrays;
import server.haengdong.exception.AuthenticationException;
import server.haengdong.exception.HaengdongErrorCode;

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
