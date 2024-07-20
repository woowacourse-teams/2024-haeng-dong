package server.haengdong.application;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import server.haengdong.application.request.MemberActionSaveAppRequest;
import server.haengdong.application.request.MemberActionsSaveAppRequest;
import server.haengdong.domain.Action;
import server.haengdong.domain.MemberAction;
import server.haengdong.domain.MemberActionStatus;
import server.haengdong.domain.MemberGroupIdProvider;

@RequiredArgsConstructor
@Component
public class MemberActionFactory {

    private final MemberGroupIdProvider memberGroupIdProvider;

    public List<MemberAction> createMemberActions(
            MemberActionsSaveAppRequest request,
            List<MemberAction> memberActions,
            Action action
    ) {
        memberActions.sort(Comparator.comparing(MemberAction::getSequence));
        validateActions(request, memberActions);

        Long memberGroupId = memberGroupIdProvider.createGroupId();
        List<MemberAction> createdMemberActions = new ArrayList<>();
        List<MemberActionSaveAppRequest> actions = request.actions();
        for (MemberActionSaveAppRequest appRequest : actions) {
            MemberAction memberAction = appRequest.toMemberAction(action, memberGroupId);
            createdMemberActions.add(memberAction);
            action = action.next();
        }

        return createdMemberActions;
    }

    private void validateActions(MemberActionsSaveAppRequest request, List<MemberAction> memberActions) {
        for (MemberActionSaveAppRequest action : request.actions()) {
            validateAction(memberActions, action);
        }
    }

    private void validateAction(List<MemberAction> memberActions, MemberActionSaveAppRequest action) {
        MemberActionStatus memberActionStatus = MemberActionStatus.of(action.status());
        if (isInvalidStatus(memberActions, action.name(), memberActionStatus)) {
            throw new IllegalArgumentException();
        }
    }

    private boolean isInvalidStatus(List<MemberAction> actions, String name, MemberActionStatus status) {
        for (int i = actions.size() - 1; i >= 0; i--) {
            MemberAction action = actions.get(i);
            if (action.isSameName(name)) {
                return action.isSameStatus(status);
            }
        }
        return MemberActionStatus.IN != status;
    }
}
