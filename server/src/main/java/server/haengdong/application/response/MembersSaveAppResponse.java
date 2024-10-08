package server.haengdong.application.response;

import java.util.List;
import server.haengdong.domain.member.Member;

public record MembersSaveAppResponse(
        List<MemberSaveAppResponse> members
) {

    public static MembersSaveAppResponse of(List<Member> members) {
        return new MembersSaveAppResponse(
                members.stream()
                        .map(MemberSaveAppResponse::of)
                        .toList()
        );
    }
}
