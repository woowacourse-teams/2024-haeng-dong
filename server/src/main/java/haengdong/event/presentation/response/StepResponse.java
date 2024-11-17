package haengdong.event.presentation.response;

import java.util.List;
import haengdong.event.application.response.StepAppResponse;

public record StepResponse(
        List<BillResponse> bills,
        List<MemberResponse> members
) {

    public static StepResponse of(StepAppResponse response) {
        List<BillResponse> bills = response.bills().stream()
                .map(BillResponse::of)
                .toList();

        List<MemberResponse> members = response.members().stream()
                .map(MemberResponse::of)
                .toList();
        return new StepResponse(bills, members);
    }
}

