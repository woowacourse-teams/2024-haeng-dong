package server.haengdong.application;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.MemberActionsSaveAppRequest;
import server.haengdong.application.response.CurrentMemberAppResponse;
import server.haengdong.domain.action.Action;
import server.haengdong.domain.action.ActionRepository;
import server.haengdong.domain.action.CurrentMembers;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;

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
        Event event = findEvent(token);

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

    public List<CurrentMemberAppResponse> getCurrentMembers(String token) {
        Event event = findEvent(token);
        List<MemberAction> findMemberActions = memberActionRepository.findAllByEvent(event);
        CurrentMembers currentMembers = CurrentMembers.of(findMemberActions);

        return currentMembers.getMembers()
                .stream()
                .map(CurrentMemberAppResponse::new)
                .toList();
    }

    private Event findEvent(String token) {
        return eventRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("event not found"));
    }
}
