package haengdong.user.application.request;

import jakarta.validation.constraints.NotBlank;
import haengdong.user.domain.User;

public record UserGuestSaveAppRequest(

        @NotBlank(message = "닉네임은 공백일 수 없습니다.")
        String nickname,

        @NotBlank(message = "비밀번호는 공백일 수 없습니다.")
        String password
) {
    public User toUser() {
        return User.createGuest(nickname, password);
    }
}
