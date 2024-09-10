package server.haengdong.application;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.MemberNameUpdateAppRequest;
import server.haengdong.application.request.MemberNamesUpdateAppRequest;
import server.haengdong.application.response.MembersAppResponse;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.BillActionRepository;
import server.haengdong.domain.action.CurrentMembers;
import server.haengdong.domain.action.Member;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionRepository;
import server.haengdong.domain.action.MemberRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final EventRepository eventRepository;
    private final MemberActionRepository memberActionRepository;
    private final BillActionRepository billActionRepository;

    public MembersAppResponse findAllMembers(String token) {
        Event event = getEvent(token);

        List<Member> members = memberRepository.findAllByEvent(event);

        return MembersAppResponse.of(members);
    }

    @Transactional
    public void updateMember(String token, MemberNamesUpdateAppRequest request) {
        Event event = getEvent(token);

        validateUpdateMemberName(request);
        List<Member> eventsMembers = memberRepository.findAllByEvent(event);

        for (MemberNameUpdateAppRequest member : request.members()) {
            eventsMembers.stream()
                    .filter(eventMember -> eventMember.isId(member.id()))
                    .findFirst()
                    .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.MEMBER_NOT_EXIST))
                    .updateName(member.name());
        }

        validateEventMemberNameUnique(eventsMembers);
    }

    private Event getEvent(String token) {
        return eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
    }

    private void validateUpdateMemberName(MemberNamesUpdateAppRequest request) {
        validateChangedNameUnique(request.members());
        validateMemberUnique(request.members());
    }

    private void validateChangedNameUnique(List<MemberNameUpdateAppRequest> members) {
        List<String> memberNames = members.stream()
                .map(MemberNameUpdateAppRequest::name)
                .distinct()
                .toList();
        if (members.size() != memberNames.size()) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_CHANGE_DUPLICATE);
        }
    }

    private void validateMemberUnique(List<MemberNameUpdateAppRequest> members) {
        List<Long> memberIds = members.stream()
                .map(MemberNameUpdateAppRequest::id)
                .distinct()
                .toList();
        if (members.size() != memberIds.size()) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_CHANGE_DUPLICATE);
        }
    }

    private static void validateEventMemberNameUnique(List<Member> eventsMembers) {
        List<String> memberNames = eventsMembers.stream()
                .map(Member::getName)
                .distinct()
                .toList();
        if (memberNames.size() != eventsMembers.size()) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_DUPLICATE);
        }
    }

    @Transactional
    public void deleteMember(String token, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.MEMBER_NOT_EXIST));
        Event event = member.getEvent();
        if (event.isTokenMismatch(token)) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NOT_EXIST);
        }
        memberActionRepository.deleteAllByMember(member);

        List<BillAction> billActions = billActionRepository.findByEvent(event);
        billActions.forEach(billAction -> resetBillAction(event, billAction));
    }

    private void resetBillAction(Event event, BillAction billAction) {
        List<MemberAction> memberActions = memberActionRepository.findByEventAndSequence(event,
                billAction.getSequence().getValue());
        CurrentMembers currentMembers = CurrentMembers.of(memberActions);

        billAction.resetBillActionDetails(currentMembers);
    }
}
