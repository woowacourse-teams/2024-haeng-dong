package server.haengdong.application;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.haengdong.application.request.MemberActionSaveListAppRequest;
import server.haengdong.domain.Action;
import server.haengdong.domain.Event;
import server.haengdong.domain.MemberAction;
import server.haengdong.domain.MemberActionStatus;
import server.haengdong.domain.MemberGroupIdProvider;
import server.haengdong.persistence.ActionRepository;
import server.haengdong.persistence.EventRepository;
import server.haengdong.persistence.MemberActionRepository;

@RequiredArgsConstructor
@Service
public class MemberActionService {

    private final MemberActionRepository memberActionRepository;
    private final EventRepository eventRepository;
    private final ActionRepository actionRepository;
    private final MemberGroupIdProvider memberGroupIdProvider;

    public void saveMemberAction(String token, MemberActionSaveListAppRequest request) {
        Event event = eventRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("event not found"));

        List<MemberAction> memberActions = memberActionRepository.findAllByEvent(event);

        request.actions().forEach(
                action -> {
                    if (!isAvailableAction(memberActions, action.name(), action.status())) {
                        throw new IllegalArgumentException();
                    }
                }
        );

        List<Action> actions = new ArrayList<>();
        for (int i = 0; i < memberActions.size(); i++) {
            Action action = new Action(event, request.sequence());
            actions.add(actionRepository.save(action));
        }

        Long memberGroupId = memberGroupIdProvider.createGroupId();
        List<MemberAction> memberActionList = request.toMemberActionList(memberGroupId);

        IntStream.range(0, memberActionList.size())
                .forEach(i -> memberActionList.get(i).setAction(actions.get(i)));

        memberActionRepository.saveAll(memberActionList);
    }

    private boolean isAvailableAction(List<MemberAction> actions, String name, String status) {
        MemberActionStatus memberActionStatus = MemberActionStatus.of(status);
        for (int i = actions.size() - 1; i >= 0; i--) {
            MemberAction action = actions.get(i);
            if (action.getMemberName().equals(name)) {
                return action.getStatus() != memberActionStatus;
            }
        }
        return memberActionStatus == MemberActionStatus.IN;
    }
}
