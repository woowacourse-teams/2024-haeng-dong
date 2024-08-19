package server.haengdong.application;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.BillActionAppRequest;
import server.haengdong.application.request.BillActionUpdateAppRequest;
import server.haengdong.domain.action.Action;
import server.haengdong.domain.action.ActionRepository;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.BillActionDetail;
import server.haengdong.domain.action.BillActionDetailRepository;
import server.haengdong.domain.action.BillActionRepository;
import server.haengdong.domain.action.CurrentMembers;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class BillActionService {

    private final BillActionRepository billActionRepository;
    private final BillActionDetailRepository billActionDetailRepository;
    private final MemberActionRepository memberActionRepository;
    private final ActionRepository actionRepository;
    private final EventRepository eventRepository;

    @Transactional
    public void saveAllBillAction(String eventToken, List<BillActionAppRequest> requests) {
        Event event = getEvent(eventToken);
        Action action = createStartAction(event);
        List<MemberAction> findMemberActions = memberActionRepository.findAllByEvent(event);
        CurrentMembers currentMembers = CurrentMembers.of(findMemberActions);

        for (BillActionAppRequest request : requests) {
            BillAction billAction = request.toBillAction(action);
            billActionRepository.save(billAction);
            action = action.next();
            if (currentMembers.isNotEmpty()) {
                saveBillActionDetails(billAction, currentMembers);
            }
        }
    }

    private Action createStartAction(Event event) {
        return actionRepository.findLastByEvent(event)
                .map(Action::next)
                .orElse(Action.createFirst(event));
    }

    private void saveBillActionDetails(BillAction billAction, CurrentMembers currentMembers) {
        long pricePerMember = billAction.getPrice() / currentMembers.size();
        currentMembers.getMembers().stream()
                .map(memberName -> new BillActionDetail(billAction, memberName, pricePerMember))
                .forEach(billActionDetailRepository::save);
    }

    @Transactional
    public void updateBillAction(String token, Long actionId, BillActionUpdateAppRequest request) {
        BillAction billAction = billActionRepository.findByAction_Id(actionId)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.BILL_ACTION_NOT_FOUND));

        validateToken(token, billAction);

        resetBillActionDetail(billAction, request.price());

        billAction.update(request.title(), request.price());
    }

    private void resetBillActionDetail(BillAction billAction, Long updatePrice) {
        if (billAction.getPrice() != updatePrice) {
            List<BillActionDetail> billActionDetails = billActionDetailRepository.findByBillAction(billAction);
            int memberCount = billActionDetails.size();
            if (memberCount != 0) {
                Long eachPrice = updatePrice / memberCount;
                billActionDetails.forEach(billActionDetail -> billActionDetail.updatePrice(eachPrice));
            }
        }
    }

    private void validateToken(String token, BillAction billAction) {
        Event event = billAction.getEvent();
        if (event.isTokenMismatch(token)) {
            throw new HaengdongException(HaengdongErrorCode.BILL_ACTION_NOT_FOUND);
        }
    }

    private Event getEvent(String eventToken) {
        return eventRepository.findByToken(eventToken)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
    }

    @Transactional
    public void deleteBillAction(String token, Long actionId) {
        Event event = eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));

        billActionDetailRepository.deleteByBillAction_Action_EventAndBillAction_ActionId(event, actionId);
        billActionRepository.deleteByAction_EventAndActionId(event, actionId);
    }
}
