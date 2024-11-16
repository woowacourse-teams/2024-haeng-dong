package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotBlank;

public record EventSaveRequest(
        @NotBlank(message = "행사 이름은 공백일 수 없습니다.")
        String eventName
) {
}
