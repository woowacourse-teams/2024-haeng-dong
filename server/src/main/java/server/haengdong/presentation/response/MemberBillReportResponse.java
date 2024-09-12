package server.haengdong.presentation.response;

import server.haengdong.application.response.MemberBillReportAppResponse;

public record MemberBillReportResponse(
        Long memberId,
        String name,
        boolean isDeposited,
        Long price
) {

    public static MemberBillReportResponse of(MemberBillReportAppResponse memberBillReportAppResponse) {
        return new MemberBillReportResponse(
                memberBillReportAppResponse.memberId(),
                memberBillReportAppResponse.name(),
                memberBillReportAppResponse.isDeposited(),
                memberBillReportAppResponse.price()
        );
    }
}
