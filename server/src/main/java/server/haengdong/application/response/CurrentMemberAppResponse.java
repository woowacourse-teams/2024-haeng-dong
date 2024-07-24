package server.haengdong.application.response;

import server.haengdong.domain.action.MemberAction;

public record CurrentMemberAppResponse(String name) {

    public static CurrentMemberAppResponse of(MemberAction memberAction) {
        return new CurrentMemberAppResponse(memberAction.getMemberName());
    }
}
