package haengdong.event.application.response;

import haengdong.event.domain.event.member.EventMember;
import haengdong.user.domain.Nickname;

public record LastBillMemberAppResponse(Long id, Nickname name) {

    public static LastBillMemberAppResponse of(EventMember eventMember) {
        return new LastBillMemberAppResponse(eventMember.getId(), eventMember.getName());
    }
}
