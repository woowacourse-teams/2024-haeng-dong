package server.haengdong.config;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import server.haengdong.application.AuthService;
import server.haengdong.exception.AuthenticationException;
import server.haengdong.infrastructure.auth.AuthenticationExtractor;

class AdminInterceptorTest {

    private AuthService authService;
    private AuthenticationExtractor authenticationExtractor;
    private AdminInterceptor adminInterceptor;

    @BeforeEach
    public void setUp() {
        authService = mock(AuthService.class);
        authenticationExtractor = mock(AuthenticationExtractor.class);
        adminInterceptor = new AdminInterceptor(authService, authenticationExtractor);
    }

    @DisplayName("쿠키의 JWT 에서 eventToken 과 uri 의 eventToken 이 일치하면 관리자이다.")
    @Test
    void validateToken1() {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/admin/events/12345");
        MockHttpServletResponse response = new MockHttpServletResponse();
        when(authService.findEventIdByToken(any())).thenReturn("12345");

        boolean preHandle = adminInterceptor.preHandle(request, response, new Object());

        assertThat(preHandle).isTrue();
    }

    @DisplayName("쿠키의 JWT 에서 eventToken 과 uri 의 eventToken 이 일치하지 않으면 거절당한다.")
    @Test
    void validateToken2() {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/admin/events/12345");
        MockHttpServletResponse response = new MockHttpServletResponse();
        when(authService.findEventIdByToken(any())).thenReturn("125");

        assertThatThrownBy(() -> adminInterceptor.preHandle(request, response, new Object()))
                .isInstanceOf(AuthenticationException.class);
    }
}
