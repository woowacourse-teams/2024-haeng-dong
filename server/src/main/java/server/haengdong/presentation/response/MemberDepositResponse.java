package server.haengdong.presentation.response;

import server.haengdong.application.response.MemberDepositAppResponse;

public record MemberDepositResponse(
        Long id,
        String name,
        boolean isDeposited
) {

    public static MemberDepositResponse of(MemberDepositAppResponse response) {
        return new MemberDepositResponse(response.id(), response.name(), response.isDeposited());
    }
}
