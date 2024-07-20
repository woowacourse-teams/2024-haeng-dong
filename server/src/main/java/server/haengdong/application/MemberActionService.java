package server.haengdong.application;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.MemberActionsSaveAppRequest;
import server.haengdong.domain.Action;
import server.haengdong.domain.Event;
import server.haengdong.domain.MemberAction;
import server.haengdong.persistence.ActionRepository;
import server.haengdong.persistence.EventRepository;
import server.haengdong.persistence.MemberActionRepository;

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
