package server.haengdong.application.response;

import server.haengdong.domain.eventmember.EventMember;

public record MemberSaveAppResponse(
        Long id,
        String name
) {

    public static MemberSaveAppResponse of(EventMember eventMember) {
        return new MemberSaveAppResponse(eventMember.getId(), eventMember.getName());
    }
}
