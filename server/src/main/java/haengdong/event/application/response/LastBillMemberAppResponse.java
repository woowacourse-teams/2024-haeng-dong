package haengdong.event.application.response;

import haengdong.event.domain.event.member.EventMember;

public record LastBillMemberAppResponse(Long id, String name) {

    public static LastBillMemberAppResponse of(EventMember eventMember) {
        return new LastBillMemberAppResponse(eventMember.getId(), eventMember.getName());
    }
}
