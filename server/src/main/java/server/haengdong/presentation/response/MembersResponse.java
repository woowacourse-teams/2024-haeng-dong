package server.haengdong.presentation.response;

import java.util.List;
import server.haengdong.application.response.MemberDepositAppResponse;
import server.haengdong.application.response.MembersDepositAppResponse;

public record MembersResponse(
        List<MemberDepositResponse> members
) {

    public static MembersResponse of(MembersDepositAppResponse response) {
        return new MembersResponse(response.memberNames().stream()
                .map(MemberDepositResponse::of)
                .toList());
    }
}
