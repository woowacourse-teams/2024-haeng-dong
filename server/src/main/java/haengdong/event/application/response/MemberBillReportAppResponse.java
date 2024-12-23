package haengdong.event.application.response;

import haengdong.user.domain.Nickname;

public record MemberBillReportAppResponse(
        Long memberId,
        Nickname name,
        boolean isDeposited,
        Long price
) {
}
