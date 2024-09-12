package server.haengdong.application.response;

import server.haengdong.domain.action.Member;

public record LastBillMemberAppResponse(Long id, String name) {

    public static LastBillMemberAppResponse of(Member member) {
        return new LastBillMemberAppResponse(member.getId(), member.getName());
    }
}
