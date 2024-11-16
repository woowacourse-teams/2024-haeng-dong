package server.haengdong.application.response;

import server.haengdong.domain.eventmember.EventMember;

public record MemberDepositAppResponse(
        Long id,
        String name,
        boolean isDeposited
) {

    public static MemberDepositAppResponse of(EventMember eventMember) {
        return new MemberDepositAppResponse(eventMember.getId(), eventMember.getName(), eventMember.isDeposited());
    }
}
