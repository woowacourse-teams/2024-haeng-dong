package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotBlank;
import server.haengdong.application.request.EventAppRequest;

public record EventSaveRequest(

        @NotBlank(message = "행사 이름은 공백일 수 없습니다.")
        String eventName,

        @NotBlank(message = "비밀번호는 공백일 수 없습니다.")
        String password
) {

    public EventAppRequest toAppRequest() {
        return new EventAppRequest(eventName, password);
    }
}
