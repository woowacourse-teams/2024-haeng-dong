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
import server.haengdong.domain.bill.Bill;
import server.haengdong.domain.bill.BillRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.domain.eventmember.EventMember;
import server.haengdong.domain.eventmember.EventMemberRepository;
import server.haengdong.domain.eventmember.UpdatedMembers;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class EventMemberService {

    private final EventMemberRepository eventMemberRepository;
    private final EventRepository eventRepository;
    private final BillRepository billRepository;

    @Transactional
    public MembersSaveAppResponse saveMembers(String token, MembersSaveAppRequest request) {
        Event event = getEvent(token);
        List<String> memberNames = request.members().stream()
                .map(MemberSaveAppRequest::name)
                .toList();

        validateMemberSave(memberNames, event);

        List<EventMember> eventMembers = memberNames.stream()
                .map(name -> new EventMember(event, name))
                .toList();

        List<EventMember> savedEventMembers = eventMemberRepository.saveAll(eventMembers);
        return MembersSaveAppResponse.of(savedEventMembers);
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
        return eventMemberRepository.findAllByEvent(event).stream()
                .anyMatch(member -> uniqueMemberNames.contains(member.getName()));
    }

    public List<MemberAppResponse> getCurrentMembers(String token) {
        Event event = getEvent(token);

        return billRepository.findFirstByEventOrderByIdDesc(event)
                .map(Bill::getMembers)
                .orElseGet(() -> eventMemberRepository.findAllByEvent(event))
                .stream()
                .map(MemberAppResponse::of)
                .toList();
    }

    public MembersDepositAppResponse findAllMembers(String token) {
        Event event = getEvent(token);

        List<EventMember> eventMembers = eventMemberRepository.findAllByEvent(event);

        return MembersDepositAppResponse.of(eventMembers);
    }

    @Transactional
    public void updateMembers(String token, MembersUpdateAppRequest request) {
        Event event = getEvent(token);
        UpdatedMembers updatedMembers = new UpdatedMembers(request.toMembers(event));
        List<EventMember> originEventMembers = eventMemberRepository.findAllByEvent(event);

        updatedMembers.validateUpdatable(originEventMembers);
        eventMemberRepository.saveAll(updatedMembers.getMembers());
    }

    @Transactional
    public void deleteMember(String token, Long memberId) {
        eventMemberRepository.findById(memberId)
                .ifPresent(member -> deleteMember(token, member));
    }

    private void deleteMember(String token, EventMember eventMember) {
        Event event = eventMember.getEvent();
        if (event.isTokenMismatch(token)) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NOT_FOUND);
        }

        billRepository.findAllByEvent(event).stream()
                .filter(bill -> bill.containMember(eventMember))
                .forEach(bill -> bill.removeMemberBillDetail(eventMember));
        billRepository.flush();
        eventMemberRepository.delete(eventMember);
    }

    private Event getEvent(String token) {
        return eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
    }
}
