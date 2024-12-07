package haengdong.event.application.request;

import haengdong.event.domain.bill.Bill;
import haengdong.event.domain.bill.BillDetail;
import java.util.List;

public record BillDetailsUpdateAppRequest(
        List<BillDetailUpdateAppRequest> billDetailUpdateAppRequests
) {
    public List<BillDetail> toBillDetails(Bill bill) {
        return billDetailUpdateAppRequests.stream()
                .map(request -> request.toBillDetail(bill))
                .toList();
    }
}
