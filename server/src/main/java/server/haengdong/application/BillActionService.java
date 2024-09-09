package server.haengdong.application;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.BillActionAppRequest;
import server.haengdong.application.request.BillActionUpdateAppRequest;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.BillActionRepository;
import server.haengdong.domain.action.CurrentMembers;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionRepository;
import server.haengdong.domain.action.Sequence;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class BillActionService {

    private final BillActionRepository billActionRepository;
    private final MemberActionRepository memberActionRepository;
    private final EventRepository eventRepository;

    @Transactional
    public void saveAllBillAction(String eventToken, List<BillActionAppRequest> requests) {
        Event event = getEvent(eventToken);
        Sequence sequence = createStartSequence(event);
        List<MemberAction> findMemberActions = memberActionRepository.findAllByEvent(event);
        CurrentMembers currentMembers = CurrentMembers.of(findMemberActions);

        for (BillActionAppRequest request : requests) {
            BillAction billAction = request.toBillAction(event, sequence, currentMembers);
            billActionRepository.save(billAction);
            sequence = sequence.next();
        }
    }

    private Sequence createStartSequence(Event event) {
        Sequence memberActionSequence = memberActionRepository.findLastByEvent(event)
                .map(MemberAction::getSequence)
                .orElseGet(Sequence::createFirst);
        Sequence billActionSequence = billActionRepository.findLastByEvent(event)
                .map(BillAction::getSequence)
                .orElseGet(Sequence::createFirst);
        return Sequence.getGreater(memberActionSequence, billActionSequence).next();
    }

    @Transactional
    public void updateBillAction(String token, Long billActionId, BillActionUpdateAppRequest request) {
        BillAction billAction = getBillAction(billActionId);

        validateToken(token, billAction);

        billAction.update(request.title(), request.price());
    }

    private void validateToken(String token, BillAction billAction) {
        Event event = billAction.getEvent();
        if (event.isTokenMismatch(token)) {
            throw new HaengdongException(HaengdongErrorCode.BILL_ACTION_NOT_FOUND);
        }
    }

    @Transactional
    public void deleteBillAction(String token, Long billActionId) {
        BillAction billAction = getBillAction(billActionId);
        validateToken(token, billAction);
        billActionRepository.deleteById(billActionId);
    }

    private Event getEvent(String eventToken) {
        return eventRepository.findByToken(eventToken)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
    }

    private BillAction getBillAction(Long billActionId) {
        return billActionRepository.findById(billActionId)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.BILL_ACTION_NOT_FOUND));
    }
}
