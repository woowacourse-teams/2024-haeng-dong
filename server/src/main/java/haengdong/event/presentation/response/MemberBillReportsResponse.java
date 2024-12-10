package haengdong.event.presentation.response;

import java.util.List;
import haengdong.event.application.response.MemberBillReportAppResponse;

public record MemberBillReportsResponse(List<MemberBillReportResponse> reports) {

    public static MemberBillReportsResponse of(List<MemberBillReportAppResponse> memberBillReports) {
        List<MemberBillReportResponse> reports = memberBillReports.stream()
                .map(MemberBillReportResponse::of)
                .toList();

        return new MemberBillReportsResponse(reports);
    }
}
