package server.haengdong.application.response;

import java.util.List;
import java.util.stream.Collectors;
import server.haengdong.domain.action.BillActionDetail;

public record BillActionDetailsAppResponse(List<BillActionDetailAppResponse> billActionDetailAppResponses) {

    public static BillActionDetailsAppResponse of(List<BillActionDetail> billActionDetails) {
        return billActionDetails.stream()
                .map(BillActionDetailAppResponse::of)
                .collect(Collectors.collectingAndThen(Collectors.toList(), BillActionDetailsAppResponse::new));
    }
}
