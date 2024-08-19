package server.haengdong.presentation.response;

import java.util.List;
import java.util.stream.Collectors;
import server.haengdong.application.response.BillActionDetailsAppResponse;

public record BillActionDetailsResponse(
        List<BillActionDetailResponse> members
) {

    public static BillActionDetailsResponse of(BillActionDetailsAppResponse billActionDetailsAppResponse) {
        return billActionDetailsAppResponse.billActionDetailAppResponses().stream()
                .map(BillActionDetailResponse::of)
                .collect(Collectors.collectingAndThen(Collectors.toList(), BillActionDetailsResponse::new));
    }
}
