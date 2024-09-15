package server.haengdong.application;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.BillAppRequest;
import server.haengdong.application.request.BillDetailUpdateAppRequest;
import server.haengdong.application.request.BillDetailsUpdateAppRequest;
import server.haengdong.application.request.BillUpdateAppRequest;
import server.haengdong.application.response.BillDetailsAppResponse;
import server.haengdong.application.response.StepAppResponse;
import server.haengdong.domain.bill.Bill;
import server.haengdong.domain.bill.BillDetail;
import server.haengdong.domain.bill.BillRepository;
import server.haengdong.domain.member.Member;
import server.haengdong.domain.member.MemberRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class BillService {

    private final BillRepository billRepository;
    private final EventRepository eventRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void saveBill(String eventToken, BillAppRequest request) {
        Event event = getEvent(eventToken);
        List<Long> memberIds = request.memberIds();
        List<Member> members = memberIds.stream()
                .map(this::findMember)
                .toList();

        Bill bill = request.toBill(event, members);
        billRepository.save(bill);
    }

    private Member findMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.MEMBER_NOT_FOUND));
    }

    public List<StepAppResponse> findSteps(String token) {
        Event event = getEvent(token);
        List<Bill> bills = billRepository.findAllByEvent(event);

        return createStepAppResponses(bills);
    }

    private List<StepAppResponse> createStepAppResponses(List<Bill> bills) {
        return divideByMembers(bills).stream()
                .map(StepAppResponse::of)
                .toList();
    }

    private static List<List<Bill>> divideByMembers(List<Bill> bills) {
        List<List<Bill>> split = new ArrayList<>();
        for (Bill bill : bills) {
            if (split.isEmpty()) {
                List<Bill> temp = new ArrayList<>();
                temp.add(bill);
                split.add(temp);
                continue;
            }
            List<Bill> bills1 = split.get(split.size() - 1);
            Bill find = bills1.get(0);
            if (find.isSameMembers(bill)) {
                bills1.add(bill);
            } else {
                List<Bill> temp = new ArrayList<>();
                temp.add(bill);
                split.add(temp);
            }
        }
        return split;
    }

    @Transactional
    public void updateBill(String token, Long billId, BillUpdateAppRequest request) {
        Bill bill = getBill(billId);

        validateToken(token, bill);

        bill.update(request.title(), request.price());
    }

    private void validateToken(String token, Bill bill) {
        Event event = bill.getEvent();
        if (event.isTokenMismatch(token)) {
            throw new HaengdongException(HaengdongErrorCode.BILL_NOT_FOUND);
        }
    }

    @Transactional
    public void deleteBill(String token, Long billId) {
        Bill bill = getBill(billId);
        validateToken(token, bill);
        billRepository.deleteById(billId);
    }

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
        validateBillDetailSize(billDetailUpdateAppRequests, bill);
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

    private void validateBillDetailSize(List<BillDetailUpdateAppRequest> requests, Bill bill) {
        List<Long> ids = requests.stream()
                .map(BillDetailUpdateAppRequest::id)
                .distinct()
                .toList();
        if (bill.getBillDetails().size() != ids.size()) {
            throw new HaengdongException(HaengdongErrorCode.BILL_DETAIL_NOT_FOUND);
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

    private Event getEvent(String eventToken) {
        return eventRepository.findByToken(eventToken)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
    }

    private Bill getBill(Long billId) {
        return billRepository.findById(billId)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.BILL_NOT_FOUND));
    }
}
