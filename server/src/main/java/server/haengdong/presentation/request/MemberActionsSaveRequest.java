package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotBlank;
import java.util.List;
import server.haengdong.application.request.MemberActionSaveAppRequest;
import server.haengdong.application.request.MemberActionsSaveAppRequest;

public record MemberActionsSaveRequest(
        List<String> members,

        @NotBlank
        String status
) {

    public MemberActionsSaveAppRequest toAppRequest() {
        List<MemberActionSaveAppRequest> appRequests = members.stream()
                .map(name -> new MemberActionSaveAppRequest(name, status))
                .toList();

        return new MemberActionsSaveAppRequest(appRequests);
    }
}
