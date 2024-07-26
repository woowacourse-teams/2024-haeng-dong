package server.haengdong.presentation.response;

import server.haengdong.application.response.MemberBillReportAppResponse;

public record MemberBillReportResponse(String name, Long price) {

    public static MemberBillReportResponse of(MemberBillReportAppResponse memberBillReportAppResponse) {
        return new MemberBillReportResponse(memberBillReportAppResponse.name(), memberBillReportAppResponse.price());
    }
}
