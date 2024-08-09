package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotBlank;
import server.haengdong.application.request.MemberNameUpdateAppRequest;

public record MemberNameUpdateRequest(

        @NotBlank(message = "멤버 이름은 공백일 수 없습니다.")
        String before,

        @NotBlank(message = "멤버 이름은 공백일 수 없습니다.")
        String after
) {

    public MemberNameUpdateAppRequest toAppRequest() {
        return new MemberNameUpdateAppRequest(before, after);
    }
}
