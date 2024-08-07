package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotBlank;
import server.haengdong.application.request.MemberUpdateAppRequest;

public record MemberUpdateRequest(

        @NotBlank(message = "멤버 이름은 공백일 수 없습니다.")
        String name
) {

    public MemberUpdateAppRequest toAppRequest() {
        return new MemberUpdateAppRequest(name);
    }
}
