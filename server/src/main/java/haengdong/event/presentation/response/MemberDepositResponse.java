package haengdong.event.presentation.response;

import haengdong.event.application.response.MemberDepositAppResponse;

public record MemberDepositResponse(
        Long id,
        String name,
        boolean isDeposited
) {

    public static MemberDepositResponse of(MemberDepositAppResponse response) {
        return new MemberDepositResponse(response.id(), response.name().getValue(), response.isDeposited());
    }
}
