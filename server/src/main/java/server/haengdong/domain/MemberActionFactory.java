package server.haengdong.domain;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import server.haengdong.application.request.MemberActionSaveAppRequest;
import server.haengdong.application.request.MemberActionSaveListAppRequest;
import server.haengdong.persistence.ActionRepository;

@RequiredArgsConstructor
@Component
public class MemberActionFactory {

    private final ActionRepository actionRepository;
    private final MemberGroupIdProvider memberGroupIdProvider;

    public List<MemberAction> createMemberActions(
            MemberActionSaveListAppRequest request,
            List<MemberAction> memberActions,
            Event event
    ) {
        validateActions(request, memberActions);
        Long memberGroupId = memberGroupIdProvider.createGroupId();
        long lastSequence = getLastSequence(event);
        List<MemberAction> memberActionList = new ArrayList<>();
        List<MemberActionSaveAppRequest> actions = request.actions();
        for (MemberActionSaveAppRequest appRequest : actions) {
            Action action = new Action(event, ++lastSequence);
            MemberAction memberAction = appRequest.toMemberAction(action, memberGroupId);
            memberActionList.add(memberAction);
        }
        return memberActionList;
    }

    private void validateActions(MemberActionSaveListAppRequest request, List<MemberAction> memberActions) {
        for (MemberActionSaveAppRequest action : request.actions()) {
            validateAction(memberActions, action);
        }
    }

    private void validateAction(List<MemberAction> memberActions, MemberActionSaveAppRequest action) {
        if (!isAvailableAction(memberActions, action.name(), action.status())) {
            throw new IllegalArgumentException();
        }
    }

    private long getLastSequence(Event event) {
        return actionRepository.findLastByEvent(event)
                .map(Action::getSequence)
                .orElse(0L);
    }

    private boolean isAvailableAction(List<MemberAction> actions, String name, String status) {
        MemberActionStatus memberActionStatus = MemberActionStatus.of(status);
        for (int i = actions.size() - 1; i >= 0; i--) {
            MemberAction action = actions.get(i);
            if (action.isSameName(name)) {
                return action.isAvailable(memberActionStatus);
            }
        }

        return MemberActionStatus.isMemberStatusIn(memberActionStatus);
    }
}
