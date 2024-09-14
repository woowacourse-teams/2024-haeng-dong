package server.haengdong.application;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.MemberSaveAppRequest;
import server.haengdong.application.request.MemberUpdateAppRequest;
import server.haengdong.application.request.MembersSaveAppRequest;
import server.haengdong.application.request.MembersUpdateAppRequest;
import server.haengdong.application.response.MembersDepositAppResponse;
import server.haengdong.application.response.MembersSaveAppResponse;
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
public class MemberService {

    private final MemberRepository memberRepository;
    private final EventRepository eventRepository;
    private final BillRepository billRepository;

    public MembersSaveAppResponse saveAllMembers(String token, MembersSaveAppRequest request) {
        Event event = getEvent(token);
        List<String> memberNames = request.members().stream()
                .map(MemberSaveAppRequest::name)
                .toList();

        validateMemberSave(memberNames, event);

        List<Member> members = memberNames.stream()
                .map(name -> new Member(event, name))
                .toList();

        List<Member> savedMembers = memberRepository.saveAll(members);
        return MembersSaveAppResponse.of(savedMembers);
    }

    private void validateMemberSave(List<String> memberNames, Event event) {
        if (memberNames.size() != Set.copyOf(memberNames).size()) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_DUPLICATE);
        }
        if (memberRepository.findAllByEvent(event).stream()
                .anyMatch(member -> memberNames.contains(member.getName()))) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_DUPLICATE);
        }
    }

    public MembersDepositAppResponse findAllMembers(String token) {
        Event event = getEvent(token);

        List<Member> members = memberRepository.findAllByEvent(event);

        return MembersDepositAppResponse.of(members);
    }

    @Transactional
    public void updateMember(String token, MembersUpdateAppRequest request) {
        Event event = getEvent(token);

        validateUpdateMemberName(request);
        Set<Member> eventMembers = new HashSet<>(memberRepository.findAllByEvent(event));
        List<Member> changedMembers = request.members().stream()
                .map(memberRequest -> memberRequest.toMember(event))
                .toList();
        if (!eventMembers.containsAll(changedMembers)) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NOT_FOUND);
        }
        memberRepository.saveAll(changedMembers);
        validateEventMemberNameUnique(event);
    }

    private Event getEvent(String token) {
        return eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
    }

    private void validateUpdateMemberName(MembersUpdateAppRequest request) {
        validateChangedNameUnique(request.members());
        validateMemberUnique(request.members());
    }

    private void validateChangedNameUnique(List<MemberUpdateAppRequest> members) {
        List<String> memberNames = members.stream()
                .map(MemberUpdateAppRequest::name)
                .distinct()
                .toList();
        if (members.size() != memberNames.size()) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_CHANGE_DUPLICATE);
        }
    }

    private void validateMemberUnique(List<MemberUpdateAppRequest> members) {
        List<Long> memberIds = members.stream()
                .map(MemberUpdateAppRequest::id)
                .distinct()
                .toList();
        if (members.size() != memberIds.size()) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_CHANGE_DUPLICATE);
        }
    }

    private void validateEventMemberNameUnique(Event event) {
        List<Member> members = memberRepository.findAllByEvent(event);
        List<String> memberNames = members.stream()
                .map(Member::getName)
                .distinct()
                .toList();
        if (memberNames.size() != members.size()) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_DUPLICATE);
        }
    }

    @Transactional
    public void deleteMember(String token, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.MEMBER_NOT_FOUND));
        Event event = member.getEvent();
        if (event.isTokenMismatch(token)) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NOT_FOUND);
        }

        billRepository.findByEvent(event).stream()
                .filter(bill -> bill.containMember(member))
                .forEach(bill -> bill.removeMember(member));

        memberRepository.delete(member);
    }
}