package server.haengdong.application;


import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.MemberSaveAppRequest;
import server.haengdong.application.request.MembersSaveAppRequest;
import server.haengdong.application.request.MembersUpdateAppRequest;
import server.haengdong.application.response.MemberAppResponse;
import server.haengdong.application.response.MembersDepositAppResponse;
import server.haengdong.application.response.MembersSaveAppResponse;
import server.haengdong.domain.bill.BillDetailRepository;
import server.haengdong.domain.bill.BillRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.domain.member.Member;
import server.haengdong.domain.member.MemberRepository;
import server.haengdong.domain.member.UpdatedMembers;
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

    private void validateMemberSave(List<String> memberNames, Event event) {
        Set<String> uniqueMemberNames = Set.copyOf(memberNames);
        if (memberNames.size() != uniqueMemberNames.size()) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_DUPLICATE, memberNames);
        }
        if (isDuplicatedMemberNames(uniqueMemberNames, event)) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_ALREADY_EXIST);
        }
    }

    private boolean isDuplicatedMemberNames(Set<String> uniqueMemberNames, Event event) {
        return memberRepository.findAllByEvent(event).stream()
                .anyMatch(member -> uniqueMemberNames.contains(member.getName()));
    }

    public List<MemberAppResponse> getCurrentMembers(String token) {
        Event event = getEvent(token);

        List<Member> currentMembers = billRepository.findCurrentMembers(event);
        if (currentMembers.isEmpty()) {
            currentMembers = memberRepository.findAllByEvent(event);
        }
        return currentMembers.stream()
                .map(MemberAppResponse::of)
                .toList();
    }

    public MembersDepositAppResponse findAllMembers(String token) {
        Event event = getEvent(token);

        List<Member> members = memberRepository.findAllByEvent(event);

        return MembersDepositAppResponse.of(members);
    }

    @Transactional
    public void updateMembers(String token, MembersUpdateAppRequest request) {
        Event event = getEvent(token);
        UpdatedMembers updatedMembers = new UpdatedMembers(request.toMembers(event));
        List<Member> members = memberRepository.findAllByEvent(event);

        updatedMembers.validateUpdateAble(members);
        memberRepository.saveAll(updatedMembers.getMembers());
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

    private Event getEvent(String token) {
        return eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
    }
}
