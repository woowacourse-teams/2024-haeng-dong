package server.haengdong.application;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.haengdong.application.request.EventAppRequest;
import server.haengdong.application.response.ActionAppResponse;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.application.response.EventDetailAppResponse;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.BillActionRepository;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.domain.event.EventTokenProvider;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@RequiredArgsConstructor
@Service
public class EventService {

    private final EventRepository eventRepository;
    private final EventTokenProvider eventTokenProvider;
    private final BillActionRepository billActionRepository;
    private final MemberActionRepository memberActionRepository;

    public EventAppResponse saveEvent(EventAppRequest request) {
        String token = eventTokenProvider.createToken();
        Event event = request.toEvent(token);
        eventRepository.save(event);

        return EventAppResponse.of(event);
    }

    public EventDetailAppResponse findEvent(String token) {
        Event event = eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.NOT_FOUND_EVENT));

        return EventDetailAppResponse.of(event);
    }

    public List<ActionAppResponse> findActions(String token) {
        Event event = eventRepository.findByToken(token).orElseThrow(() -> new IllegalArgumentException(""));

        List<BillAction> billActions = billActionRepository.findByAction_Event(event).stream()
                .sorted(Comparator.comparing(BillAction::getSequence)).toList();
        List<MemberAction> memberActions = memberActionRepository.findAllByEvent(event).stream()
                .sorted(Comparator.comparing(MemberAction::getSequence)).toList();

        return getActionAppResponses(billActions, memberActions);
    }

    private static List<ActionAppResponse> getActionAppResponses(List<BillAction> billActions,
                                                                 List<MemberAction> memberActions) {
        int billActionIndex = 0;
        int memberActionIndex = 0;

        List<ActionAppResponse> result = new ArrayList<>();
        while (billActionIndex < billActions.size() && memberActionIndex < memberActions.size()) {
            BillAction billAction = billActions.get(billActionIndex);
            MemberAction memberAction = memberActions.get(memberActionIndex);
            if (billAction.getSequence() < memberAction.getSequence()) {
                result.add(ActionAppResponse.of(billAction));
                billActionIndex++;
            } else {
                result.add(ActionAppResponse.of(memberAction));
                memberActionIndex++;
            }
        }
        while (billActionIndex < billActions.size()) {
            BillAction billAction = billActions.get(billActionIndex++);
            result.add(ActionAppResponse.of(billAction));
        }
        while (memberActionIndex < memberActions.size()) {
            MemberAction memberAction = memberActions.get(memberActionIndex++);
            result.add(ActionAppResponse.of(memberAction));
        }

        return result;
    }
}
