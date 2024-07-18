package server.haengdong.application;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.BillActionAppRequest;
import server.haengdong.domain.Action;
import server.haengdong.domain.BillAction;
import server.haengdong.domain.Event;
import server.haengdong.persistence.ActionRepository;
import server.haengdong.persistence.BillActionRepository;
import server.haengdong.persistence.EventRepository;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class BillActionService {

    private final EventRepository eventRepository;
    private final ActionRepository actionRepository;
    private final BillActionRepository billActionRepository;

    @Transactional
    public void saveAllBillAction(String eventToken, List<BillActionAppRequest> requests) {
        Event event = eventRepository.findByToken(eventToken)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이벤트 토큰입니다."));
        long lastSequence = getLastSequence(event);

        List<BillAction> billActions = new ArrayList<>();
        for (BillActionAppRequest request : requests) {
            Action action = new Action(event, ++lastSequence);
            BillAction billAction = request.toBillAction(action);
            billActions.add(billAction);
        }
        billActionRepository.saveAll(billActions);
    }

    private long getLastSequence(Event event) {
        Optional<Action> lastAction = actionRepository.findLastByEvent(event);
        if (lastAction.isPresent()) {
            return lastAction.get().getSequence();
        }
        return 0L;
    }
}
