package server.haengdong.application.response;

import java.util.List;
import server.haengdong.domain.action.Member;

public record MembersDepositAppResponse(
        List<MemberDepositAppResponse> members
) {

    public static MembersDepositAppResponse of(List<Member> members) {
        return new MembersDepositAppResponse(members.stream()
                .map(MemberDepositAppResponse::of)
                .toList());
    }
}
