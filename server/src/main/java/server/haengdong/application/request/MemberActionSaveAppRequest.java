package server.haengdong.application.request;

import server.haengdong.domain.Action;
import server.haengdong.domain.MemberAction;
import server.haengdong.domain.MemberActionStatus;

public record MemberActionSaveAppRequest(String name, String status) {

    public MemberAction toMemberAction(Action action, Long memberGroupId) {
        return new MemberAction(action, name, MemberActionStatus.of(status), memberGroupId);
    }
}
