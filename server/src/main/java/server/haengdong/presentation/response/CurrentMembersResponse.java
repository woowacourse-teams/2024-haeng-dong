package server.haengdong.presentation.response;

import java.util.List;
import server.haengdong.application.response.LastBillMemberAppResponse;
import server.haengdong.application.response.MemberAppResponse;

public record CurrentMembersResponse(List<MemberResponse> members) {

    public static CurrentMembersResponse of(List<LastBillMemberAppResponse> currentMembers) {
        List<MemberResponse> responses = currentMembers.stream()
                .map(MemberResponse::of)
                .toList();

        return new CurrentMembersResponse(responses);
    }
}
