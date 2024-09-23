package server.haengdong.application;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.MemberSaveAppRequest;
import server.haengdong.application.request.MemberUpdateAppRequest;
import server.haengdong.application.request.MembersSaveAppRequest;
import server.haengdong.application.request.MembersUpdateAppRequest;
import server.haengdong.application.response.MemberAppResponse;
import server.haengdong.application.response.MembersDepositAppResponse;
import server.haengdong.application.response.MembersSaveAppResponse;
import server.haengdong.domain.bill.Bill;
import server.haengdong.domain.bill.BillDetailRepository;
import server.haengdong.domain.bill.BillRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.domain.member.Member;
import server.haengdong.domain.member.MemberRepository;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final EventRepository eventRepository;
    private final BillRepository billRepository;
    private final BillDetailRepository billDetailRepository;

    @Transactional
    public MembersSaveAppResponse saveMembers(String token, MembersSaveAppRequest request) {
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

    public List<MemberAppResponse> getCurrentMembers(String token) {
        Event event = getEvent(token);

        return billRepository.findFirstByEventOrderByIdDesc(event)
                .map(Bill::getMembers)
                .orElseGet(() -> memberRepository.findAllByEvent(event))
                .stream()
                .map(MemberAppResponse::of)
                .toList();
    }

    private void validateMemberSave(List<String> memberNames, Event event) {
        if (memberNamesDuplicated(memberNames)) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_DUPLICATE,
                    "중복된 이름이 존재합니다. 입력된 이름: " + memberNames);
        }
        if (memberRepository.findAllByEvent(event).stream()
                .anyMatch(member -> memberNames.contains(member.getName()))) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_ALREADY_EXIST);
        }
    }

    public MembersDepositAppResponse findAllMembers(String token) {
        Event event = getEvent(token);

        List<Member> members = memberRepository.findAllByEvent(event);

        return MembersDepositAppResponse.of(members);
    }

    @Transactional
    public void updateMembers(String token, MembersUpdateAppRequest request) {
        Event event = getEvent(token);
        validateMemberUpdate(request);

        List<Member> updatedMembers = request.members().stream()
                .map(memberRequest -> memberRequest.toMember(event))
                .toList();
        List<Member> eventMembers = memberRepository.findAllByEvent(event);

        validateUpdatedMembersExist(eventMembers, updatedMembers);
        validateUpdatedNamesUnique(eventMembers, updatedMembers);
        memberRepository.saveAll(updatedMembers);
    }

    private Event getEvent(String token) {
        return eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
    }

    private void validateMemberUpdate(MembersUpdateAppRequest request) {
        validateChangedNameUnique(request.members());
        validateMemberUnique(request.members());
    }

    private void validateChangedNameUnique(List<MemberUpdateAppRequest> members) {
        List<String> memberNames = members.stream()
                .map(MemberUpdateAppRequest::name)
                .toList();
        if (memberNamesDuplicated(memberNames)) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_CHANGE_DUPLICATE);
        }
    }

    private boolean memberNamesDuplicated(List<String> memberNames) {
        return memberNames.size() != Set.copyOf(memberNames).size();
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

    private void validateUpdatedMembersExist(List<Member> eventMembers, List<Member> updatedMembers) {
        Set<Member> members = new HashSet<>(eventMembers);

        if (!members.containsAll(updatedMembers)) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NOT_FOUND);
        }
    }

    private void validateUpdatedNamesUnique(List<Member> eventMembers, List<Member> updatedMembers) {
        Set<String> eventMemberNames = eventMembers.stream()
                .map(Member::getName)
                .collect(Collectors.toSet());

        boolean memberNameDuplicated = updatedMembers.stream()
                .map(Member::getName)
                .anyMatch(eventMemberNames::contains);

        if (memberNameDuplicated) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_DUPLICATE);
        }
    }

    @Transactional
    public void deleteMember(String token, Long memberId) {
        memberRepository.findById(memberId)
                .ifPresent(member -> deleteMember(token, member));
    }

    private void deleteMember(String token, Member member) {
        Event event = member.getEvent();
        if (event.isTokenMismatch(token)) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NOT_FOUND);
        }

        billRepository.findAllByEvent(event).stream()
                .filter(bill -> bill.containMember(member))
                .forEach(bill -> bill.removeMemberBillDetail(member));
        billDetailRepository.deleteAllByMember(member);
        memberRepository.delete(member);
    }
}
