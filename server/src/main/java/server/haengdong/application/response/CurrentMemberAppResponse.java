package server.haengdong.application.response;

import server.haengdong.domain.action.Member;

public record CurrentMemberAppResponse(Long id, String name) {

    public static CurrentMemberAppResponse of(Member member) {
        return new CurrentMemberAppResponse(member.getId(), member.getName());
    }
}
