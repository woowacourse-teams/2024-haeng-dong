package haengdong.event.presentation.response;

import java.util.List;
import haengdong.event.application.response.MemberAppResponse;

public record CurrentMembersResponse(List<MemberResponse> members) {

    public static CurrentMembersResponse of(List<MemberAppResponse> currentMembers) {
        List<MemberResponse> responses = currentMembers.stream()
                .map(MemberResponse::of)
                .toList();

        return new CurrentMembersResponse(responses);
    }
}
