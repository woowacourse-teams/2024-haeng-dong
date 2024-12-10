package haengdong.event.application.response;

public record MemberBillReportAppResponse(
        Long memberId,
        String name,
        boolean isDeposited,
        Long price
) {
}
