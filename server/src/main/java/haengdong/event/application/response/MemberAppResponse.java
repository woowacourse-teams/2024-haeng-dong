package haengdong.event.application.response;

import haengdong.event.domain.event.member.EventMember;

public record MemberAppResponse(
        Long id,
        String name
) {

    public static MemberAppResponse of(EventMember eventMember) {
        return new MemberAppResponse(eventMember.getId(), eventMember.getName());
    }
}
