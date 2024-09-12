package server.haengdong.application;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.BillDetailUpdateAppRequest;
import server.haengdong.application.request.BillDetailsUpdateAppRequest;
import server.haengdong.application.response.BillDetailsAppResponse;
import server.haengdong.domain.action.Bill;
import server.haengdong.domain.action.BillDetail;
import server.haengdong.domain.action.BillRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class BillDetailService {

    private final BillRepository billRepository;

    public BillDetailsAppResponse findBillDetails(String token, Long billId) {
        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.BILL_NOT_FOUND));
        validateToken(token, bill);

        List<BillDetail> billDetails = bill.getBillDetails();
        return BillDetailsAppResponse.of(billDetails);
    }

    @Transactional
    public void updateBillDetails(String token, Long billId, BillDetailsUpdateAppRequest request) {
        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.BILL_NOT_FOUND));

        List<BillDetailUpdateAppRequest> billDetailUpdateAppRequests = request.billDetailUpdateAppRequests();

        validateToken(token, bill);
        validateTotalPrice(billDetailUpdateAppRequests, bill);

        List<BillDetail> billDetails = bill.getBillDetails();

        for (BillDetailUpdateAppRequest updateRequest : billDetailUpdateAppRequests) {
            BillDetail detailToUpdate = billDetails.stream()
                    .filter(detail -> detail.isSameId(updateRequest.id()))
                    .findFirst()
                    .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.BILL_DETAIL_NOT_FOUND));

            detailToUpdate.updatePrice(updateRequest.price());
            detailToUpdate.updateIsFixed(updateRequest.isFixed());
        }
    }

    private void validateToken(String token, Bill bill) {
        Event event = bill.getEvent();
        if (event.isTokenMismatch(token)) {
            throw new HaengdongException(HaengdongErrorCode.BILL_NOT_FOUND);
        }
    }

    private void validateTotalPrice(
            List<BillDetailUpdateAppRequest> billDetailUpdateAppRequests,
            Bill bill
    ) {
        Long requestsPriceSum = calculateUpdatePriceSum(billDetailUpdateAppRequests);
        if (!bill.isSamePrice(requestsPriceSum)) {
            throw new HaengdongException(HaengdongErrorCode.BILL_PRICE_NOT_MATCHED);
        }
    }

    private Long calculateUpdatePriceSum(List<BillDetailUpdateAppRequest> billDetailUpdateAppRequests) {
        return billDetailUpdateAppRequests.stream()
                .map(BillDetailUpdateAppRequest::price)
                .reduce(0L, Long::sum);
    }
}
