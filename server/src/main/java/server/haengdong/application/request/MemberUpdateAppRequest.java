package server.haengdong.application.request;


import server.haengdong.domain.eventmember.EventMember;
import server.haengdong.domain.event.Event;

public record MemberUpdateAppRequest(
        Long id,
        String name,
        boolean isDeposited
) {

    public EventMember toMember(Event event) {
        return new EventMember(id, event, name, isDeposited);
    }
}
