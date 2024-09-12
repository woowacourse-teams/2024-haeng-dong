package server.haengdong.application.response;

import server.haengdong.domain.action.Member;

public record MemberSaveAppResponse(
        Long id,
        String name
) {
    public static MemberSaveAppResponse of(Member member) {
        return new MemberSaveAppResponse(member.getId(), member.getName());
    }
}
