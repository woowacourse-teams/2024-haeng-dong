package server.haengdong.presentation.request;

import jakarta.validation.Valid;
import java.util.List;
import server.haengdong.application.request.MemberNamesUpdateAppRequest;

public record MemberNamesUpdateRequest(
        @Valid List<MemberNameUpdateRequest> members
) {

    public MemberNamesUpdateAppRequest toAppRequest() {
        return new MemberNamesUpdateAppRequest(members.stream()
                .map(MemberNameUpdateRequest::toAppRequest)
                .toList());
    }
}
