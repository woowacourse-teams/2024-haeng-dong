package haengdong.event.presentation.response;

import java.util.List;
import haengdong.event.application.response.MembersDepositAppResponse;

public record MembersResponse(
        List<MemberDepositResponse> members
) {

    public static MembersResponse of(MembersDepositAppResponse response) {
        return new MembersResponse(response.members().stream()
                .map(MemberDepositResponse::of)
                .toList());
    }
}
