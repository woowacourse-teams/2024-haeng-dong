package haengdong.event.application.response;

import haengdong.event.domain.event.member.EventMember;
import haengdong.user.domain.Nickname;

public record MemberSaveAppResponse(
        Long id,
        Nickname name
) {

    public static MemberSaveAppResponse of(EventMember eventMember) {
        return new MemberSaveAppResponse(eventMember.getId(), eventMember.getName());
    }
}
