package server.haengdong.application.response;

import server.haengdong.domain.member.Member;

public record MemberDepositAppResponse(
        Long id,
        String name,
        boolean isDeposited
) {

    public static MemberDepositAppResponse of(Member member) {
        return new MemberDepositAppResponse(member.getId(), member.getName(), member.isDeposited());
    }
}
