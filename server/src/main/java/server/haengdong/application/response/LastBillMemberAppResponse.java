package server.haengdong.application.response;

import server.haengdong.domain.eventmember.EventMember;

public record LastBillMemberAppResponse(Long id, String name) {

    public static LastBillMemberAppResponse of(EventMember eventMember) {
        return new LastBillMemberAppResponse(eventMember.getId(), eventMember.getName());
    }
}
