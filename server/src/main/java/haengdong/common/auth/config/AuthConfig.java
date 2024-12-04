package haengdong.common.auth.config;

import haengdong.common.auth.TokenProvider;
import haengdong.common.auth.application.AuthService;
import haengdong.common.auth.infrastructure.AuthenticationExtractor;
import haengdong.common.auth.infrastructure.JwtTokenProvider;
import haengdong.common.properties.JwtProperties;
import haengdong.event.application.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@RequiredArgsConstructor
@EnableConfigurationProperties({JwtProperties.class})
@Configuration
public class AuthConfig {

    private final JwtProperties jwtProperties;
    private final EventService eventService;

    @Bean
    public AuthService authService() {
        return new AuthService(tokenProvider(), eventService);
    }

    @Bean
    public TokenProvider tokenProvider() {
        return new JwtTokenProvider(jwtProperties);
    }

    @Bean
    public AuthenticationExtractor authenticationExtractor() {
        return new AuthenticationExtractor();
    }
}
