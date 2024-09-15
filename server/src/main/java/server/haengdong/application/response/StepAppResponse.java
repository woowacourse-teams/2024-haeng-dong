package server.haengdong.application.response;

import java.util.List;
import server.haengdong.domain.bill.Bill;

public record StepAppResponse(
        List<BillAppResponse> bills,
        List<MemberAppResponse> members
) {
    public static StepAppResponse of(List<Bill> bills) {
        List<BillAppResponse> billAppResponses = bills.stream()
                .map(BillAppResponse::of)
                .toList();

        List<MemberAppResponse> memberAppResponses = bills.get(0).getMembers().stream()
                .map(MemberAppResponse::of)
                .toList();

        return new StepAppResponse(billAppResponses, memberAppResponses);
    }
}
