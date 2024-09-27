package server.haengdong.presentation.response;

import server.haengdong.application.response.LastBillMemberAppResponse;
import server.haengdong.application.response.MemberAppResponse;

public record MemberResponse(
        Long id,
        String name
) {

    public static MemberResponse of(MemberAppResponse response) {
        return new MemberResponse(response.id(), response.name());
    }

    public static MemberResponse of(LastBillMemberAppResponse response) {
        return new MemberResponse(response.id(), response.name());
    }
}
