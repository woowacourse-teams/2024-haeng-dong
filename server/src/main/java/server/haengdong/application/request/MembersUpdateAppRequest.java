package server.haengdong.application.request;

import java.util.List;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.eventmember.EventMember;

public record MembersUpdateAppRequest(List<MemberUpdateAppRequest> members) {

    public List<EventMember> toMembers(Event event) {
        return members.stream()
                .map(memberRequest -> memberRequest.toMember(event))
                .toList();
    }
}
