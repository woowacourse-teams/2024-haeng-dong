package haengdong.event.presentation.response;

import haengdong.event.application.response.LastBillMemberAppResponse;
import haengdong.event.application.response.MemberAppResponse;

public record MemberResponse(
        Long id,
        String name
) {

    public static MemberResponse of(MemberAppResponse response) {
        return new MemberResponse(response.id(), response.name().getValue());
    }

    public static MemberResponse of(LastBillMemberAppResponse response) {
        return new MemberResponse(response.id(), response.name().getValue());
    }
}
