package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotBlank;
import server.haengdong.application.request.EventLoginAppRequest;

public record EventLoginRequest(

        @NotBlank
        String password
) {
        public EventLoginAppRequest toAppRequest(String token) {
                return new EventLoginAppRequest(token, password);
        }
}
