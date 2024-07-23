package server.haengdong.presentation.request;

import java.util.List;
import server.haengdong.application.request.MemberActionSaveAppRequest;
import server.haengdong.application.request.MemberActionsSaveAppRequest;

public record MemberActionsSaveRequest(List<MemberActionSaveRequest> actions) {

    public MemberActionsSaveAppRequest toAppRequest() {
        List<MemberActionSaveAppRequest> appRequests = actions.stream()
                .map(MemberActionSaveRequest::toAppRequest)
                .toList();

        return new MemberActionsSaveAppRequest(appRequests);
    }
}
