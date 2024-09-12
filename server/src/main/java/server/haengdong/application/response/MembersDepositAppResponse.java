package server.haengdong.application.response;

import java.util.List;
import server.haengdong.domain.action.Member;

public record MembersDepositAppResponse(
        List<MemberDepositAppResponse> memberNames
) {

    public static MembersDepositAppResponse of(List<Member> members) {
        List<MemberDepositAppResponse> memberNames = members.stream()
                .map(MemberDepositAppResponse::of)
                .toList();

        return new MembersDepositAppResponse(memberNames);
    }
}
