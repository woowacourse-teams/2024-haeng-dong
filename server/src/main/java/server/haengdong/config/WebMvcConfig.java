package server.haengdong.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import server.haengdong.application.AuthService;
import server.haengdong.domain.TokenProvider;
import server.haengdong.infrastructure.auth.AuthenticationExtractor;
import server.haengdong.infrastructure.auth.JwtTokenProvider;
import server.haengdong.infrastructure.auth.TokenProperties;

@RequiredArgsConstructor
@EnableConfigurationProperties(TokenProperties.class)
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final TokenProperties tokenProperties;

    @Value("${cors.max-age}")
    private Long maxAge;

    @Value("${cors.allowed-origins}")
    private String[] allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(maxAge);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(adminInterceptor())
                .addPathPatterns("/api/admin/**");
    }

    @Bean
    public AdminInterceptor adminInterceptor() {
        return new AdminInterceptor(authService(), authenticationExtractor());
    }

    @Bean
    public AuthService authService() {
        return new AuthService(tokenProvider());
    }

    @Bean
    public TokenProvider tokenProvider() {
        return new JwtTokenProvider(tokenProperties);
    }

    @Bean
    public AuthenticationExtractor authenticationExtractor() {
        return new AuthenticationExtractor();
    }
}
