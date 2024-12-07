package haengdong.event.application.request;

import java.util.List;
import haengdong.event.domain.event.Event;
import haengdong.event.domain.event.member.EventMember;

public record MembersUpdateAppRequest(List<MemberUpdateAppRequest> members) {

    public List<EventMember> toMembers(Event event) {
        return members.stream()
                .map(memberRequest -> memberRequest.toMember(event))
                .toList();
    }
}
