package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotBlank;
import server.haengdong.application.request.MemberUpdateAppRequest;

public record MemberUpdateRequest(@NotBlank String name) {

    public MemberUpdateAppRequest toAppRequest() {
        return new MemberUpdateAppRequest(name);
    }
}
