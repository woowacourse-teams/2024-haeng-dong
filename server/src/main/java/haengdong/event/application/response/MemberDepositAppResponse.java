package haengdong.event.application.response;

import haengdong.event.domain.event.member.EventMember;
import haengdong.user.domain.Nickname;

public record MemberDepositAppResponse(
        Long id,
        Nickname name,
        boolean isDeposited
) {

    public static MemberDepositAppResponse of(EventMember eventMember) {
        return new MemberDepositAppResponse(eventMember.getId(), eventMember.getName(), eventMember.isDeposited());
    }
}
