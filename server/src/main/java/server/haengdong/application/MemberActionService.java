package server.haengdong.application;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.MemberActionsSaveAppRequest;
import server.haengdong.domain.action.Action;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.ActionRepository;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.domain.action.MemberActionRepository;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberActionService {

    private final MemberActionFactory memberActionFactory;
    private final MemberActionRepository memberActionRepository;
    private final EventRepository eventRepository;
    private final ActionRepository actionRepository;

    @Transactional
    public void saveMemberAction(String token, MemberActionsSaveAppRequest request) {
        Event event = eventRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("event not found"));

        List<MemberAction> findMemberActions = memberActionRepository.findAllByEvent(event);
        Action action = createStartAction(event);
        List<MemberAction> memberActions = memberActionFactory.createMemberActions(request, findMemberActions, action);
        memberActionRepository.saveAll(memberActions);
    }

    private Action createStartAction(Event event) {
        return actionRepository.findLastByEvent(event)
                .map(Action::next)
                .orElse(Action.createFirst(event));
    }
}
