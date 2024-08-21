package server.haengdong.application;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.MemberActionsSaveAppRequest;
import server.haengdong.application.response.CurrentMemberAppResponse;
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
public class MemberActionService {

    private final MemberActionFactory memberActionFactory;
    private final MemberActionRepository memberActionRepository;
    private final EventRepository eventRepository;
    private final ActionRepository actionRepository;
    private final BillActionDetailRepository billActionDetailRepository;
    private final BillActionRepository billActionRepository;

    @Transactional
    public void saveMemberAction(String token, MemberActionsSaveAppRequest request) {
        Event event = findEvent(token);

        List<MemberAction> findMemberActions = memberActionRepository.findAllByEvent(event);
        CurrentMembers currentMembers = CurrentMembers.of(findMemberActions);
        Action action = createStartAction(event);
        List<MemberAction> memberActions = memberActionFactory.createMemberActions(request, currentMembers, action);
        memberActionRepository.saveAll(memberActions);
    }

    private Action createStartAction(Event event) {
        return actionRepository.findLastByEvent(event)
                .map(Action::next)
                .orElse(Action.createFirst(event));
    }

    public List<CurrentMemberAppResponse> getCurrentMembers(String token) {
        Event event = findEvent(token);
        List<MemberAction> findMemberActions = memberActionRepository.findAllByEvent(event);
        CurrentMembers currentMembers = CurrentMembers.of(findMemberActions);

        return currentMembers.getMembers()
                .stream()
                .map(CurrentMemberAppResponse::new)
                .toList();
    }

    private Event findEvent(String token) {
        return eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
    }

    @Transactional
    public void deleteMember(String token, String memberName) {
        Event event = eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));

        memberActionRepository.deleteAllByEventAndMemberName(event, memberName);

        List<BillAction> billActions = billActionRepository.findByAction_Event(event);
        billActions.forEach(billAction -> resetBillAction(event, billAction));
    }

    @Transactional
    public void deleteMemberAction(String token, Long actionId) {
        Event event = eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
        Action action = actionRepository.findByIdAndEvent(actionId, event)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.ACTION_NOT_FOUND));
        MemberAction memberAction = memberActionRepository.findByAction(action)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.MEMBER_ACTION_NOT_FOUND));

        memberActionRepository.deleteAllByMemberNameAndMinSequence(memberAction.getMemberName(),
                memberAction.getSequence());

        List<BillAction> billActions = billActionRepository.findByEventAndGreaterThanSequence(event,
                action.getSequence());
        billActions.forEach(billAction -> resetBillAction(event, billAction));
    }

    private void resetBillAction(Event event, BillAction billAction) {
        List<MemberAction> memberActions = memberActionRepository.findByEventAndSequence(event,
                billAction.getSequence());
        CurrentMembers currentMembers = CurrentMembers.of(memberActions);

        billActionDetailRepository.deleteAllByBillAction(billAction);

        if (currentMembers.isNotEmpty()) {
            Long price = billAction.getPrice();
            int currentMemberCount = currentMembers.size();
            long eachPrice = price / currentMemberCount;
            long remainder = price % currentMemberCount;
            List<BillActionDetail> billActionDetails = getBillActionDetails(
                    billAction,
                    currentMembers,
                    eachPrice,
                    remainder
            );
            billActionDetailRepository.saveAll(billActionDetails);
        }
    }

    private List<BillActionDetail> getBillActionDetails(
            BillAction billAction,
            CurrentMembers currentMembers,
            long eachPrice,
            long remainder
    ) {
        List<String> members = currentMembers.getMembers().stream().toList();
        List<BillActionDetail> billActionDetails = IntStream.range(0, members.size() - 1)
                .mapToObj(index -> new BillActionDetail(billAction, members.get(index), eachPrice, false))
                .collect(Collectors.toList());
        BillActionDetail lastBillActionDetail = new BillActionDetail(billAction, members.get(members.size() - 1),
                eachPrice + remainder, false);
        billActionDetails.add(lastBillActionDetail);

        return billActionDetails;
    }
}
