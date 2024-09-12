package server.haengdong.application.request;


import server.haengdong.domain.action.Member;
import server.haengdong.domain.event.Event;

public record MemberUpdateAppRequest(Long id, String name, boolean isDeposited) {

    public Member toMember(Event event) {
        return new Member(id, event, name, isDeposited);
    }
}
