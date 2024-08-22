package server.haengdong.application;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.EventAppRequest;
import server.haengdong.application.request.EventLoginAppRequest;
import server.haengdong.application.request.MemberNameUpdateAppRequest;
import server.haengdong.application.request.MemberNamesUpdateAppRequest;
import server.haengdong.application.response.ActionAppResponse;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.application.response.EventDetailAppResponse;
import server.haengdong.application.response.MembersAppResponse;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.BillActionRepository;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.domain.event.EventTokenProvider;
import server.haengdong.exception.AuthenticationException;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class EventService {

    private final EventRepository eventRepository;
    private final EventTokenProvider eventTokenProvider;
    private final BillActionRepository billActionRepository;
    private final MemberActionRepository memberActionRepository;

    @Transactional
    public EventAppResponse saveEvent(EventAppRequest request) {
        String token = eventTokenProvider.createToken();
        Event event = request.toEvent(token);
        eventRepository.save(event);

        return EventAppResponse.of(event);
    }

    public EventDetailAppResponse findEvent(String token) {
        Event event = getEvent(token);

        return EventDetailAppResponse.of(event);
    }

    public List<ActionAppResponse> findActions(String token) {
        Event event = getEvent(token);

        List<BillAction> billActions = billActionRepository.findByAction_Event(event).stream()
                .sorted(Comparator.comparing(BillAction::getSequence)).toList();
        List<MemberAction> memberActions = memberActionRepository.findAllByEvent(event).stream()
                .sorted(Comparator.comparing(MemberAction::getSequence)).toList();

        return getActionAppResponses(billActions, memberActions);
    }

    private List<ActionAppResponse> getActionAppResponses(
            List<BillAction> billActions,
            List<MemberAction> memberActions
    ) {
        int billActionIndex = 0;
        int memberActionIndex = 0;
        List<ActionAppResponse> actionAppResponses = new ArrayList<>();

        while (billActionIndex < billActions.size() && memberActionIndex < memberActions.size()) {
            BillAction billAction = billActions.get(billActionIndex);
            MemberAction memberAction = memberActions.get(memberActionIndex);
            if (billAction.getSequence() < memberAction.getSequence()) {
                actionAppResponses.add(ActionAppResponse.of(billAction));
                billActionIndex++;
            } else {
                actionAppResponses.add(ActionAppResponse.of(memberAction));
                memberActionIndex++;
            }
        }
        while (billActionIndex < billActions.size()) {
            BillAction billAction = billActions.get(billActionIndex++);
            actionAppResponses.add(ActionAppResponse.of(billAction));
        }
        while (memberActionIndex < memberActions.size()) {
            MemberAction memberAction = memberActions.get(memberActionIndex++);
            actionAppResponses.add(ActionAppResponse.of(memberAction));
        }

        return actionAppResponses;
    }

    public MembersAppResponse findAllMembers(String token) {
        Event event = getEvent(token);

        List<String> memberNames = memberActionRepository.findAllUniqueMemberByEvent(event);

        return new MembersAppResponse(memberNames);
    }

    @Transactional
    public void updateMember(String token, MemberNamesUpdateAppRequest request) {
        Event event = getEvent(token);
        List<MemberNameUpdateAppRequest> members = request.members();

        validateBeforeNames(members, event);
        validateAfterNames(members, event);

        members.forEach(member -> updateMemberName(event, member.before(), member.after()));
    }

    private void validateBeforeNames(List<MemberNameUpdateAppRequest> members, Event event) {
        List<String> beforeNames = members.stream()
                .map(MemberNameUpdateAppRequest::before)
                .toList();
        if (beforeNames.size() != Set.copyOf(beforeNames).size()) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_CHANGE_DUPLICATE);
        }
        beforeNames.forEach(beforeName -> validateBeforeMemberNameExist(event, beforeName));
    }

    private void validateBeforeMemberNameExist(Event event, String beforeName) {
        boolean isMemberNameExist = memberActionRepository.existsByAction_EventAndMemberName(event, beforeName);
        if (!isMemberNameExist) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NOT_EXIST);
        }
    }

    private void validateAfterNames(List<MemberNameUpdateAppRequest> members, Event event) {
        List<String> afterNames = members.stream()
                .map(MemberNameUpdateAppRequest::after)
                .toList();
        if (afterNames.size() != Set.copyOf(afterNames).size()) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_CHANGE_DUPLICATE);
        }
        afterNames.forEach(afterName -> validateAfterMemberNameNotExist(event, afterName));
    }

    private void validateAfterMemberNameNotExist(Event event, String afterName) {
        boolean isMemberNameExist = memberActionRepository.existsByAction_EventAndMemberName(event, afterName);
        if (isMemberNameExist) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_DUPLICATE);
        }
    }

    private void updateMemberName(Event event, String beforeName, String afterName) {
        memberActionRepository.findAllByAction_EventAndMemberName(event, beforeName)
                .forEach(memberAction -> memberAction.updateMemberName(afterName));
    }

    public void validatePassword(EventLoginAppRequest request) throws HaengdongException {
        Event event = getEvent(request.token());
        if (event.isPasswordMismatch(request.password())) {
            throw new AuthenticationException(HaengdongErrorCode.PASSWORD_INVALID);
        }
    }

    private Event getEvent(String token) {
        return eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
    }
}
