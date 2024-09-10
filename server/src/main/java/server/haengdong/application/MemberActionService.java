package server.haengdong.application;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.response.CurrentMemberAppResponse;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.BillActionRepository;
import server.haengdong.domain.action.CurrentMembers;
import server.haengdong.domain.action.Member;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionRepository;
import server.haengdong.domain.action.MemberActionStatus;
import server.haengdong.domain.action.MemberRepository;
import server.haengdong.domain.action.Sequence;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberActionService {

    private final MemberActionRepository memberActionRepository;
    private final EventRepository eventRepository;
    private final BillActionRepository billActionRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void saveMemberOutAction(String token, List<Long> memberIds) {
        Event event = findEvent(token);

        List<MemberAction> findMemberActions = memberActionRepository.findAllByMember_Event(event);
        CurrentMembers currentMembers = CurrentMembers.of(findMemberActions);
        Sequence sequence = createStartSequence(event);

        validateMemberIdsUnique(memberIds);
        List<Member> members = memberIds
                .stream()
                .map(memberId -> memberRepository.findById(memberId)
                        .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.MEMBER_NOT_EXIST))
                )
                .toList();

        List<MemberAction> memberActions = createMemberActions(members, currentMembers, sequence,
                MemberActionStatus.IN);
        memberActionRepository.saveAll(memberActions);
    }

    private void validateMemberIdsUnique(List<Long> memberIds) {
        long uniqueCount = memberIds.stream().distinct().count();
        if (uniqueCount != memberIds.size()) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_DUPLICATE);
        }
    }

    @Transactional
    public void saveMemberInAction(String token, List<String> memberNames) {
        Event event = findEvent(token);

        List<MemberAction> findMemberActions = memberActionRepository.findAllByMember_Event(event);
        CurrentMembers currentMembers = CurrentMembers.of(findMemberActions);
        Sequence sequence = createStartSequence(event);

        validateMemberNamesUnique(memberNames);
        List<Member> members = memberNames.stream()
                .map(memberName ->
                        memberRepository.findByEventAndName(event, memberName)
                                .orElseGet(() -> {
                                    Member savedMember = new Member(event, memberName);
                                    memberRepository.save(savedMember);
                                    return savedMember;
                                })
                )
                .toList();
        List<MemberAction> memberActions = createMemberActions(members, currentMembers, sequence,
                MemberActionStatus.IN);
        memberActionRepository.saveAll(memberActions);
    }

    public List<MemberAction> createMemberActions(
            List<Member> members,
            CurrentMembers currentMembers,
            Sequence sequence,
            MemberActionStatus status
    ) {
        members.forEach(member -> currentMembers.validate(member, status));

        List<MemberAction> createdMemberActions = new ArrayList<>();
        for (Member member : members) {
            MemberAction memberAction = new MemberAction(member, sequence, status);
            createdMemberActions.add(memberAction);
            sequence = sequence.next();
        }

        return createdMemberActions;
    }

    private void validateMemberNamesUnique(List<String> memberNames) {
        long uniqueCount = memberNames.stream().distinct().count();
        if (uniqueCount != memberNames.size()) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_DUPLICATE);
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

    public List<CurrentMemberAppResponse> getCurrentMembers(String token) {
        Event event = findEvent(token);
        List<MemberAction> findMemberActions = memberActionRepository.findAllByMember_Event(event);
        CurrentMembers currentMembers = CurrentMembers.of(findMemberActions);

        return currentMembers.getMembers()
                .stream()
                .map(CurrentMemberAppResponse::of)
                .toList();
    }

    private Event findEvent(String token) {
        return eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
    }

    @Transactional
    public void deleteMemberAction(String token, Long id) {
        Event event = eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
        MemberAction memberAction = memberActionRepository.findByIdAndMember_Event(id, event);

        memberActionRepository.deleteAllByMemberAndMinSequence(memberAction.getMember(),
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
