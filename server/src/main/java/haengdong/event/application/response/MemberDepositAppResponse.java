package haengdong.event.application.response;

import haengdong.event.domain.event.member.EventMember;

public record MemberDepositAppResponse(
        Long id,
        String name,
        boolean isDeposited
) {

    public static MemberDepositAppResponse of(EventMember eventMember) {
        return new MemberDepositAppResponse(eventMember.getId(), eventMember.getName(), eventMember.isDeposited());
    }
}
