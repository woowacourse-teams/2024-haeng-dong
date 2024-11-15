package server.haengdong.application.response;

import java.util.List;
import server.haengdong.domain.eventmember.EventMember;

public record MembersDepositAppResponse(
        List<MemberDepositAppResponse> members
) {

    public static MembersDepositAppResponse of(List<EventMember> eventMembers) {
        return new MembersDepositAppResponse(eventMembers.stream()
                .map(MemberDepositAppResponse::of)
                .toList());
    }
}
