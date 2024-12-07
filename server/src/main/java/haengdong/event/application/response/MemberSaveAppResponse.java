package haengdong.event.application.response;

import haengdong.event.domain.event.member.EventMember;

public record MemberSaveAppResponse(
        Long id,
        String name
) {

    public static MemberSaveAppResponse of(EventMember eventMember) {
        return new MemberSaveAppResponse(eventMember.getId(), eventMember.getName());
    }
}
