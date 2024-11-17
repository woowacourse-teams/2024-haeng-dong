package haengdong.event.application;

import haengdong.common.exception.HaengdongErrorCode;
import haengdong.common.exception.HaengdongException;
import haengdong.event.application.request.BillAppRequest;
import haengdong.event.application.request.BillDetailsUpdateAppRequest;
import haengdong.event.application.request.BillUpdateAppRequest;
import haengdong.event.application.response.BillDetailsAppResponse;
import haengdong.event.application.response.StepAppResponse;
import haengdong.event.domain.bill.Bill;
import haengdong.event.domain.bill.BillDetail;
import haengdong.event.domain.bill.BillRepository;
import haengdong.event.domain.event.Event;
import haengdong.event.domain.event.EventRepository;
import haengdong.event.domain.event.member.EventMember;
import haengdong.event.domain.event.member.EventMemberRepository;
import haengdong.event.domain.step.Steps;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class BillService {

    private final BillRepository billRepository;
    private final EventRepository eventRepository;
    private final EventMemberRepository eventMemberRepository;

    @Transactional
    public void saveBill(String eventToken, BillAppRequest request) {
        Event event = getEvent(eventToken);
        List<Long> memberIds = request.memberIds();
        List<EventMember> eventMembers = memberIds.stream()
                .map(this::getMember)
                .toList();

        Bill bill = request.toBill(event, eventMembers);
        billRepository.save(bill);
    }

    public List<StepAppResponse> findSteps(String token) {
        Event event = getEvent(token);
        List<Bill> bills = billRepository.findAllByEvent(event);

        return createStepAppResponses(bills);
    }

    private List<StepAppResponse> createStepAppResponses(List<Bill> bills) {
        Steps steps = Steps.of(bills);
        return steps.getSteps().stream()
                .map(StepAppResponse::of)
                .toList();
    }

    @Transactional
    public void updateBill(String token, Long billId, BillUpdateAppRequest request) {
        Bill bill = getBill(billId);
        validateToken(token, bill);
        bill.update(request.title(), request.price());
    }

    @Transactional
    public void deleteBill(String token, Long billId) {
        Bill bill = getBill(billId);
        validateToken(token, bill);
        billRepository.deleteById(billId);
    }

    public BillDetailsAppResponse findBillDetails(String token, Long billId) {
        Bill bill = getBill(billId);
        validateToken(token, bill);

        List<BillDetail> billDetails = bill.getBillDetails();
        return BillDetailsAppResponse.of(billDetails);
    }

    @Transactional
    public void updateBillDetails(String token, Long billId, BillDetailsUpdateAppRequest request) {
        Bill bill = getBill(billId);
        validateToken(token, bill);

        List<BillDetail> billDetails = request.toBillDetails(bill);
        bill.updateDetails(billDetails);
    }

    private void validateToken(String token, Bill bill) {
        Event event = bill.getEvent();
        if (event.isTokenMismatch(token)) {
            throw new HaengdongException(HaengdongErrorCode.BILL_NOT_FOUND);
        }
    }

    private Event getEvent(String eventToken) {
        return eventRepository.findByToken(eventToken)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
    }

    private Bill getBill(Long billId) {
        return billRepository.findById(billId)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.BILL_NOT_FOUND));
    }

    private EventMember getMember(Long memberId) {
        return eventMemberRepository.findById(memberId)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.MEMBER_NOT_FOUND));
    }
}
