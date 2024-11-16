package server.haengdong.application.response;

import server.haengdong.domain.eventmember.EventMember;

public record MemberAppResponse(
        Long id,
        String name
) {

    public static MemberAppResponse of(EventMember eventMember) {
        return new MemberAppResponse(eventMember.getId(), eventMember.getName());
    }
}
