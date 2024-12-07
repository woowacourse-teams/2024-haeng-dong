package haengdong.user.presentation.request;

import jakarta.validation.constraints.NotBlank;
import haengdong.user.application.request.UserGuestSaveAppRequest;

public record UserGuestSaveRequest(

        @NotBlank(message = "닉네임은 공백일 수 없습니다.")
        String nickname,

        @NotBlank(message = "비밀번호는 공백일 수 없습니다.")
        String password
) {
    public UserGuestSaveAppRequest toAppRequest() {
        return new UserGuestSaveAppRequest(nickname, password);
    }
}
