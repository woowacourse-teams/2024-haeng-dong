package haengdong.common.config;

import haengdong.common.auth.TokenProvider;
import haengdong.common.auth.application.AuthService;
import haengdong.common.auth.infrastructure.AuthenticationExtractor;
import haengdong.common.auth.infrastructure.JwtTokenProvider;
import haengdong.common.infrastructure.AdminInterceptor;
import haengdong.common.properties.CorsProperties;
import haengdong.common.properties.JwtProperties;
import haengdong.event.application.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
@EnableConfigurationProperties({JwtProperties.class, CorsProperties.class})
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final JwtProperties jwtProperties;
    private final EventService eventService;
    private final CorsProperties corsProperties;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(corsProperties.allowedOrigins())
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(corsProperties.maxAge());
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
