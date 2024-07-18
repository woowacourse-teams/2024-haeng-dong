package server.haengdong.application.request;

import server.haengdong.domain.MemberAction;
import server.haengdong.domain.MemberActionStatus;

public record MemberActionSaveAppRequest(String name, String status) {

    public MemberAction toMemberAction(Long memberGroupId) {
        return new MemberAction(name, MemberActionStatus.of(status), memberGroupId);
    }
}
