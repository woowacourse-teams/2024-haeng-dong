package server.haengdong.presentation.response;

import java.util.List;
import server.haengdong.application.response.CurrentMemberAppResponse;

public record CurrentMembersResponse(List<CurrentMemberResponse> members) {

    public static CurrentMembersResponse of(List<CurrentMemberAppResponse> currentMembers) {
        List<CurrentMemberResponse> responses = currentMembers.stream()
                .map(CurrentMemberResponse::of)
                .toList();

        return new CurrentMembersResponse(responses);
    }
}
