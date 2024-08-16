package server.haengdong.application;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.BillActionDetailUpdateAppRequest;
import server.haengdong.application.request.BillActionDetailsUpdateAppRequest;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.BillActionDetail;
import server.haengdong.domain.action.BillActionDetailRepository;
import server.haengdong.domain.action.BillActionRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class BillActionDetailService {

    private final BillActionDetailRepository billActionDetailRepository;
    private final BillActionRepository billActionRepository;

    @Transactional
    public void updateBillActionDetails(String token, Long actionId, BillActionDetailsUpdateAppRequest request) {
        BillAction billAction = billActionRepository.findByAction_Id(actionId)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.BILL_ACTION_NOT_FOUND));

        List<BillActionDetailUpdateAppRequest> billActionDetailUpdateAppRequests = request.billActionDetailUpdateAppRequests();

        validateToken(token, billAction);
        validateTotalPrice(billActionDetailUpdateAppRequests, billAction);

        List<BillActionDetail> billActionDetails = billActionDetailRepository.findAllByBillAction(billAction);

        for (BillActionDetailUpdateAppRequest updateRequest : billActionDetailUpdateAppRequests) {
            BillActionDetail detailToUpdate = billActionDetails.stream()
                    .filter(detail -> detail.isSameName(updateRequest.name()))
                    .findFirst()
                    .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.BILL_ACTION_DETAIL_NOT_FOUND));

            detailToUpdate.updatePrice(updateRequest.price());
        }
    }

    private void validateToken(String token, BillAction billAction) {
        Event event = billAction.getEvent();
        if (event.isTokenMismatch(token)) {
            throw new HaengdongException(HaengdongErrorCode.BILL_ACTION_NOT_FOUND);
        }
    }

    private void validateTotalPrice(List<BillActionDetailUpdateAppRequest> billActionDetailUpdateAppRequests,
                                    BillAction billAction) {
        Long requestsPriceSum = calculateUpdatePriceSum(billActionDetailUpdateAppRequests);
        if (!billAction.isSamePrice(requestsPriceSum)) {
            throw new HaengdongException(HaengdongErrorCode.BILL_ACTION_PRICE_NOT_MATCHED);
        }
    }

    private Long calculateUpdatePriceSum(List<BillActionDetailUpdateAppRequest> billActionDetailUpdateAppRequests) {
        return billActionDetailUpdateAppRequests.stream()
                .map(BillActionDetailUpdateAppRequest::price)
                .reduce(0L, Long::sum);
    }
}
