package haengdong.event.application;


import haengdong.common.exception.HaengdongErrorCode;
import haengdong.common.exception.HaengdongException;
import haengdong.event.application.request.MembersSaveAppRequest;
import haengdong.event.application.request.MembersUpdateAppRequest;
import haengdong.event.application.response.MemberAppResponse;
import haengdong.event.application.response.MembersDepositAppResponse;
import haengdong.event.application.response.MembersSaveAppResponse;
import haengdong.event.domain.bill.Bill;
import haengdong.event.domain.bill.BillRepository;
import haengdong.event.domain.event.Event;
import haengdong.event.domain.event.EventRepository;
import haengdong.event.domain.event.member.EventMember;
import haengdong.event.domain.event.member.EventMemberRepository;
import haengdong.event.domain.event.member.EventUniqueMembers;
import haengdong.event.domain.event.member.UpdatedMembers;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        EventUniqueMembers eventMembers = request.toEventMembers(event);
        validateDuplicateName(eventMembers, event);

        List<EventMember> savedEventMembers = eventMemberRepository.saveAll(eventMembers.getEventMembers());
        return MembersSaveAppResponse.of(savedEventMembers);
    }

    private void validateDuplicateName(EventUniqueMembers eventMembers, Event event) {
        List<EventMember> foundEventMembers = eventMemberRepository.findAllByEvent(event);
        if (eventMembers.containName(foundEventMembers)) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_ALREADY_EXIST);
        }
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

        deleteMembers(token, originEventMembers, updatedMembers);
        eventMemberRepository.saveAll(updatedMembers.getMembers());
    }

    private void deleteMembers(String token, List<EventMember> originEventMembers, UpdatedMembers updatedMembers) {
        for (EventMember originEventMember : originEventMembers) {
            if (!updatedMembers.contain(originEventMember)) {
                deleteMember(token, originEventMember);
            }
        }
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
