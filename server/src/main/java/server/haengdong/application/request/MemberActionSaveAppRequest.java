package server.haengdong.application.request;

import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionStatus;
import server.haengdong.domain.action.Sequence;
import server.haengdong.domain.event.Event;

public record MemberActionSaveAppRequest(String name, String status) {

    public MemberAction toMemberAction(Event event, Sequence sequence) {
        return new MemberAction(event, sequence, name, MemberActionStatus.of(status));
    }
}
