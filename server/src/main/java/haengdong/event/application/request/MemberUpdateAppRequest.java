package haengdong.event.application.request;


import haengdong.event.domain.event.member.EventMember;
import haengdong.event.domain.event.Event;

public record MemberUpdateAppRequest(
        Long id,
        String name,
        boolean isDeposited
) {

    public EventMember toMember(Event event) {
        return new EventMember(id, event, name, isDeposited);
    }
}
