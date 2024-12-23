package haengdong.event.application.response;

import haengdong.event.domain.event.member.EventMember;
import haengdong.user.domain.Nickname;

public record MemberAppResponse(
        Long id,
        Nickname name
) {

    public static MemberAppResponse of(EventMember eventMember) {
        return new MemberAppResponse(eventMember.getId(), eventMember.getName());
    }
}
