package server.haengdong.application;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.EventAppRequest;
import server.haengdong.application.request.EventLoginAppRequest;
import server.haengdong.application.response.ActionAppResponse;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.application.response.EventDetailAppResponse;
import server.haengdong.application.response.MemberBillReportAppResponse;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.BillActionRepository;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionRepository;
import server.haengdong.domain.action.MemberBillReport;
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

        List<BillAction> billActions = billActionRepository.findByEvent(event).stream()
                .sorted(Comparator.comparing(BillAction::getSequence)).toList();
        List<MemberAction> memberActions = memberActionRepository.findAllByMember_Event(event).stream()
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
            if (billAction.getSequence().getValue() < memberAction.getSequence().getValue()) {
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

    public List<MemberBillReportAppResponse> getMemberBillReports(String token) {
        Event event = eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
        List<BillAction> billActions = billActionRepository.findByEvent(event);
        List<MemberAction> memberActions = memberActionRepository.findAllByMember_Event(event);

        MemberBillReport memberBillReport = MemberBillReport.createByActions(billActions, memberActions);

        return memberBillReport.getReports().entrySet().stream()
                .map(entry -> new MemberBillReportAppResponse(entry.getKey().getName(), entry.getValue()))
                .toList();
    }
}
