package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import server.haengdong.application.request.MemberActionSaveAppRequest;
import server.haengdong.application.request.MemberActionsSaveAppRequest;

public record MemberActionsSaveRequest(

        @NotEmpty
        List<String> members,

        @NotBlank(message = "멤버 액션은 공백일 수 없습니다.")
        String status
) {

    public MemberActionsSaveAppRequest toAppRequest() {
        List<MemberActionSaveAppRequest> appRequests = members.stream()
                .map(name -> new MemberActionSaveAppRequest(name, status))
                .toList();

        return new MemberActionsSaveAppRequest(appRequests);
    }
}
