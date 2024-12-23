package haengdong.event.presentation.response;

import haengdong.event.application.response.MemberBillReportAppResponse;

public record MemberBillReportResponse(
        Long memberId,
        String memberName,
        boolean isDeposited,
        Long price
) {

    public static MemberBillReportResponse of(MemberBillReportAppResponse memberBillReportAppResponse) {
        return new MemberBillReportResponse(
                memberBillReportAppResponse.memberId(),
                memberBillReportAppResponse.name().getValue(),
                memberBillReportAppResponse.isDeposited(),
                memberBillReportAppResponse.price()
        );
    }
}
