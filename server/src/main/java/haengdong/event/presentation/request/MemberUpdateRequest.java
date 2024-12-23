package haengdong.event.presentation.request;

import haengdong.user.domain.Nickname;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import haengdong.event.application.request.MemberUpdateAppRequest;

public record MemberUpdateRequest(

        @NotNull(message = "멤버 ID는 공백일 수 없습니다.")
        Long id,

        @NotBlank(message = "멤버 이름은 공백일 수 없습니다.")
        String name,

        @NotNull(message = "입금 여부는 공백일 수 없습니다.")
        boolean isDeposited
) {

    public MemberUpdateAppRequest toAppRequest() {
        return new MemberUpdateAppRequest(id, new Nickname(name), isDeposited);
    }
}
