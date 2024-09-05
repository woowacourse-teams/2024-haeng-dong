package server.haengdong.application;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.MemberActionsSaveAppRequest;
import server.haengdong.application.response.CurrentMemberAppResponse;
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
public class MemberActionService {

    private final MemberActionFactory memberActionFactory;
    private final MemberActionRepository memberActionRepository;
    private final EventRepository eventRepository;
    private final BillActionRepository billActionRepository;

    @Transactional
    public void saveMemberAction(String token, MemberActionsSaveAppRequest request) {
        Event event = findEvent(token);

        List<MemberAction> findMemberActions = memberActionRepository.findAllByEvent(event);
        CurrentMembers currentMembers = CurrentMembers.of(findMemberActions);
        Sequence sequence = createStartSequence(event);
        List<MemberAction> memberActions = memberActionFactory.createMemberActions(event, request, currentMembers,
                sequence);
        memberActionRepository.saveAll(memberActions);
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

        List<BillAction> billActions = billActionRepository.findByEvent(event);
        billActions.forEach(billAction -> resetBillAction(event, billAction));
    }

    @Transactional
    public void deleteMemberAction(String token, Long id) {
        Event event = eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
        MemberAction memberAction = memberActionRepository.findByIdAndEvent(id, event);

        memberActionRepository.deleteAllByMemberNameAndMinSequence(memberAction.getMemberName(),
                memberAction.getSequence().getValue());

        List<BillAction> billActions = billActionRepository.findByEventAndGreaterThanSequence(event,
                memberAction.getSequence().getValue());
        billActions.forEach(billAction -> resetBillAction(event, billAction));
    }

    private void resetBillAction(Event event, BillAction billAction) {
        List<MemberAction> memberActions = memberActionRepository.findByEventAndSequence(event,
                billAction.getSequence().getValue());
        CurrentMembers currentMembers = CurrentMembers.of(memberActions);

        billAction.resetBillActionDetails(currentMembers);
    }
}
