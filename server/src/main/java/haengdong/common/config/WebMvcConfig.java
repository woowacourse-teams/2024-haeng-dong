package haengdong.common.config;

import haengdong.common.auth.application.AuthService;
import haengdong.common.auth.infrastructure.AdminInterceptor;
import haengdong.common.auth.infrastructure.AuthenticationExtractor;
import haengdong.common.auth.infrastructure.AuthenticationPrincipalArgumentResolver;
import haengdong.common.properties.CorsProperties;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
@EnableConfigurationProperties({CorsProperties.class})
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final AuthService authService;
    private final AuthenticationExtractor authenticationExtractor;
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

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(authenticationPrincipalArgumentResolver());
    }

    @Bean
    public AdminInterceptor adminInterceptor() {
        return new AdminInterceptor(authService, authenticationExtractor);
    }

    @Bean
    public AuthenticationPrincipalArgumentResolver authenticationPrincipalArgumentResolver() {
        return new AuthenticationPrincipalArgumentResolver(authService, authenticationExtractor);
    }
}
