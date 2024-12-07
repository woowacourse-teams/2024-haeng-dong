package haengdong.event.presentation.request;

import jakarta.validation.constraints.NotBlank;
import haengdong.event.application.request.EventLoginAppRequest;

public record EventLoginRequest(

        @NotBlank(message = "비밀번호는 공백일 수 없습니다.")
        String password
) {

    public EventLoginAppRequest toAppRequest(String token) {
        return new EventLoginAppRequest(token, password);
    }
}
