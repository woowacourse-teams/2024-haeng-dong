package server.haengdong.presentation.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import server.haengdong.application.request.MembersUpdateAppRequest;

public record MembersUpdateRequest(

        @Valid
        @NotNull
        List<MemberUpdateRequest> members
) {

    public MembersUpdateAppRequest toAppRequest() {
        return new MembersUpdateAppRequest(members.stream()
                .map(MemberUpdateRequest::toAppRequest)
                .toList());
    }
}
