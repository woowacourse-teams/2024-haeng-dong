package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotBlank;
import server.haengdong.application.request.EventLoginAppRequest;

public record EventLoginRequest(

        @NotBlank(message = "비밀번호는 공백일 수 없습니다.")
        String password
) {
    public EventLoginAppRequest toAppRequest(String token) {
        return new EventLoginAppRequest(token, password);
    }
}
