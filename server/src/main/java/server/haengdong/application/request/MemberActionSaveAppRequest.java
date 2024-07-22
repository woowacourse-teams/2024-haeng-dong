package server.haengdong.application.request;

import server.haengdong.domain.action.Action;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionStatus;

public record MemberActionSaveAppRequest(String name, String status) {

    public MemberAction toMemberAction(Action action, Long memberGroupId) {
        return new MemberAction(action, name, MemberActionStatus.of(status), memberGroupId);
    }
}
