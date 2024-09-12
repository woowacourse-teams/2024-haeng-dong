package server.haengdong.application;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.BillAppRequest;
import server.haengdong.application.request.BillUpdateAppRequest;
import server.haengdong.application.response.LastBillMemberAppResponse;
import server.haengdong.application.response.StepAppResponse;
import server.haengdong.domain.action.Bill;
import server.haengdong.domain.action.BillRepository;
import server.haengdong.domain.action.Member;
import server.haengdong.domain.action.MemberRepository;
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
        List<Bill> bills = billRepository.findByEvent(event);

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

    private Event getEvent(String eventToken) {
        return eventRepository.findByToken(eventToken)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
    }

    private Bill getBill(Long billId) {
        return billRepository.findById(billId)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.BILL_NOT_FOUND));
    }

    public List<LastBillMemberAppResponse> getLastMembers(String token) {
        Event event = getEvent(token);

        return billRepository.findFirstByEventOrderByIdDesc(event)
                .map(Bill::getMembers)
                .orElseGet(() -> memberRepository.findAllByEvent(event))
                .stream()
                .map(LastBillMemberAppResponse::of)
                .toList();
    }
}
