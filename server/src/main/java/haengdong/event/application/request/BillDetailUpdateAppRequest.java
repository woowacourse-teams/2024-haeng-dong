package haengdong.event.application.request;

import haengdong.common.exception.HaengdongErrorCode;
import haengdong.common.exception.HaengdongException;
import haengdong.event.domain.bill.Bill;
import haengdong.event.domain.bill.BillDetail;
import haengdong.event.domain.event.member.EventMember;
import java.util.List;

public record BillDetailUpdateAppRequest(
        Long id,
        Long price,
        boolean isFixed
) {

    public BillDetail toBillDetail(Bill bill) {
        List<BillDetail> billDetails = bill.getBillDetails();

        return new BillDetail(bill, findEventMemberById(id, billDetails), price, isFixed);
    }

    private EventMember findEventMemberById(
            Long id, List<BillDetail> billDetails
    ) {
        return billDetails.stream()
                .filter(detail -> detail.isSameId(id))
                .findFirst()
                .map(BillDetail::getEventMember)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.BILL_DETAIL_NOT_FOUND));
    }
}
