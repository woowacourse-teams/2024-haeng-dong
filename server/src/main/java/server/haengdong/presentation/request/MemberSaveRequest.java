package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotBlank;

public record MemberSaveRequest(

        @NotBlank(message = "참여자 이름은 공백일 수 없습니다.")
        String name
) {
}
