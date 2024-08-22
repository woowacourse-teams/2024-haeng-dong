package server.haengdong.presentation.response;

import java.util.List;
import server.haengdong.application.response.CurrentMemberAppResponse;

public record CurrentMembersResponse(List<String> memberNames) {

    public static CurrentMembersResponse of(List<CurrentMemberAppResponse> currentMembers) {
        List<String> responses = currentMembers.stream()
                .map(CurrentMemberAppResponse::name)
                .toList();

        return new CurrentMembersResponse(responses);
    }
}
