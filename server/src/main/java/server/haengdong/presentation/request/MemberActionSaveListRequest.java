package server.haengdong.presentation.request;

import java.util.List;
import server.haengdong.application.request.MemberActionSaveAppRequest;
import server.haengdong.application.request.MemberActionSaveListAppRequest;

public record MemberActionSaveListRequest(List<MemberActionSaveRequest> actions, Long sequence) {

    public MemberActionSaveListAppRequest toAppRequest() {
        List<MemberActionSaveAppRequest> appRequests = actions.stream()
                .map(MemberActionSaveRequest::toAppRequest)
                .toList();

        return new MemberActionSaveListAppRequest(appRequests, sequence);
    }
}
