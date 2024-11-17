package haengdong.event.application.response;

import java.util.List;
import haengdong.event.domain.event.member.EventMember;

public record MembersDepositAppResponse(
        List<MemberDepositAppResponse> members
) {

    public static MembersDepositAppResponse of(List<EventMember> eventMembers) {
        return new MembersDepositAppResponse(eventMembers.stream()
                .map(MemberDepositAppResponse::of)
                .toList());
    }
}
