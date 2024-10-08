package server.haengdong.application.response;

import server.haengdong.domain.member.Member;

public record MemberAppResponse(
        Long id,
        String name
) {

    public static MemberAppResponse of(Member member) {
        return new MemberAppResponse(member.getId(), member.getName());
    }
}
