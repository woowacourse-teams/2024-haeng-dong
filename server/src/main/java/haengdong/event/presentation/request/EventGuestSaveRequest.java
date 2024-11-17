package haengdong.event.presentation.request;

import jakarta.validation.constraints.NotBlank;
import haengdong.event.application.request.EventGuestAppRequest;

public record EventGuestSaveRequest(

        @NotBlank(message = "행사 이름은 공백일 수 없습니다.")
        String eventName,

        @NotBlank(message = "행사 이름은 공백일 수 없습니다.")
        String nickname,

        @NotBlank(message = "비밀번호는 공백일 수 없습니다.")
        String password
) {

    public EventGuestAppRequest toAppRequest() {
        return new EventGuestAppRequest(eventName, nickname, password);
    }
}
