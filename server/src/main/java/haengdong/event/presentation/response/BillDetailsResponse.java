package haengdong.event.presentation.response;

import java.util.List;
import java.util.stream.Collectors;
import haengdong.event.application.response.BillDetailsAppResponse;

public record BillDetailsResponse(
        List<BillDetailResponse> members
) {

    public static BillDetailsResponse of(BillDetailsAppResponse billDetailsAppResponse) {
        return billDetailsAppResponse.billDetails().stream()
                .map(BillDetailResponse::of)
                .collect(Collectors.collectingAndThen(Collectors.toList(), BillDetailsResponse::new));
    }
}
