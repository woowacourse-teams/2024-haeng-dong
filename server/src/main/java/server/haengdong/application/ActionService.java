package server.haengdong.application;

import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.haengdong.application.response.MemberBillReportAppResponse;
import server.haengdong.domain.action.*;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@RequiredArgsConstructor
@Service
public class ActionService {

    private final BillActionRepository billActionRepository;
    private final MemberActionRepository memberActionRepository;
    private final EventRepository eventRepository;
    private final ActionRepository actionRepository;

    public List<MemberBillReportAppResponse> getMemberBillReports(String token) {
        Event event = eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.NOT_FOUND_EVENT));
        List<BillAction> billActions = billActionRepository.findByAction_Event(event);
        List<MemberAction> memberActions = memberActionRepository.findAllByEvent(event);

        MemberBillReport memberBillReport = MemberBillReport.createByActions(billActions, memberActions);

        return memberBillReport.getReports().entrySet().stream()
                .map(entry -> new MemberBillReportAppResponse(entry.getKey(), entry.getValue()))
                .toList();
    }

    public void deleteAction(String token, Long actionId) {
        Event event = eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.NOT_FOUND_EVENT));
        Action action = actionRepository.findByIdAndEvent(actionId, event)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.NOT_FOUND_ACTION));
        Optional<BillAction> billAction = billActionRepository.findByAction(action);
        if (billAction.isPresent()) {
            billActionRepository.delete(billAction.get());
            return;
        }
    }
}
