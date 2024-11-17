package haengdong.event.application.request;

import haengdong.event.domain.event.Event;
import haengdong.event.domain.event.member.EventMember;
import haengdong.event.domain.event.member.EventUniqueMembers;
import java.util.List;

public record MembersSaveAppRequest(
        List<MemberSaveAppRequest> members
) {
    public EventUniqueMembers toEventMembers(Event event) {
        List<EventMember> eventMembers = members.stream()
                .map(member -> new EventMember(event, member.name()))
                .toList();

        return new EventUniqueMembers(eventMembers);
    }
}
