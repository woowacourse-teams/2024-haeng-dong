package haengdong.event.application.response;

import java.util.List;
import java.util.stream.Collectors;
import haengdong.event.domain.bill.BillDetail;

public record BillDetailsAppResponse(List<BillDetailAppResponse> billDetails) {

    public static BillDetailsAppResponse of(List<BillDetail> billDetails) {
        return billDetails.stream()
                .map(BillDetailAppResponse::of)
                .collect(Collectors.collectingAndThen(Collectors.toList(), BillDetailsAppResponse::new));
    }
}
